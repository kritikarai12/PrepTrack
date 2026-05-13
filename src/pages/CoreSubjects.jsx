import { useState, useEffect } from 'react';
import coreSubjects from '../data/core-subjects.json';
import Quiz from '../components/Quiz';
import { useAuth } from '../context/AuthContext';
import { saveProgress, removeProgress, getProgress } from '../services/api';
import '../styles/CoreSubjects.css';

function CoreSubjects() {
  const { token } = useAuth();
  const [done, setDone] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = await getProgress(token);
        if (data.progress && data.progress.core) {
          setDone(data.progress.core);
        }
      } catch (err) {
        const saved = localStorage.getItem('preptrack-core-done');
        if (saved) setDone(JSON.parse(saved));
      }
    };
    loadProgress();
  }, [token]);

  const toggleDone = async (id) => {
    const isDone = done.includes(id);
    const updated = isDone
      ? done.filter(d => d !== id)
      : [...done, id];
    setDone(updated);
    localStorage.setItem('preptrack-core-done', JSON.stringify(updated));
    try {
      if (isDone) {
        await removeProgress(token, 'core', id);
      } else {
        await saveProgress(token, 'core', id, 'done');
      }
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  const doneCount = done.length;
  const pct = Math.round((doneCount / coreSubjects.length) * 100);

  const renderSubject = (subject) => {
    const isDone = done.includes(subject.id);
    const cardClass = isDone ? 'subject-card done' : 'subject-card';
    const markClass = isDone ? 'mark-btn mark-done' : 'mark-btn';

    return (
      <div key={subject.id} className={cardClass}>
        <div className="subject-icon">{subject.icon}</div>
        <h3>{subject.name}</h3>
        <div className="subject-actions">
          <a href={subject.gfg} target="_blank" rel="noopener noreferrer" className="action-btn gfg-btn">
            📖 Learn on GFG
          </a>
          {subject.hasQuiz === true ? (
            <button
              className="action-btn quiz-btn"
              onClick={() => setActiveQuiz({ category: subject.triviaCategory, name: subject.name })}
            >
              📝 Take Quiz
            </button>
          ) : null}
          <a href={subject.indiabix} target="_blank" rel="noopener noreferrer" className="action-btn indiabix-btn">
            🔗 More on IndiaBix
          </a>
        </div>
        <button className={markClass} onClick={() => toggleDone(subject.id)}>
          {isDone ? '✓ Completed' : 'Mark as Done'}
        </button>
      </div>
    );
  };

  return (
    <div className="section-page">
      <div className="section-header">
        <div>
          <h1>📚 Core Subjects</h1>
          <p>Master core CS subjects for technical interviews</p>
        </div>
        <div className="section-progress">
          <span>{doneCount}/{coreSubjects.length} subjects</span>
          <div className="progress-bar">
            <div className="progress-fill green" style={{ width: pct + '%' }}></div>
          </div>
          <span>{pct}% complete</span>
        </div>
      </div>
      <div className="subjects-grid">
        {coreSubjects.map(subject => renderSubject(subject))}
      </div>
      {activeQuiz ? (
        <Quiz
          category={activeQuiz.category}
          topicName={activeQuiz.name}
          onClose={() => setActiveQuiz(null)}
        />
      ) : null}
    </div>
  );
}

export default CoreSubjects;