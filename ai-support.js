// Simple in-browser AI-like support: rule-based Q&A + guided escalation.
// No external calls.

(function () {
  const SUPPORT_EMAIL_DEFAULT = 'zhiausse@gmail.com';

  // Expand/adjust these FAQs over time.
  const FAQ = [
    {
      id: 'unlock-price',
      patterns: [/unlock.*price/i, /price.*locked/i, /member.*price/i, /real prices/i, /sign in/i],
      answer:
        'Member pricing unlocks only after you log in. Use the Login button, enter your email + password, then open Product details again.'
    },
    {
      id: 'cart-vs-purchase',
      patterns: [/cart.*history/i, /purchase.*history/i, /where.*is.*my.*purchase/i, /checkout/i, /buy.*now/i],
      answer:
        'This site currently logs items into Cart History when you click “Add to Cart”. Purchase History will show after you complete the checkout/commit step (if enabled in your version).'
    },
    {
      id: 'order-cancel',
      patterns: [/cancel.*order/i, /refund/i, /wrong.*size/i, /changed.*my.*mind/i],
      answer:
        'To cancel an order, open your Profile → (Cart or Purchase) → click “Cancel Order”, then choose a reason and confirm.'
    },
    {
      id: 'shipping',
      patterns: [/shipping/i, /delivery/i, /arrive/i, /tracking/i],
      answer:
        'Update your shipping info in Profile → Shipping Matrix, then monitor your order status in your history table.'
    },
    {
      id: 'account',
      patterns: [/login/i, /sign in/i, /password/i, /reset/i, /account.*missing/i],
      answer:
        'If login fails: confirm your email exists in the account database, and your password matches exactly. If needed, create a new account via “Create Account”.'
    }
  ];

  function normalize(s) {
    return (s || '').trim().toLowerCase();
  }

  function detectFAQ(question) {
    const q = question || '';
    for (const item of FAQ) {
      if (item.patterns.some((re) => re.test(q))) return item;
    }
    return null;
  }

  function buildSuggestionCard({ title, body, email }) {
    const safeEmail = email || SUPPORT_EMAIL_DEFAULT;
    const wrapper = document.createElement('div');
    wrapper.style.marginTop = '14px';
    wrapper.style.padding = '12px 14px';
    wrapper.style.background = 'var(--surface-secondary)';
    wrapper.style.borderRadius = '10px';

    wrapper.innerHTML = `
      <div style="font-weight: 800; color: #ffffff; margin-bottom: 6px;">${title}</div>
      <div style="color: var(--text-muted); line-height: 1.5; font-size: 13px;">${body}</div>
      <div style="margin-top: 10px; color: #ffffff; font-size: 13px;">
        Contact owner/support if this doesn\'t help:
        <span style="font-family: monospace;">${safeEmail}</span>
      </div>
    `;
    return wrapper;
  }

  function ensureUI() {
    const container = document.getElementById('ai-support-container');
    if (container) return;

    const parent =
      document.getElementById('customer-service-ai-support') ||
      document.getElementById('customer-ai-support') ||
      document.body;
    const el = document.createElement('div');
    el.id = 'ai-support-container';

    el.innerHTML = `
      <div style="margin-top: 14px; padding: 14px; background: var(--surface-secondary); border-radius: 10px;">
        <div style="font-weight: 800; color: #ffffff; margin-bottom: 6px;">
          AI Support (online)
        </div>

        <div style="color: var(--text-muted); font-size: 13px; line-height: 1.5; margin-bottom: 10px;">
          Type your problem and get a quick suggestion. If AI cannot solve it, you can contact the owner/support.
        </div>
        <div style="display:flex; gap:10px; align-items:flex-start;">
          <textarea id="ai-support-input" rows="3" placeholder="e.g., My price is locked after login" style="flex:1; min-height: 64px; resize: vertical; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: transparent; color: #ffffff;"></textarea>
        </div>
        <div style="margin-top: 10px; display:flex; gap: 10px;">
          <button id="ai-support-ask" class="btn-action" style="flex: 0 0 auto;">Ask AI</button>
          <button id="ai-support-clear" class="btn-sync" style="flex: 0 0 auto; background: transparent; border: 1px solid var(--border-color); color: #ffffff;">Clear</button>
        </div>
        <div id="ai-support-output" style="margin-top: 12px;"></div>
      </div>
    `;

    parent.appendChild(el);
  }

  function showOutput(node) {
    const out = document.getElementById('ai-support-output');
    if (!out) return;
    out.innerHTML = '';
    if (node) out.appendChild(node);
  }

  async function handleAsk() {
    const input = document.getElementById('ai-support-input');
    const qRaw = input && input.value;
    const q = normalize(qRaw);

    if (!q) {
      showOutput(buildSuggestionCard({
        title: 'Type your problem',
        body: 'Describe what is happening (ex: "price locked after login", "cart history empty", "need to cancel order").'
      }));
      return;
    }

    const analyzing = buildSuggestionCard({
      title: 'AI is analyzing…',
      body: 'Generating a customer-need summary from your message. Please wait a moment.'
    });
    showOutput(analyzing);

    // Try online AI endpoint first.
    try {
      const emailInput = document.getElementById('cs-email');
      const email = emailInput && emailInput.value ? emailInput.value.trim() : null;

      const resp = await fetch('/api/ai/need', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: qRaw })
      });

      if (!resp.ok) throw new Error(`Request failed: ${resp.status}`);

      const data = await resp.json();

      const needSummary = data?.need_summary || 'No summary returned.';
      const intent = data?.intent ? `Intent: ${data.intent}` : '';
      const escalation = data?.escalation === true;
      const confidence = typeof data?.confidence === 'number'
        ? `Confidence: ${(data.confidence * 100).toFixed(0)}%`
        : '';

      const requiredInfo = Array.isArray(data?.required_info) ? data.required_info : [];
      const suggestedActions = Array.isArray(data?.suggested_actions) ? data.suggested_actions : [];

      const bodyParts = [needSummary];
      if (intent) bodyParts.push(intent);
      if (confidence) bodyParts.push(confidence);
      if (requiredInfo.length) bodyParts.push(`To help, please confirm: ${requiredInfo.join(' · ')}`);
      if (suggestedActions.length) bodyParts.push(`Suggested next steps: ${suggestedActions.join(' · ')}`);
      if (escalation) bodyParts.push(`Escalation: ${data?.escalation_reason || 'Needed'}`);

      showOutput(buildSuggestionCard({
        title: escalation ? 'Customer Need (Escalate)' : 'Customer Need (Summary)',
        body: bodyParts.filter(Boolean).join('<br/>'),
        email
      }));
      return;
    } catch (e) {
      // Online AI failed -> fallback to offline FAQ.
      console.warn('Online AI failed, falling back to offline:', e);
      const match = detectFAQ(q);
      if (match) {
        showOutput(buildSuggestionCard({ title: 'AI Suggestion', body: match.answer }));
        return;
      }

      showOutput(buildSuggestionCard({
        title: 'Need help from the owner',
        body: 'Online AI is unavailable right now. Contact support/owner and include your email + what you tried.'
      }));
    }
  }


  function handleClear() {
    const input = document.getElementById('ai-support-input');
    if (input) input.value = '';
    const out = document.getElementById('ai-support-output');
    if (out) out.innerHTML = '';
  }

  function init() {
    ensureUI();

    const askBtn = document.getElementById('ai-support-ask');
    const clearBtn = document.getElementById('ai-support-clear');

    if (askBtn) askBtn.addEventListener('click', handleAsk);
    if (clearBtn) clearBtn.addEventListener('click', handleClear);

    const input = document.getElementById('ai-support-input');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          handleAsk();
        }
      });
    }
  }

})();
