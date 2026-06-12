/**
 * quiz.js — Lógica compartida de quiz para todas las lecciones.
 * Uso: <button onclick="check('q1', 'b')">Comprobar</button>
 */
function check(qid, correct) {
  const sel = document.querySelector(`input[name="${qid}"]:checked`);
  const fb  = document.getElementById(`fb-${qid}`);
  if (!sel) {
    fb.textContent  = 'Selecciona una opción primero.';
    fb.className    = 'feedback err';
    fb.style.display = 'block';
    return;
  }
  const isCorrect = sel.value === correct;
  fb.textContent  = isCorrect ? '✓ Correcto.' : '✗ Incorrecto. Revisa la sección correspondiente.';
  fb.className    = isCorrect ? 'feedback ok' : 'feedback err';
  fb.style.display = 'block';
}
