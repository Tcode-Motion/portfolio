# Pacôme Pertant ✲ Portfolio

## Mission
Create implementation-ready, token-driven UI guidance for Pacôme Pertant ✲ Portfolio that is optimized for consistency, accessibility, and fast delivery across documentation site.

## Brand
- Product/brand: Pacôme Pertant ✲ Portfolio
- URL: https://pacomepertant.com/
- Audience: developers and technical teams
- Product surface: documentation site

## Style Foundations
- Visual style: minimal, utility-first, accessibility-prioritized
- Main font style: `font.family.primary=Indivisible Variable`, `font.family.stack=Indivisible Variable, Helvetica Neue, Arial, sans-serif`, `font.size.base=18px`, `font.weight.base=400`, `font.lineHeight.base=18px`
- Typography scale: `font.size.xs=14px`, `font.size.sm=16px`, `font.size.md=18px`, `font.size.lg=24px`, `font.size.xl=80px`
- Color palette: `color.text.primary=#0a0a0a`, `color.text.secondary=#fafafa`, `color.surface.base=#000000`
- Spacing scale: `space.1=4px`, `space.2=7px`, `space.3=14px`, `space.4=15px`, `space.5=28px`, `space.6=32px`
- Radius/shadow/motion tokens: `radius.xs=24px`, `radius.sm=50px`, `radius.md=100px` | `motion.duration.instant=300ms`, `motion.duration.fast=800ms`

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
- Include known page component density: buttons (9), links (8), navigation (1).

- Extraction diagnostics: Low sample size: fewer than 30 visible elements were extracted. Limited color diversity detected; color token inference confidence is low. Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
