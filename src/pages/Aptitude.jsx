import { useState, useEffect } from 'react';
import aptitudeTopics from '../data/aptitude-topics.json';
import Quiz from '../components/Quiz';
import { useAuth } from '../context/AuthContext';
import { saveProgress, removeProgress, getProgress } from '../services/api';
import '../styles/Aptitude.css';

const categories = ['All', 'Quant', 'Logical', 'Verbal'];

function Aptitude() {
  const { token } = useAuth();
  const [done, setDone] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeQuiz, setActiveQuiz] = useState(null);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = await getProgress(token);
        if (data.progress && data.progress.aptitude) {
          setDone(data.progress.aptitude);
        }
      } catch (err) {
        const saved = localStorage.getItem('preptrack-aptitude-done');
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
    localStorage.setItem('preptrack-aptitude-done', JSON.stringify(updated));
    try {
      if (isDone) {
        await removeProgress(token, 'aptitude', id);
      } else {
        await saveProgress(token, 'aptitude', id, 'done');
      }
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  const getFiltered = () => {
    if (activeCategory === 'All') return aptitudeTopics;
    return aptitudeTopics.filter(t => t.category === activeCategory);
  };

  const doneCount = done.length;
  const pct = Math.round((doneCount / aptitudeTopics.length) * 100);

  const renderTopic = (topic) => {
    const isDone = done.includes(topic.id);
    const cardClass = isDone ? 'aptitude-card done' : 'aptitude-card';
    const markClass = isDone ? 'mark-btn mark-done' : 'mark-btn';
    const badgeClass = 'category-badge ' + topic.category.toLowerCase();

    return (
      <div key={topic.id} className={cardClass}>
        <div className="aptitude-card-left">
          <span className={badgeClass}>{topic.category}</span>
          <h3>{topic.name}</h3>
        </div>
        <div className="aptitude-card-right">
          {topic.hasQuiz === true ? (
            <button
              className="action-btn quiz-btn"
              onClick={() => setActiveQuiz({ category: topic.triviaCategory, name: topic.name })}
            >
              📝 Take Quiz
            </button>
          ) : null}
          <a href={topic.indiabix} target="_blank" rel="noopener noreferrer" className="action-btn indiabix-btn">
            🔗 Practice on IndiaBix
          </a>
          <button className={markClass} onClick={() => toggleDone(topic.id)}>
            {isDone ? '✓ Done' : 'Mark Done'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="section-page">
      <div className="section-header">
        <div>
          <h1>🧮 Aptitude Preparation</h1>
          <p>Quantitative, Logical and Verbal practice for placement tests</p>
        </div>
        <div className="section-progress">
          <span>{doneCount}/{aptitudeTopics.length} topics</span>
          <div className="progress-bar">
            <div className="progress-fill amber" style={{ width: pct + '%' }}></div>
          </div>
          <span>{pct}% complete</span>
        </div>
      </div>
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={activeCategory === cat ? 'tab-btn active' : 'tab-btn'}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="topics-list">
        {getFiltered().map(topic => renderTopic(topic))}
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

export default Aptitude;