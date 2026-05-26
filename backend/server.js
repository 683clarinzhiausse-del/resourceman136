const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true, credentials: true }));
// Replace with your actual GitHub Pages URL
app.use(cors({ 
  origin: ["http://localhost:8080", "https://your-username.github.io"], 
  credentials: true 
}));
app.use(express.json());

// Payment Gateway Integration
app.use(require('./server-payment'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Payroll API Placeholder
app.get('/api/payroll/summary', (req, res) => {
  // In a production environment, this would query a database
  // rather than relying on the client's localStorage.
  res.json({ 
    message: "Payroll system active. State managed by client.",
    owner_account: "Christopher Jose Nyuda Rodriguez",
    account_number: "014763572417",
    swift: "GOTYPHM2XXX"
  });
});

// System Reset Endpoint
app.delete('/api/admin/reset-demo', (req, res) => {
  // Placeholder for clearing server-side database records
  res.json({ ok: true, message: "Reset signal received. Client-side data should be cleared." });
});

// NOTE: This is a starter backend.
// Next steps will add endpoints to store/load:
// - customer registry (users)
// - admin metrics
// - purchase history
// - block/unblock

// AI endpoints moved to server-ai.js
require('./server-ai');

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
