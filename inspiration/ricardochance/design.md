# Ricardo Chance — Design Engineer & Creative Developer

## Mission
Create implementation-ready, token-driven UI guidance for Ricardo Chance — Design Engineer & Creative Developer that is optimized for consistency, accessibility, and fast delivery across documentation site.

## Brand
- Product/brand: Ricardo Chance — Design Engineer & Creative Developer
- URL: https://www.ricardochance.com/
- Audience: developers and technical teams
- Product surface: documentation site

## Style Foundations
- Visual style: structured, tokenized, content-first
- Main font style: `font.family.primary=Red Hat Display`, `font.family.stack=Red Hat Display, Red Hat Display Fallback, Arial, Helvetica, sans-serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=12.5px`, `font.size.sm=14px`, `font.size.md=16px`, `font.size.lg=18px`, `font.size.xl=20px`, `font.size.2xl=24px`, `font.size.3xl=40px`, `font.size.4xl=48px`
- Color palette: `color.text.primary=#f5f4f8`, `color.text.secondary=#333333`, `color.text.tertiary=#eeeeee`, `color.text.inverse=lab(96.3524 0.873238 -1.80593 / 0.4)`, `color.surface.base=#000000`, `color.surface.muted=#ffffff`, `color.surface.raised=#0d0718`, `color.surface.strong=lab(85.4229 4.46153 -7.63304 / 0.04)`
- Spacing scale: `space.1=2px`, `space.2=6px`, `space.3=12px`, `space.4=13px`, `space.5=16px`, `space.6=18px`, `space.7=20px`, `space.8=24px`
- Radius/shadow/motion tokens: `radius.xs=2px`, `radius.sm=1000px` | `motion.duration.instant=200ms`, `motion.duration.fast=300ms`, `motion.duration.normal=400ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (31), buttons (17), inputs (4), navigation (2).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
