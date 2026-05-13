import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getStats } from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
  const { student, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats(token);
        if (data.stats) {
          setStats(data.stats);
        }
      } catch (err) {
        console.error('Error loading stats:', err);
      }
      setLoading(false);
    };
    loadStats();
  }, [token]);

  const dsaPct = stats ? stats.dsa.percent : 0;
  const aptitudePct = stats ? stats.aptitude.percent : 0;
  const corePct = stats ? stats.core.percent : 0;
  const overallScore = stats ? stats.overallScore : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {student ? student.name : 'Student'}! 👋</h1>
          <p className="dashboard-subtitle">Keep up the preparation streak!</p>
        </div>
        <div className="streak-badge">
          <span className="streak-icon">🔥</span>
          <span className="streak-count">Keep Going!</span>
        </div>
      </div>

      <div className="score-card">
        <h2 className="score-title">Placement Readiness Score</h2>
        <div className="score-number">
          {loading ? '...' : overallScore}
          <span>/100</span>
        </div>
        <div className="score-bar">
          <div className="score-fill" style={{ width: `${overallScore}%` }}></div>
        </div>
        <p className="score-message">
          {overallScore >= 80 ? 'Excellent! You are well prepared! 🎉' :
           overallScore >= 60 ? 'Good progress! Keep going! 👍' :
           overallScore >= 40 ? 'Getting there! Stay consistent! 💪' :
           'Just getting started! Keep studying! 📚'}
        </p>
      </div>

      <div className="progress-cards">
        <div className="progress-card">
          <div className="progress-card-header">
            <span className="progress-icon">💻</span>
            <h3>DSA</h3>
          </div>
          <div className="progress-percent">{dsaPct}%</div>
          <div className="progress-bar">
            <div className="progress-fill blue" style={{ width: `${dsaPct}%` }}></div>
          </div>
          <p>{stats ? stats.dsa.done : 0} of {stats ? stats.dsa.total : 12} topics done</p>
        </div>

        <div className="progress-card">
          <div className="progress-card-header">
            <span className="progress-icon">🧮</span>
            <h3>Aptitude</h3>
          </div>
          <div className="progress-percent">{aptitudePct}%</div>
          <div className="progress-bar">
            <div className="progress-fill amber" style={{ width: `${aptitudePct}%` }}></div>
          </div>
          <p>{stats ? stats.aptitude.done : 0} of {stats ? stats.aptitude.total : 19} topics done</p>
        </div>

        <div className="progress-card">
          <div className="progress-card-header">
            <span className="progress-icon">📚</span>
            <h3>Core Subjects</h3>
          </div>
          <div className="progress-percent">{corePct}%</div>
          <div className="progress-bar">
            <div className="progress-fill green" style={{ width: `${corePct}%` }}></div>
          </div>
          <p>{stats ? stats.core.done : 0} of {stats ? stats.core.total : 7} subjects done</p>
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="recent-activity">
          <h3>Quick Links</h3>
          <ul className="activity-list">
            <li className="activity-item">
              <span className="activity-dot blue"></span>
              <span>Continue DSA preparation</span>
            </li>
            <li className="activity-item">
              <span className="activity-dot amber"></span>
              <span>Practice Aptitude topics</span>
            </li>
            <li className="activity-item">
              <span className="activity-dot green"></span>
              <span>Study Core Subjects</span>
            </li>
          </ul>
        </div>

        <div className="suggested-topic">
          <h3>Student Info</h3>
          <div className="suggestion-card">
            <span className="suggestion-icon">🎓</span>
            <div>
              <h4>{student ? student.branch : 'Branch'}</h4>
              <p>Year {student ? student.year : ''} — {student ? student.college : 'College'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;