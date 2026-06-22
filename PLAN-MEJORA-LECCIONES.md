# Plan de mejora de las lecciones — Curso LLM Learning Path

> Generado a partir de una revisión pedagógica y técnica completa de las 60 lecciones
> (55 numeradas + 5 sub-lecciones 0010.x). Fecha de revisión: 2026-06-21.
> Modelos vigentes de referencia: Fable 5 (`claude-fable-5`), Opus 4.8 (`claude-opus-4-8`),
> Opus 4.7/4.6, Sonnet 4.6 (`claude-sonnet-4-6`), Haiku 4.5 (`claude-haiku-4-5`).
> Precios/MTok (in/out): Opus 4.8 $5/$25 · Sonnet 4.6 $3/$15 · Haiku 4.5 $1/$5 · Fable 5 $10/$50.

## Valoración global

El curso es **sólido, progresivo y bien escrito** en castellano. Los quizzes son consistentes,
las plantillas de prompt y las secciones "cuándo NO usar X" son su mayor activo pedagógico.
Los problemas son acotados y mayormente mecánicos: **desactualización de modelos/precios**,
algunos **errores técnicos puntuales** y **inconsistencias de orden/numeración**.

---

## FASE A — Correcciones ALTAS (exactitud técnica; afectan credibilidad)

### A1. IDs de modelo desactualizados (transversal) ✅
Reemplazar en TODO el código de ejemplo:
- `claude-opus-4-5` → `claude-opus-4-8`
- `claude-sonnet-4-5` → `claude-sonnet-4-6`
- `claude-sonnet-3.5` → `claude-sonnet-4-6` (y corregir formato a guiones)
- `claude-haiku-3.5` → `claude-haiku-4-5`
- `gpt-4o` / `gpt-4o-mini`: actualizar o sustituir según contexto (el curso es Claude-first)

Ficheros afectados: 0029, 0030, 0031, 0032, 0033, 0034 (×5), 0035, 0048, 0049.

### A2. Lección 0016 (comparativa de modelos) — reescritura de actualidad
- Modelos: nombrar versiones actuales (Opus 4.8 / Sonnet 4.6 / Haiku 4.5; mención a Fable 5).
- **Contexto de Claude: 1M tokens** (no 200K; solo Haiku 4.5 = 200K). Corregir tabla y la regla práctica.
- Sección de razonamiento: de "o1/o3/Claude Thinking" → "adaptive thinking + effort".
- Mantener la pedagogía atemporal ("no hay un modelo mejor"); añadir nota de que los nombres caducan.

### A3. Lección 0002 — tabla de contexto y reglas de tokens
- Tabla de ventanas: sustituir `GPT-4o`/`Claude 3.5 Sonnet`/`Gemini 1.5 Pro` por valores actuales
  (Claude 1M; revisar otros). Limpiar "preguntas guía" conversacionales de los `<details>`.
- Regla de tokens en español: unificar (~0.6 palabras/token; 1000 tokens ≈ 600 palabras ES).

### A4. Lección 0003 — ecosistema de modelos
- Actualizar nomenclatura (OpenAI, Anthropic con su gama, open source). Añadir nota sobre
  modelos de razonamiento. Revisar respuestas del quiz que citan modelos viejos.

### A5. Lección 0032 — structured outputs nativos de Anthropic
- Añadir el método nativo actual: `output_config={"format":{"type":"json_schema","schema":{...}}}`
  y `client.messages.parse()` con Pydantic. Corregir la idea de que el schema garantizado es
  exclusivo de OpenAI (hoy Claude lo soporta con `strict`).

### A6. Lección 0031 — diagrama del ciclo de tool use
- Corregir `(role: "tool")` → mensaje `role: "user"` con bloques `tool_result`
  (el código ya lo hace bien; el diagrama lo contradice).

### A7. Lección 0042 — reproducibilidad/seeds
- Eliminar la receta `temperature=0 + seed fija` (la API de Anthropic no expone `seed`,
  y `temperature` está removido en Opus 4.7/4.8). Reformular hacia snapshots de trazas,
  prompts fijos, `effort` bajo y la idea de que el determinismo total no está garantizado.

### A8. Lección 0048 — tabla de costes
- Rehacer con la familia Claude actual (Haiku 4.5 $1/$5, Sonnet 4.6 $3/$15, Opus 4.8 $5/$25,
  Fable 5 $10/$50). Corregir IDs de los snippets. Ajustar "3-5x" → "5x" (output vs input).

### A9. Lección 0009 — restos en inglés (regla de idioma)
- Eliminar/traducir el texto "Try use handoff skill from mattpocock" (viola la regla de castellano).

---

## FASE B — Correcciones MEDIAS (exactitud y progresión)

- **B1. 0033 streaming:** corregir tabla "cuándo NO usar streaming" — es compatible con tool use
  y structured outputs; lo que cambia es que se actúa sobre el mensaje final.
- **B2. 0030 prompt caching:** mínimo cacheable depende del modelo (1024–4096); mencionar TTL 1h.
- **B3. 0035 ↔ 0036 orden:** Embeddings es la primitiva de RAG. Reordenar (Embeddings antes de RAG)
  o añadir en 0035 una caja "qué es un embedding/similitud coseno" con forward-reference claro.
