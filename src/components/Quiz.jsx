import { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../services/triviaApi';
import '../styles/Quiz.css';

function Quiz({ category, topicName, onClose }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
    const qs = await fetchQuizQuestions(category);
    setQuestions(qs);
    setLoading(false);
  };

  const handleSelect = (option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === questions[current].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(prev => prev + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const getOptionClass = (option) => {
    if (!answered) return 'option-btn';
    if (option === questions[current].correct) return 'option-btn correct';
    if (option === selected) return 'option-btn wrong';
    return 'option-btn';
  };

  const getScoreMessage = () => {
    const pct = (score / questions.length) * 100;
    if (pct >= 80) return 'Excellent! You are well prepared! 🎉';
    if (pct >= 60) return 'Good job! Keep practicing! 👍';
    if (pct >= 40) return 'Not bad! Review the topic and retry! 📖';
    return 'Keep studying! You will get better! 💪';
  };

  const getScoreColor = () => {
    const pct = (score / questions.length) * 100;
    if (pct >= 80) return 'score-excellent';
    if (pct >= 60) return 'score-good';
    if (pct >= 40) return 'score-average';
    return 'score-poor';
  };

  return (
    <div className="quiz-overlay">
      <div className="quiz-modal">
        <div className="quiz-header">
          <h2>📝 {topicName} Quiz</h2>
          <button className="quiz-close" onClick={onClose}>✕</button>
        </div>

        {loading ? (
          <div className="quiz-loading">
            <div className="loading-spinner"></div>
            <p>Loading questions...</p>
          </div>
        ) : questions.length === 0 ? (
          <div className="quiz-error">
            <p>Could not load questions. Please try again.</p>
            <button className="retry-btn" onClick={loadQuestions}>
              Retry
            </button>
          </div>
        ) : finished ? (
          <div className="quiz-result">
            <div className={`score-circle ${getScoreColor()}`}>
              <span className="score-num">{score}</span>
              <span className="score-total">/{questions.length}</span>
            </div>
            <h3>{getScoreMessage()}</h3>
            <p className="score-percent">
              You scored {Math.round((score / questions.length) * 100)}%
            </p>
            <div className="result-actions">
              <button className="retry-btn" onClick={loadQuestions}>
                🔄 Retake Quiz
              </button>
              <button className="close-btn" onClick={onClose}>
                ✕ Close
              </button>
            </div>
          </div>
        ) : (
          <div className="quiz-body">
            <div className="quiz-progress">
              <span>Question {current + 1} of {questions.length}</span>
              <div className="quiz-progress-bar">
                <div
                  className="quiz-progress-fill"
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <span className="quiz-score-live">Score: {score}</span>
            </div>

            <div className="question-box">
              <p className="question-text">{questions[current].question}</p>
            </div>

            <div className="options-grid">
              {questions[current].options.map((option, i) => (
                <button
                  key={i}
                  className={getOptionClass(option)}
                  onClick={() => handleSelect(option)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              ))}
            </div>

            {answered ? (
              <div className="answer-feedback">
                {selected === questions[current].correct ? (
                  <p className="feedback-correct">✅ Correct!</p>
                ) : (
                  <p className="feedback-wrong">
                    ❌ Wrong! Correct answer: <strong>{questions[current].correct}</strong>
                  </p>
                )}
                <button className="next-btn" onClick={handleNext}>
                  {current + 1 >= questions.length ? 'See Result →' : 'Next Question →'}
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;