const CF_API = 'https://codeforces.com/api/problemset.problems';

const isEnglish = (text) => {
  return !(/[^\u0020-\u007E]/.test(text));
};

export const fetchCFProblems = async (tag) => {
  try {
    const response = await fetch(`${CF_API}?tags=${encodeURIComponent(tag)}`);
    const data = await response.json();

    if (data.status !== 'OK') {
      return [];
    }

    const filtered = data.result.problems
      .filter(p => p.rating >= 800 && p.rating <= 1600)
      .filter(p => isEnglish(p.name))
      .slice(0, 8);

    return filtered.map(p => ({
      id: `${p.contestId}${p.index}`,
      title: p.name,
      rating: p.rating,
      url: `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`
    }));

  } catch (error) {
    console.error('Codeforces API error:', error);
    return [];
  }
};