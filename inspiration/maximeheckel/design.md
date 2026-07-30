# The Blog of Maxime Heckel

## Mission
Create implementation-ready, token-driven UI guidance for The Blog of Maxime Heckel that is optimized for consistency, accessibility, and fast delivery across documentation site.

## Brand
- Product/brand: The Blog of Maxime Heckel
- URL: https://blog.maximeheckel.com/
- Audience: developers and technical teams
- Product surface: documentation site

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=inter`, `font.family.stack=inter, inter Fallback`, `font.size.base=16px`, `font.weight.base=500`, `font.lineHeight.base=20.6208px`
- Typography scale: `font.size.xs=14px`, `font.size.sm=16px`, `font.size.md=24px`
- Color palette: `color.text.primary=oklch(0.6153 0.1675 262.04)`, `color.text.secondary=oklch(0.9366 0.027 262.04)`, `color.surface.base=#000000`, `color.text.inverse=oklch(0.7716 0.028 262.04)`, `color.surface.muted=oklch(0.1468 0.01 262.04)`, `color.surface.raised=oklch(0.1292 0.005 262.04)`, `color.border.default=oklch(0.6153 0.1675 262.04) oklch(0.6153 0.1675 262.04) oklch(0.2484 0.018 262.04)`
- Spacing scale: `space.1=1px`, `space.2=4px`, `space.3=12px`, `space.4=16px`, `space.5=24px`, `space.6=40px`, `space.7=96px`
- Radius/shadow/motion tokens: `radius.xs=12px` | `shadow.1=rgba(0, 0, 0, 0.8) 0px 0px 128px 24px`

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
- Include known page component density: links (68), buttons (4), navigation (2), lists (2).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
