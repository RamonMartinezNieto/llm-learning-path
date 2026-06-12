/**
 * app.js — Lógica principal del índice del curso MattPocockSkills.
 * Gestiona el estado de progreso, renderizado de módulos y eventos de UI.
 */

const STORAGE_KEY = 'mattpocock_progress';

const modules = [
  {
    id: 'mod0', label: 'Módulo 0', title: 'Fundamentos de los LLMs',
    lessons: [
      { file: '0001-como-funcionan-los-llms.html',               title: '0.1 — Cómo funcionan los LLMs' },
      { file: '0002-tokens-contexto-temperatura-embeddings.html', title: '0.2 — Tokens, contexto, temperatura y embeddings' },
      { file: '0003-ecosistema-modelos-proveedores.html',         title: '0.3 — El ecosistema actual: modelos, proveedores y benchmarks' },
      { file: '0004-limitaciones-alucinaciones.html',             title: '0.4 — Limitaciones reales y alucinaciones' },
    ]
  },
  {
    id: 'mod1', label: 'Módulo 1', title: 'Prompting',
    lessons: [
      { file: '0005-anatomia-buen-prompt.html',                   title: '1.1 — Anatomía de un buen prompt' },
      { file: '0006-tecnicas-basicas-prompting.html',             title: '1.2 — Técnicas básicas: zero-shot, few-shot, role prompting' },
      { file: '0007-tecnicas-avanzadas-prompting.html',           title: '1.3 — Técnicas avanzadas: CoT, self-consistency, tree-of-thought' },
      { file: '0008-prompts-codigo-vs-texto.html',                title: '1.4 — Prompts para código vs. prompts para texto' },
      { file: '0009-gestion-contexto.html',                       title: '1.5 — Gestión del contexto y ventana de contexto' },
      { file: '0010-evaluacion-refinamiento-prompts.html',        title: '1.6 — Evaluación y refinamiento iterativo de prompts' },
    ]
  },
  {
    id: 'mod2', label: 'Módulo 2', title: 'IA para Productividad',
    lessons: [
      { file: '0011-ia-investigacion-sintesis.html',              title: '2.1 — IA como motor de investigación y síntesis' },
      { file: '0012-ia-analisis-documentos.html',                 title: '2.2 — IA para análisis de documentos y datos' },
      { file: '0013-ia-aprendizaje-acelerado.html',               title: '2.3 — IA para aprendizaje acelerado de nuevas tecnologías' },
      { file: '0014-ia-escritura-tecnica.html',                   title: '2.4 — IA para escritura técnica y no técnica' },
      { file: '0015-ia-toma-decisiones.html',                     title: '2.5 — IA para toma de decisiones y pensamiento crítico' },
      { file: '0016-comparativa-modelos.html',                    title: '2.6 — Comparativa de modelos: cuándo usar Claude vs. GPT vs. Gemini' },
    ]
  },
  {
    id: 'mod3', label: 'Módulo 3', title: 'IA para Desarrollo de Software',
    lessons: [
      { file: '0017-autocompletado-generacion-inline.html',       title: '3.1 — Autocompletado y generación inline' },
      { file: '0018-refactorizacion-code-review.html',            title: '3.2 — Refactorización y code review asistidos por IA' },
      { file: '0019-generacion-tests.html',                       title: '3.3 — Generación de tests unitarios e integración con IA' },
      { file: '0020-debugging-con-ia.html',                       title: '3.4 — Debugging y análisis de errores con IA' },
      { file: '0021-documentacion-automatica.html',               title: '3.5 — Documentación automática de código con IA' },
      { file: '0022-herramientas-cursor-copilot.html',            title: '3.6 — Herramientas: Cursor, GitHub Copilot, Claude Code' },
    ]
  },
  {
    id: 'mod4', label: 'Módulo 4', title: 'IA en DevOps & Equipos',
    lessons: [
      { file: '0023-ia-pull-requests.html',                       title: '4.1 — IA en el análisis y revisión de Pull Requests' },
      { file: '0024-pipelines-cicd.html',                         title: '4.2 — Generación y mantenimiento de pipelines CI/CD con IA' },
      { file: '0025-ia-seguridad.html',                           title: '4.3 — IA para seguridad: detección de vulnerabilidades' },
      { file: '0026-documentacion-tecnica-proyectos.html',        title: '4.4 — Automatización de documentación técnica de proyectos' },
      { file: '0027-terminales-cli.html',                         title: '4.5 — Terminales y CLI asistidos por IA' },
      { file: '0028-ia-gestion-proyectos.html',                   title: '4.6 — IA para gestión de proyectos y estimaciones' },
    ]
  },
  {
    id: 'mod5', label: 'Módulo 5', title: 'APIs & Desarrollo con LLMs',
    lessons: [
      { file: '0029-primeros-pasos-api.html',                     title: '5.1 — Primeros pasos con la API de Anthropic / OpenAI' },
      { file: '0030-prompt-caching.html',                         title: '5.2 — Prompt caching y optimización de costes' },
      { file: '0031-tool-use-function-calling.html',              title: '5.3 — Tool use y function calling' },
      { file: '0032-structured-outputs.html',                     title: '5.4 — Structured outputs y parsing de respuestas' },
      { file: '0033-streaming.html',                              title: '5.5 — Streaming de respuestas' },
      { file: '0034-gestion-conversaciones-memoria.html',         title: '5.6 — Gestión de conversaciones y memoria en aplicaciones' },
      { file: '0035-rag.html',                                    title: '5.7 — RAG: Retrieval-Augmented Generation' },
      { file: '0036-embeddings-busqueda-semantica.html',          title: '5.8 — Embeddings y búsqueda semántica' },
    ]
  },
  {
    id: 'mod6', label: 'Módulo 6', title: 'Agentes de IA',
    lessons: [
      { file: '0037-arquitectura-react.html',                     title: '6.1 — Arquitectura ReAct' },
      { file: '0038-diseno-herramientas-agentes.html',            title: '6.2 — Diseño de herramientas para agentes' },
      { file: '0039-bucles-agente.html',                          title: '6.3 — Bucles de agente' },
      { file: '0040-agentes-codigo.html',                         title: '6.4 — Agentes de código' },
      { file: '0041-multi-agent-systems.html',                    title: '6.5 — Multi-agent systems' },
      { file: '0042-evaluacion-trazabilidad-agentes.html',        title: '6.6 — Evaluación y trazabilidad de agentes' },
      { file: '0043-frameworks-langchain-crewai.html',            title: '6.7 — Frameworks de agentes (LangChain, CrewAI)' },
    ]
  },
  {
    id: 'mod7', label: 'Módulo 7', title: 'IA en Producción',
    lessons: [
      { file: '0044-fine-tuning-vs-prompting.html',               title: '7.1 — Fine-tuning vs. prompting' },
      { file: '0045-evaluacion-sistematica-modelos.html',         title: '7.2 — Evaluación sistemática de modelos' },
      { file: '0046-observabilidad-logging.html',                 title: '7.3 — Observabilidad y logging' },
      { file: '0047-seguridad-llm-prompt-injection.html',         title: '7.4 — Seguridad: prompt injection' },
      { file: '0048-escalado-optimizacion-costes.html',           title: '7.5 — Escalado y optimización de costes' },
      { file: '0049-patrones-arquitectura-ia.html',               title: '7.6 — Patrones de arquitectura IA' },
    ]
  },
  {
    id: 'mod8', label: 'Módulo 8', title: 'IA para Negocio',
    lessons: [
      { file: '0050-ia-investigacion-mercado.html',               title: '8.1 — IA para investigación y análisis de mercado' },
      { file: '0051-ia-automatizacion-flujos-negocio.html',       title: '8.2 — IA para automatización de flujos de negocio' },
      { file: '0052-ia-contenido-multimodal.html',                title: '8.3 — IA para contenido multimodal' },
      { file: '0053-ia-productividad-personal.html',              title: '8.4 — IA para productividad personal' },
      { file: '0054-ia-analisis-datos.html',                      title: '8.5 — IA para análisis de datos' },
      { file: '0055-automatizacion-zapier-make-n8n.html',         title: '8.6 — Automatización con IA: Zapier, Make y n8n' },
    ]
  },
];

