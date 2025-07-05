const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

// Basic in-memory session storage
const sessions = {};

async function geminiCall(prompt) {
  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    }),
  });
  const data = await response.json();
  if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }
  throw new Error(data.error?.message || 'Gemini API error');
}

// Start interview
router.post('/start', async (req, res) => {
  const { name, job, email } = req.body;
  if (!name || !job || !email) return res.status(400).json({ error: 'Missing fields' });
  const sessionId = Math.random().toString(36).slice(2, 12);
  try {
    const prompt = `You are an AI interviewer for the job title "${job}". Ask an engaging first interview question.`;
    const question = await geminiCall(prompt);
    sessions[sessionId] = {
      id: sessionId,
      name,
      job,
      email,
      questions: [{ question, answer: null, feedback: null }],
      created: Date.now(),
      ended: false
    };
    res.json({ id: sessionId, job, question });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get the next question
router.post('/question', async (req, res) => {
  const { sessionId } = req.body;
  const session = sessions[sessionId];
  if (!session) return res.status(404).json({ error: 'Session not found' });
  const last = session.questions[session.questions.length - 1];
  if (!last.answer) return res.json({ question: last.question }); // still waiting for answer

  // Prepare next question
  const prevQA = session.questions.map(q => `Q: ${q.question}\nA: ${q.answer ?? "(not answered)"}`).join('\n');
  const prompt = `You are an AI interviewer for a "${session.job}". The following are previous Q&A:\n${prevQA}\nAsk the next relevant technical or behavioral interview question.`;
  try {
    const question = await geminiCall(prompt);
    session.questions.push({ question, answer: null, feedback: null });
    res.json({ question });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Submit answer, get feedback, maybe next question
router.post('/answer', async (req, res) => {
  const { sessionId, answer } = req.body;
  const session = sessions[sessionId];
  if (!session) return res.status(404).json({ error: 'Session not found' });
  const curr = session.questions.find(q => !q.answer);
  if (!curr) return res.status(400).json({ error: 'No question to answer' });
  curr.answer = answer;

  // Feedback
  const prompt = `Candidate's answer to "${curr.question}":\n${answer}\nAs an expert interviewer, provide constructive feedback and a 1-100 score. Format: "Feedback: ... Score: NN/100"`;
  try {
    const feedback = await geminiCall(prompt);
    curr.feedback = feedback;

    let nextQuestion = null;
    if (session.questions.length < 5) { // max 5 Qs
      const qa = session.questions.map(q => `Q: ${q.question}\nA: ${q.answer ?? "(not answered)"}`).join('\n');
      const nextPrompt = `You are an AI interviewer for a "${session.job}". The following are previous Q&A:\n${qa}\nAsk the next relevant technical or behavioral interview question.`;
      nextQuestion = await geminiCall(nextPrompt);
      session.questions.push({ question: nextQuestion, answer: null, feedback: null });
    } else {
      session.ended = true;
    }

    res.json({ feedback, nextQuestion });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get session summary
router.get('/session/:id', (req, res) => {
  const session = sessions[req.params.id];
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json(session);
});

module.exports = router;