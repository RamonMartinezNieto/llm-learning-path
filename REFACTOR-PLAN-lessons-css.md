# Refactor: unificar y extraer el CSS base de las lecciones a ficheros compartidos

> Plan generado con `/request-refactor-plan`. Pendiente de crear como issue en GitHub (no se pudo crear automáticamente porque `gh` CLI no está disponible en este entorno). Alcance: `lessons/*.html`, `index.html`, `reference/glossary-ia.html`.

## Problem Statement

Cada una de las 60 lecciones HTML del curso (más `index.html` y `reference/glossary-ia.html`) lleva su propio bloque `<style>` embebido con un conjunto de reglas base (variables de color, tipografía, `body`, `nav`, `h1`/`h2`, `.callout`, `.source`, `.teacher`, `.lesson-nav`, etc.) que se repite casi idéntico en todos los ficheros. Esto ya se hizo parcialmente para los estilos de quiz (`styles/quiz.css`) y de drag&drop (`styles/drop.css`), pero el resto del CSS sigue duplicado.

Al analizar el repo se ha descubierto que esa duplicación no es uniforme: existen **tres "familias" de plantilla** con pequeñas diferencias entre sí:

- **Familia A** (~48 ficheros): serif, `:root` con `--text`/`--muted`, versión "antigua" de `.source`/`.teacher`/`.lesson-nav`, reglas en una sola línea.
- **Familia B** (~6 ficheros): sans-serif, `.lesson-nav` con `border-top`, paddings mayores en `.source`/`.teacher`.
- **Familia C** (~6 ficheros, ej. `0023-ia-pull-requests.html`, `0024` a `0028`): serif pero formateado en multilínea, sin `--text`/`--muted` en `:root`, valores ligeramente distintos (`font-size:1.05rem` vs `1rem`).

Esto hace inviable extraer un único CSS base "a ciegas": primero hay que unificar visualmente las familias B y C al diseño de la familia A (la mayoritaria), y solo entonces extraer el bloque común a ficheros compartidos. El resultado deseado es que cada lección solo contenga en su `<style>` las reglas verdaderamente específicas de esa lección, y que el resto venga de CSS compartido enlazado con `<link>`, igual que ya ocurre con `styles/quiz.css`.

## Solution

1. Tomar el diseño de la **Familia A** como canónico.
2. Migrar visualmente, lección a lección, las ~12 lecciones de las familias B y C para que su CSS embebido coincida con el de la familia A (mismos valores, mismo formato), sin tocar todavía la duplicación entre ficheros. Cada commit toca un único fichero y se verifica visualmente antes de seguir.
3. Una vez las 62 lecciones comparten el mismo bloque base byte-a-byte, extraer ese bloque a `styles/lesson-base.css` y sustituirlo en cada fichero por un `<link rel="stylesheet" href="../styles/lesson-base.css">`, igual que ya se hace con `quiz.css`.
4. Extraer también los patrones "semi-comunes" que se repiten en un subconjunto amplio de lecciones (`.warning`, `table/th/td`) a `styles/lesson-extras.css`. Patrones que solo aparecen en un puñado de lecciones (`.diagram`, `.chain`, `.pipeline`, `.token-demo`, `.extra-badge`, `.prompt-box`, etc.) se quedan inline — no merece la pena abstraerlos.
5. Al final, el `<style>` de cada lección contendrá únicamente las reglas verdaderamente específicas de esa lección (sus diagramas, demos, badges propios).

## Commits

La migración se hace en dos fases, cada una dividida en lotes pequeños. **Cada commit debe dejar el sitio en estado funcional y visualmente idéntico al anterior** (salvo los commits explícitos de unificación visual de B/C, que son los únicos que cambian el aspecto).

### Fase 1 — Unificar visualmente las familias B y C a la familia A

1. Commit por cada una de las ~6 lecciones de la Familia C (`0023`–`0028` y cualquier otra detectada): reescribir su bloque `<style>` para que las reglas base (`:root`, `*`, `body`, `nav`, `h1`, `.meta`, `h2`, `p`, `.callout`, `.source`, `.teacher`, `.lesson-nav`) coincidan exactamente con las de la Familia A, conservando intactas las reglas específicas de esa lección. Un commit por fichero, verificando en el navegador antes de pasar al siguiente.
2. Commit por cada una de las ~6 lecciones de la Familia B: mismo proceso.
3. Commit para `index.html`: alinear su bloque base al mismo patrón.
4. Commit para `reference/glossary-ia.html`: alinear su bloque base al mismo patrón.
5. Commit de verificación: `grep` de las reglas base en los 62 ficheros para confirmar que ya no hay variantes (deben quedar exactamente las mismas cadenas en todos).

### Fase 2 — Extraer el CSS común a ficheros compartidos

