import { useState, useEffect } from 'react';
import dsaTopics from '../data/dsa-topics.json';
import { fetchCFProblems } from '../services/codeforcesApi';
import { useAuth } from '../context/AuthContext';
import { saveProgress, removeProgress, getProgress } from '../services/api';
import '../styles/DSA.css';

function DSA() {
  const { token } = useAuth();
  const [done, setDone] = useState([]);
  const [expandedLC, setExpandedLC] = useState(null);
  const [expandedCF, setExpandedCF] = useState(null);
  const [cfProblems, setCfProblems] = useState({});
  const [cfLoading, setCfLoading] = useState({});

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = await getProgress(token);
        if (data.progress && data.progress.dsa) {
          setDone(data.progress.dsa);
        }
      } catch (err) {
        const saved = localStorage.getItem('preptrack-dsa-done');
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
    localStorage.setItem('preptrack-dsa-done', JSON.stringify(updated));
    try {
      if (isDone) {
        await removeProgress(token, 'dsa', id);
      } else {
        await saveProgress(token, 'dsa', id, 'done');
      }
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  const toggleLC = (id) => {
    setExpandedLC(prev => prev === id ? null : id);
  };

  const toggleCF = async (topic) => {
    if (expandedCF === topic.id) {
      setExpandedCF(null);
      return;
    }
    setExpandedCF(topic.id);
    if (!cfProblems[topic.id]) {
      setCfLoading(prev => ({ ...prev, [topic.id]: true }));
      const problems = await fetchCFProblems(topic.cfTag);
      setCfProblems(prev => ({ ...prev, [topic.id]: problems }));
      setCfLoading(prev => ({ ...prev, [topic.id]: false }));
    }
  };

  const doneCount = done.length;
  const pct = Math.round((doneCount / dsaTopics.length) * 100);

  const diffColor = (diff) => {
    if (diff === 'Easy') return 'easy';
    if (diff === 'Medium') return 'medium';
    return 'hard';
  };

  const ratingColor = (rating) => {
    if (rating <= 1000) return 'rating-easy';
    if (rating <= 1400) return 'rating-medium';
    return 'rating-hard';
  };

  const renderTopic = (topic) => {
    const isDone = done.includes(topic.id);
    const cardClass = isDone ? 'topic-card done' : 'topic-card';
    const markClass = isDone ? 'mark-btn mark-done' : 'mark-btn';
    const isLCOpen = expandedLC === topic.id;
    const isCFOpen = expandedCF === topic.id;
    const isLoadingCF = cfLoading[topic.id];
    const topicCFProblems = cfProblems[topic.id] || [];

    return (
      <div key={topic.id} className={cardClass}>
        <div className="topic-card-header">
          <h3>{topic.name}</h3>
          {isDone ? <span className="done-badge">✓ Done</span> : null}
        </div>
        <div className="topic-actions">
          <a href={topic.gfg} target="_blank" rel="noopener noreferrer" className="action-btn gfg-btn">
            📖 Learn on GFG
          </a>
          <button className="action-btn leetcode-btn" onClick={() => toggleLC(topic.id)}>
            🔗 LeetCode Problems {isLCOpen ? '▲' : '▼'}
          </button>
          {isLCOpen ? (
            <div className="problem-list">
              {topic.leetcode.map((prob, i) => (
                <a key={i} href={prob.url} target="_blank" rel="noopener noreferrer" className="problem-item">
                  <span className="problem-title">{prob.title}</span>
                  <span className={'diff-badge ' + diffColor(prob.difficulty)}>{prob.difficulty}</span>
                </a>
              ))}
            </div>
          ) : null}
          <button className="action-btn codeforces-btn" onClick={() => toggleCF(topic)}>
            ⚡ Codeforces Problems {isCFOpen ? '▲' : '▼'}
          </button>
          {isCFOpen ? (
            <div className="problem-list">
              {isLoadingCF ? (
                <div className="cf-loading">
                  <span className="loading-spinner"></span>
                  Fetching problems from Codeforces...
                </div>
              ) : topicCFProblems.length === 0 ? (
                <div className="cf-empty">No problems found. Try visiting Codeforces directly.</div>
              ) : (
                topicCFProblems.map(prob => (
                  <a key={prob.id} href={prob.url} target="_blank" rel="noopener noreferrer" className="problem-item">
                    <span className="problem-title">{prob.title}</span>
                    <span className={'rating-badge ' + ratingColor(prob.rating)}>★ {prob.rating}</span>
                  </a>
                ))
              )}
            </div>
          ) : null}
        </div>
        <button className={markClass} onClick={() => toggleDone(topic.id)}>
          {isDone ? '✓ Completed' : 'Mark as Done'}
        </button>
      </div>
    );
  };

  return (
    <div className="section-page">
      <div className="section-header">
        <div>
          <h1>💻 DSA Preparation</h1>
          <p>Practice Data Structures and Algorithms for placements</p>
        </div>
        <div className="section-progress">
          <span>{doneCount}/{dsaTopics.length} topics</span>
          <div className="progress-bar">
            <div className="progress-fill blue" style={{ width: pct + '%' }}></div>
          </div>
          <span>{pct}% complete</span>
        </div>
      </div>
      <div className="topics-grid">
        {dsaTopics.map(topic => renderTopic(topic))}
      </div>
    </div>
  );
}

export default DSA;