- **B4. 0039 bucles de agente:** renombrar `budget_tokens` del pseudocódigo (colisiona con parámetro
  deprecado); añadir nota de `stop_reason=='tool_use'` y mención a Task Budgets nativos.
- **B5. Numeración de fases 0034–0037:** unificar esquema 5.x/6.x; arreglar enlaces de navegación
  (salto 5.8→6.1, "← 6.0 Embeddings" en 0037).
- **B6. 0051 ↔ 0055 solapamiento:** reorientar 0051 hacia patrones de automatización abstractos y
  dejar la comparativa de herramientas (Zapier/Make/n8n) en 0055; o referenciar explícitamente.
- **B7. Transición Fase 7→8 (0050):** añadir párrafo introductorio que enmarque las aplicaciones.
- **B8. Erratas gramaticales:** 0013 "que uses"→"que use"; 0014 "La IA excelente"→"La IA es excelente";
  0019 anglicismo "encodear/encodenan"→"fijar/consolidar"; 0046 "acceso control"→"control de acceso".
- **B9. Glosas de términos en inglés (1 línea la 1ª vez):** grounding (0012), sycophancy (0015),
  steelmanning (0015).
- **B10. 0047 OWASP:** actualizar a OWASP Top 10 for LLM Apps 2025 (o indicar versión).

---

## FASE C — Correcciones BAJAS (pulido, consistencia, mantenimiento)

- **C1. 0005:** el bloque de código se renderiza con `\n` y backticks literales → usar `<pre>` real.
- **C2. 0008:** usar `->` en lugar de `→` en firmas de código copiable.
- **C3. 0020:** quiz usa `q1b`/`check('q1b',...)`; renombrar a `q2` para evitar fallo silencioso.
- **C4. 0037–0044:** limpiar `<title>...| MattPocockSkills` (artefacto de plantilla).
- **C5. Enlaces de fuente:** `docs.anthropic.com` → `platform.claude.com/docs` (0029–0044);
  `braintrustdata.com` → `braintrust.dev` (0045); diferenciar URLs `.../agents` repetidas.
- **C6. 0017–0021:** homogeneizar plantilla HTML/quiz con el resto (usan `<style>` propio).
- **C7. 0052:** usar nombres de familia de modelo (caducan menos) en vez de versiones concretas.
- **C8. 0037:** actualizar fecha desfasada de la traza ReAct (2025-01-15).

---

## FASE D — Mejoras de contenido (lecciones nuevas / ampliaciones) — OPCIONAL

- **D1. Lección/callout "Modelos de razonamiento" (reasoning models):** concepto central en 2026,
  ausente. Añadir callout en 0003 y 0007, o una sub-lección corta tras 0007.
- **D2. Callouts de capacidades gestionadas actuales:** compaction/context editing (0034),
  Task Budgets (0039), thinking adaptativo — para que el alumno sepa que parte del trabajo
  manual que se enseña tiene equivalente nativo.
- **D3. 0034:** mención a compaction/context editing como alternativa gestionada a los patrones manuales.

---

## Orden de ejecución

1. **FASE A** (alta prioridad, mayor impacto en credibilidad). ← empezar aquí
2. **FASE B** (media).
3. **FASE C** (pulido).
4. **FASE D** (opcional, requiere decisión sobre alcance/lecciones nuevas).

Tras cada fase: verificar que las lecciones siguen abriéndose y que el quiz funciona.

## Registro de progreso

- [x] **Fase A — correcciones altas** (completada)
  - A1 IDs de modelo: ✅ todo el curso (incl. ejemplos OpenAI gpt-4o → gpt-5)
  - A2 0016 comparativa: ✅ · A3 0002: ✅ · A4 0003: ✅ · A5 0032 structured outputs nativos: ✅
  - A6 0031 diagrama tool_result: ✅ · A7 0042 seeds: ✅ · A8 0048 tabla costes: ✅ · A9 0009 inglés: ✅
- [x] **Fase B — correcciones medias** (completada)
  - B1 0033 streaming: ✅ · B2 0030 caché: ✅ · B3 0035 caja embedding: ✅ · B4 0039 token_budget/Task Budgets: ✅
  - B5 numeración 0036/0037: ✅ · B6 0051/0055 solapamiento: ✅ · B7 0050 transición: ✅
  - B8 erratas (0013,0014,0019,0046): ✅ · B9 glosas (0012,0015): ✅ · B10 0047 OWASP 2025: ✅
- [x] **Fase C — pulido** (casi completa)
  - C1 0005 código: ✅ · C2 0008 flecha: ✅ · C3 0020 quiz q2: ✅ · C4 títulos MattPocockSkills: ✅
  - C5 URLs docs (platform.claude.com): ✅ · C7 0052 nombres familia: ✅ · C8 0037 fecha: ✅
  - C6 homogeneizar plantilla 0017–0021: ⏸️ DIFERIDO (bajo valor, riesgo de romper quizzes; requiere refactor de CSS)
- [x] **Fase D — mejoras de contenido** (parcial)
  - D1 callout "modelos de razonamiento": ✅ añadido en 0003 y 0016 (sub-lección dedicada: pendiente de decisión)
  - D2/D3 callouts capacidades gestionadas: ✅ compaction/context editing (0034), Task Budgets (0039)

> Pendiente de decisión del usuario: C6 (refactor de plantilla 0017–0021) y D1 (crear una sub-lección
> independiente sobre modelos de razonamiento, p. ej. 0007.1).