6. Commit: crear `styles/lesson-base.css` con el bloque base unificado (el mismo contenido que ya comparten los 62 ficheros tras la Fase 1). Este commit solo añade el fichero nuevo; no toca ninguna lección todavía.
7. Commits por lotes (agrupando por módulo del temario, ~10 ficheros por lote): en cada lección del lote, añadir `<link rel="stylesheet" href="../styles/lesson-base.css">` junto al resto de `<link>` existentes, y eliminar del `<style>` embebido las reglas que ya están en `lesson-base.css`, dejando solo las específicas de la lección. Verificar visualmente una muestra de cada lote en el navegador antes de continuar con el siguiente.
8. Commit: crear `styles/lesson-extras.css` con `.warning` y `table/th/td` (las reglas semi-comunes con uso amplio, ≥10 ficheros).
9. Commits por lotes: en las lecciones que usan `.warning` o `table`, añadir el `<link>` a `lesson-extras.css` y eliminar esas reglas del `<style>` inline.
10. Commit final de limpieza: revisar que ningún `<style>` quede vacío (si una lección no tiene ninguna regla específica, eliminar el bloque `<style>` por completo) y que el orden de los `<link>` sea consistente en todos los ficheros.

## Decision Document

- El diseño canónico para todo el curso es el de la **Familia A** (mayoritaria, serif, `:root` con `--text`/`--muted`).
- Se crean dos ficheros nuevos en `styles/`: `lesson-base.css` (núcleo compartido por todas las lecciones: variables, reset, `body`, `nav`, tipografía de encabezados, `.callout`, `.source`, `.teacher`, `.lesson-nav`) y `lesson-extras.css` (patrones semi-comunes: `.warning`, `table`/`th`/`td`).
- Umbral para decidir qué se extrae a `lesson-extras.css`: un patrón se extrae solo si aparece de forma idéntica en 10 o más ficheros. Por debajo de ese umbral (`.diagram`, `.chain`, `.pipeline`, `.token-demo`, `.extra-badge`, `.prompt-box`, `.step-num`, `figure`), se deja inline en cada lección — no compensa la abstracción.
- `index.html` y `reference/glossary-ia.html` se incluyen en el refactor porque comparten el mismo patrón visual base que las lecciones.
- Se sigue el mismo patrón ya establecido por `styles/quiz.css` y `styles/drop.css`: ficheros CSS sueltos en `styles/`, enlazados con `<link rel="stylesheet" href="../styles/<nombre>.css">` (o ruta relativa equivalente desde `index.html`/`reference/`).
- No se generan plantillas ni scripts de generación de HTML; cada lección sigue siendo un fichero HTML independiente y autocontenible salvo por el CSS compartido.
- No se cambia ninguna clase ni se renombra ningún selector existente; la extracción es un movimiento literal de las mismas reglas, no una reescritura del CSS.

## Testing Decisions

- El proyecto es un sitio estático sin build tooling ni tests automatizados (no hay `package.json`, ni ficheros `*.test.*`/`*.spec.*`).
- Verificación: diff visual manual por lotes. Tras cada commit de la Fase 1 (unificación de una lección B/C), abrir esa lección en el navegador y compararla visualmente con una lección de la Familia A para confirmar que ahora coinciden. Tras cada lote de la Fase 2 (extracción a CSS compartido), abrir 2-3 lecciones representativas del lote y confirmar que el aspecto no ha cambiado respecto a antes de extraer (dado que el contenido movido es textualmente idéntico, no debería haber diferencia).
- No se necesita comparación automática de CSS computado: al ser movimientos de texto idéntico de `<style>` a `<link>`, el resultado visual es determinista.

## Out of Scope

- Unificar o tocar la lógica de `js/app.js` o `js/quiz.js` — no hay duplicación de JS detectada en las lecciones (un único `<script>` por fichero, ya externo).
- Diseñar un sistema de plantillas/generador de HTML que elimine la duplicación de marcado (no solo de CSS). Es una mejora de mayor alcance que queda para un refactor posterior si se decide abordarla.
- Extraer a CSS compartido los patrones de uso minoritario (`.diagram`, `.chain`, `.pipeline`, `.token-demo`, `.extra-badge`, `.prompt-box`, `.step-num`, `figure`): se quedan inline por ahora.
- Cambios de contenido didáctico, texto o estructura semántica de las lecciones.
- Crear el issue en GitHub de forma automática (no se dispone de `gh` CLI en este entorno); este documento debe subirse manualmente o usarse como base para crearlo.

## Further Notes

- El recuento exacto de lecciones por familia (48 / 6 / 6) es aproximado y se debe reverificar fichero a fichero al ejecutar la Fase 1, ya que se ha hecho con `grep` sobre patrones de `body{...}` y podría haber algún caso límite no detectado.
- Al ejecutar la Fase 1, conviene hacer el commit de unificación visual y, en el mismo cambio, NO tocar aún el resto del fichero (contenido, JS, etc.) para mantener el diff mínimo y revisable.