// ── State ──────────────────────────────────────────────

function loadState() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); }
  catch { return new Set(); }
}

function saveState(done) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...done]));
}

let doneSet = loadState();
const TOTAL = modules.reduce((s, m) => s + m.lessons.length, 0);

// ── Render ─────────────────────────────────────────────

function render() {
  const container = document.getElementById('course');
  container.innerHTML = '';

  modules.forEach(mod => {
    const section = document.createElement('div');
    section.className = 'module';
    section.id = mod.id;

    const doneInMod = mod.lessons.filter(l => doneSet.has(l.file)).length;
    const pct = mod.lessons.length ? Math.round(doneInMod / mod.lessons.length * 100) : 0;

    section.innerHTML = `
      <div class="module-header" data-mod="${mod.id}">
        <span class="module-badge">${mod.label}</span>
        <span class="module-title">${mod.title}</span>
        <div class="module-mini-progress">
          <div class="module-mini-bar">
            <div class="module-mini-fill" style="width:${pct}%"></div>
          </div>
          <span class="module-mini-count">${doneInMod}/${mod.lessons.length}</span>
        </div>
        <span class="chevron">▼</span>
      </div>
      <ul class="lesson-list">
        ${mod.lessons.map((l, i) => {
          const isDone = doneSet.has(l.file);
          return `
          <li class="lesson-item${isDone ? ' done' : ''}" data-file="${l.file}">
            <input type="checkbox" class="lesson-checkbox" data-file="${l.file}"${isDone ? ' checked' : ''}>
            <a class="lesson-link" href="lessons/${l.file}">${l.title}</a>
            <span class="lesson-num">#${String(i + 1).padStart(2, '0')}</span>
          </li>`;
        }).join('')}
      </ul>`;

    container.appendChild(section);
  });

  updateGlobal();
  bindEvents();
}

