# Project Rules

- Keep all reference options shared in `src/lib/form-reference.ts` so every notification form uses the same institutional values.
- Validate each notification with Zod before simulated submission because browser attributes alone do not cover cross-field clinical rules.- Patient-event forms (Quedas, Identificação, Lesão, Cirurgia) share src/components/forms/PatientEventForm.tsx — one place for common clinical rules.
