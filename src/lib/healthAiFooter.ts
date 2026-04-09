import type { KnowledgeMode } from "./knowledgeTypes";

/** Appended to Health AI replies (India contacts — user should verify locally). */
export const HEALTH_CONTACTS_IN = `
---
SheShark health directory (India — confirm numbers with your state or provider):
Women helpline: 181
Police: 100
Ambulance / medical emergency: 108 (use 102 in some regions)
National mental health helpline: 14416
NIMHANS mental health: 08046110007
This assistant is not a substitute for emergency services or a clinician.`;

export function appendHealthFooter(mode: KnowledgeMode, body: string): string {
  if (mode !== "health") return body;
  const t = body.trim();
  if (!t) return HEALTH_CONTACTS_IN.trim();
  if (t.includes("Women helpline: 181")) return t;
  return `${t}\n${HEALTH_CONTACTS_IN}`;
}
