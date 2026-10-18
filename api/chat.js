module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, name: 'NAVO AI', endpoint: '/api/chat' });
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Use GET or POST.' });
  }
  try {
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body || '{}');
    const question = body && typeof body.question === 'string' ? body.question.trim().slice(0, 2000) : '';
    if (!question) return res.status(400).json({ error: 'Please enter a question.' });
    const q = question.toLowerCase();
    let reply = '';
    if (/^(hi|hello|hey|salam|assalamualaikum)\b/.test(q)) reply = 'Hello! 👋 Welcome to NAVO AI. What can I help you with today?';
    else if (q.includes('who are you') || q.includes('what are you')) reply = "I'm NAVO AI, a helpful demo chatbot for questions, ideas and basic information.";
    else if (q.includes('artificial intelligence') || q === 'what is ai' || q.includes('explain ai')) reply = 'Artificial intelligence (AI) is technology that helps computers perform tasks such as understanding language, recognising patterns and generating responses.';
    else if (q.includes('website') && (q.includes('idea') || q.includes('build'))) reply = 'Website idea: start with a clear headline, mobile-friendly layout, simple navigation, useful content and a contact section. What type of website are you building?';
    else if (q.includes('interesting fact') || q.includes('fun fact')) reply = 'Interesting fact: an octopus has three hearts; two pump blood to its gills.';
    else if (q.includes('study tips') || q.includes('time management')) reply = 'Try studying for 25 minutes without distractions, then take a 5-minute break. Choose one specific task and review what you learned.';
    else {
      try {
        const url = new URL('https://api.duckduckgo.com/');
        url.searchParams.set('q', question); url.searchParams.set('format', 'json'); url.searchParams.set('no_html', '1'); url.searchParams.set('skip_disambig', '1');
        const response = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
        if (response.ok) {
          const data = await response.json();
          const topics = Array.isArray(data.RelatedTopics) ? data.RelatedTopics : [];
          const topic = topics.find(x => x && typeof x.Text === 'string' && x.Text.trim());
          reply = data.AbstractText || data.Answer || (topic && topic.Text) || '';
        }
      } catch (_) {}
      if (!reply) reply = "I couldn't find a useful quick-search result for that question. Try asking more specifically. This version uses demo answers and quick search, not a full AI model.";
    }
    return res.status(200).json({ ok: true, reply });
  } catch (_) {
    return res.status(400).json({ error: 'Invalid request. Please try again.' });
  }
};
