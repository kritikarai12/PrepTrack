const TRIVIA_API = 'https://opentdb.com/api.php';

const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const fetchQuizQuestions = async (category, amount = 10) => {
  try {
    const url = `${TRIVIA_API}?amount=${amount}&category=${category}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.response_code !== 0) {
      return [];
    }

    return data.results.map((q, index) => {
      const correct = decodeHTML(q.correct_answer);
      const wrong = q.incorrect_answers.map(a => decodeHTML(a));
      const allOptions = [...wrong, correct].sort(() => Math.random() - 0.5);

      return {
        id: index,
        question: decodeHTML(q.question),
        options: allOptions,
        correct: correct
      };
    });

  } catch (error) {
    console.error('Trivia API error:', error);
    return [];
  }
};