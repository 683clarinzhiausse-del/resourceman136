const { OpenAI } = require('openai');

function getOpenAiClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY in environment');
  }
  return new OpenAI({ apiKey });
}

function sanitizeUserText(text) {
  const t = String(text || '').trim();
  // Limit size to reduce abuse/cost
  return t.slice(0, 2000);
}

function clampConfidence(x) {
  const n = Number(x);
  if (Number.isNaN(n)) return 0.5;
  return Math.max(0, Math.min(1, n));
}

function extractJsonObject(content) {
  const s = String(content || '');
  const firstBrace = s.indexOf('{');
  const lastBrace = s.lastIndexOf('}');
  if (firstBrace >= 0 && lastBrace >= 0 && lastBrace > firstBrace) {
    return s.slice(firstBrace, lastBrace + 1);
  }
  return s;
}

function validateAndNormalizeOutput(obj) {
  // Ensure the response always matches the expected schema shape.
  const safeObj = obj && typeof obj === 'object' ? obj : {};

  const need_summary = typeof safeObj.need_summary === 'string' ? safeObj.need_summary : '';
  const intent = typeof safeObj.intent === 'string' ? safeObj.intent : '';
  const required_info = Array.isArray(safeObj.required_info) ? safeObj.required_info : [];
  const suggested_actions = Array.isArray(safeObj.suggested_actions) ? safeObj.suggested_actions : [];
  const escalation = typeof safeObj.escalation === 'boolean' ? safeObj.escalation : false;
  const escalation_reason =
    typeof safeObj.escalation_reason === 'string' ? safeObj.escalation_reason : '';

  // Enforce need_summary length < 60 words (roughly).
  const words = need_summary.trim().split(/\s+/).filter(Boolean);
  const trimmedNeed = words.slice(0, 60).join(' ');

  return {
    need_summary: trimmedNeed,
    intent,
    required_info: required_info.map((x) => String(x).trim()).filter(Boolean),
    suggested_actions: suggested_actions.map((x) => String(x).trim()).filter(Boolean),
    confidence: clampConfidence(safeObj.confidence),
    escalation,
    escalation_reason,
  };
}

async function generateCustomerNeed({ userMessage }) {
  const client = getOpenAiClient();
  const msg = sanitizeUserText(userMessage);
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  // Step 1: analysis (internal) — structured extraction of intent + missing info.
  const analysisSystem = `You are an expert ecommerce support analyst.
You will NOT output the final ticket summary here.
Instead, extract structured analysis to help generate a correct final JSON ticket.
Return ONLY valid JSON.
Schema for analysis output:
{
  "intent": string,
  "entities": { "order_id": string|null, "product": string|null, "issue_type": string|null },
  "missing_questions": string[],
  "escalation_candidate": boolean,
  "escalation_reasoning": string,
  "confidence_hint": number (0-1)
}`;
  const analysisUser = `Customer message:
${msg}`;

  const analysisResp = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: analysisSystem },
      { role: 'user', content: analysisUser },
    ],
    temperature: 0.2,
  });

  const analysisContent = analysisResp?.choices?.[0]?.message?.content || '';
  const analysisJsonStr = extractJsonObject(analysisContent);

  let analysis;
  try {
    analysis = JSON.parse(analysisJsonStr);
  } catch {
    // If analysis fails, fall back to a minimal analysis so the pipeline still works.
    analysis = {
      intent: '',
      entities: { order_id: null, product: null, issue_type: null },
      missing_questions: [],
      escalation_candidate: true,
      escalation_reasoning: 'Model failed to parse analysis JSON.',
      confidence_hint: 0.3,
    };
  }

  // Step 2: draft the FINAL output in the required schema.
  const finalSystem = `You are an expert ecommerce support analyst.
Given the extracted analysis and customer message, produce a helpful support ticket/"customer need" summary.
Rules:
- Output must be valid JSON only (no markdown, no extra text).
- JSON keys (exactly): need_summary, intent, required_info, suggested_actions, confidence, escalation, escalation_reason
- need_summary must be under 60 words.
- required_info: array of short questions/items the shop should ask or confirm.
- suggested_actions: array of practical steps the shop can do or the customer can try.
- confidence is a number 0-1.
- If the message is unclear or risky, set escalation=true and explain why in escalation_reason.
`;

  const finalUser = `Customer message:
${msg}

Extracted analysis:
${JSON.stringify(analysis, null, 2)}`;

  const draftResp = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: finalSystem },
      { role: 'user', content: finalUser },
    ],
    temperature: 0.25,
  });

  const draftContent = draftResp?.choices?.[0]?.message?.content || '';
  const draftJsonStr = extractJsonObject(draftContent);

  let draftObj;
  try {
    draftObj = JSON.parse(draftJsonStr);
  } catch {
    draftObj = {
      need_summary: '',
      intent: '',
      required_info: [],
      suggested_actions: [],
      confidence: 0.3,
      escalation: true,
      escalation_reason: 'Model failed to produce valid JSON for the final output.',
    };
  }

  const normalizedDraft = validateAndNormalizeOutput(draftObj);

  // Step 3: self-check/refine — ensure schema + constraints are satisfied.
  const refineSystem = `You are a strict JSON-only validator and editor for ecommerce support tickets.
You will receive a DRAFT JSON and the original message.
Return ONLY valid JSON that matches the required schema:
{
  "need_summary": string (<= 60 words),
  "intent": string,
  "required_info": string[],
  "suggested_actions": string[],
  "confidence": number (0-1),
  "escalation": boolean,
  "escalation_reason": string
}
Fix:
- must not include extra keys
- need_summary word limit
- ensure required_info and suggested_actions are arrays of strings
- ensure escalation_reason exists and makes sense when escalation=true
- confidence must be 0-1
`;

  const refineUser = `Original customer message:
${msg}

DRAFT JSON:
${JSON.stringify(normalizedDraft, null, 2)}`;

  const refineResp = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: refineSystem },
      { role: 'user', content: refineUser },
    ],
    temperature: 0.1,
  });

  const refineContent = refineResp?.choices?.[0]?.message?.content || '';
  const refineJsonStr = extractJsonObject(refineContent);

  try {
    const refinedObj = JSON.parse(refineJsonStr);
    return validateAndNormalizeOutput(refinedObj);
  } catch {
    // If refine fails, return the normalized draft.
    return normalizedDraft;
  }
}

module.exports = { generateCustomerNeed };

