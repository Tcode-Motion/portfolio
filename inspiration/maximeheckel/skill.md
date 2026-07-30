---
name: design-system-the-blog-of-maxime-heckel
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# The Blog of Maxime Heckel

## Mission
Deliver implementation-ready design-system guidance for The Blog of Maxime Heckel that can be applied consistently across documentation site interfaces.

## Brand
- Product/brand: The Blog of Maxime Heckel
- URL: https://blog.maximeheckel.com/
- Audience: developers and technical teams
- Product surface: documentation site

## Style Foundations
- Visual style: structured, accessible, implementation-first
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
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