function updateGlobal() {
  const count = doneSet.size;
  const pct   = Math.round(count / TOTAL * 100);
  document.getElementById('global-bar').style.width = pct + '%';
  document.getElementById('global-counter').textContent = `${count} / ${TOTAL} lecciones (${pct}%)`;
  document.getElementById('complete-badge').classList.toggle('visible', count === TOTAL);
}

// ── Events ─────────────────────────────────────────────

function bindEvents() {
  document.querySelectorAll('.lesson-checkbox').forEach(cb => {
    cb.addEventListener('change', e => {
      const file = e.target.dataset.file;
      if (e.target.checked) doneSet.add(file);
      else doneSet.delete(file);
      saveState(doneSet);

      const item = e.target.closest('.lesson-item');
      item.classList.toggle('done', e.target.checked);

      const mod  = e.target.closest('.module');
      const all  = mod.querySelectorAll('.lesson-checkbox');
      const done = [...all].filter(c => c.checked).length;
      const pct  = Math.round(done / all.length * 100);
      mod.querySelector('.module-mini-fill').style.width = pct + '%';
      mod.querySelector('.module-mini-count').textContent = `${done}/${all.length}`;

      updateGlobal();
    });
  });

  document.querySelectorAll('.module-header').forEach(header => {
    header.addEventListener('click', e => {
      if (e.target.closest('.lesson-checkbox')) return;
      header.closest('.module').classList.toggle('collapsed');
    });
  });
}

// ── Reset ──────────────────────────────────────────────

document.getElementById('btn-reset').addEventListener('click', () => {
  if (!confirm('¿Seguro que quieres reiniciar todo el progreso?')) return;
  doneSet.clear();
  saveState(doneSet);
  render();
});

// ── Init ───────────────────────────────────────────────

render();
