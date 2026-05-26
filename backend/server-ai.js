const express = require('express');
const cors = require('cors');
const { generateCustomerNeed } = require('./ai');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.post('/api/ai/need', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Missing message' });
    }

    const result = await generateCustomerNeed({ userMessage: message });
    return res.json(result);
  } catch (err) {
    console.error('AI endpoint error:', err);
    return res.status(500).json({ error: 'AI service unavailable', details: String(err?.message || err) });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AI API server running on http://localhost:${PORT}`);
});

