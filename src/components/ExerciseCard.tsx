import { useEffect, useState } from 'react';
import type { Lesson } from '../data/lessons';
import { checkExerciseAnswer } from '../lib/progress';
import { Icon } from './Icons';

type ExerciseCardProps = { lesson: Lesson; onScore: (id: string, score: number) => void };

export function ExerciseCard({ lesson, onScore }: ExerciseCardProps) {
  const exercise = lesson.exercise;
  const [selection, setSelection] = useState('');
  const [typed, setTyped] = useState('');
  const [checked, setChecked] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setSelection('');
    setTyped('');
    setChecked(null);
    setShowHint(false);
  }, [lesson.id]);

  const answer = exercise.choices ? selection : typed;
  const submit = () => {
    const correct = exercise.choices
      ? answer === exercise.answer
      : checkExerciseAnswer(answer, exercise.answer, exercise.kind === 'challenge');
    setChecked(correct);
    onScore(lesson.id, correct ? 1 : 0);
  };

  const typeLabel = {
    choice: 'PERGUNTA RÁPIDA',
    fill: 'COMPLETE O COMANDO',
    spot: 'ENCONTRE A MELHOR RESPOSTA',
    challenge: 'DESAFIO PRÁTICO',
  }[exercise.kind];

  return (
    <section className="exercise-card" aria-labelledby="exercise-title">
      <div className="exercise-kicker"><span className="exercise-icon"><Icon name="target" size={17} /></span><span>{typeLabel}</span><span className="exercise-points">1 ponto</span></div>
      <h3 id="exercise-title">Hora de experimentar</h3>
      <p className="exercise-prompt">{exercise.prompt}</p>
      {exercise.code && <pre className="exercise-code"><code>{exercise.code}</code></pre>}

      {exercise.choices ? (
        <div className="answer-list" role="radiogroup" aria-label="Escolha uma resposta">
          {exercise.choices.map((choice) => (
            <button type="button" key={choice} className={`answer-option ${selection === choice ? 'selected' : ''} ${checked !== null && choice === exercise.answer ? 'correct-option' : ''}`} onClick={() => { if (checked !== true) { setSelection(choice); setChecked(null); } }} role="radio" aria-checked={selection === choice}>
              <span className="answer-radio">{selection === choice && <span />}</span><span>{choice}</span>
              {checked !== null && choice === exercise.answer && <Icon name="check" size={17} className="answer-check" />}
            </button>
          ))}
        </div>
      ) : (
        <label className="answer-input-label">
          <span className="sr-only">Sua resposta</span>
          <input value={typed} onChange={(event) => { setTyped(event.target.value); setChecked(null); }} placeholder={exercise.placeholder ?? 'Digite sua resposta'} onKeyDown={(event) => { if (event.key === 'Enter') submit(); }} />
        </label>
      )}

      <div className="exercise-actions">
        <button type="button" className="button button-primary button-small" onClick={submit} disabled={!answer.trim() || checked === true}>
          {checked === true ? <><Icon name="check" size={16} /> Resposta registrada</> : 'Conferir resposta'}
        </button>
        <button type="button" className="hint-button" onClick={() => setShowHint((value) => !value)}><Icon name="lightbulb" size={16} /> {showHint ? 'Esconder dica' : 'Preciso de uma dica'}</button>
      </div>

      {showHint && <div className="hint-box"><Icon name="spark" size={17} /><p>{exercise.hint}</p></div>}
      {checked !== null && <div className={`answer-feedback ${checked ? 'is-correct' : 'needs-try'}`} role="status"><span className="feedback-icon"><Icon name={checked ? 'check' : 'lightbulb'} size={18} /></span><div><strong>{checked ? 'Boa! Você entendeu.' : 'Quase lá. Vamos pensar de outro jeito.'}</strong><p>{checked ? exercise.feedback : `${exercise.feedback} ${exercise.hint}`}</p></div></div>}
    </section>
  );
}
