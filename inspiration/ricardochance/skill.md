---
name: design-system-ricardo-chance-design-engineer-creative-develope
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Ricardo Chance — Design Engineer & Creative Developer

## Mission
Deliver implementation-ready design-system guidance for Ricardo Chance — Design Engineer & Creative Developer that can be applied consistently across documentation site interfaces.

## Brand
- Product/brand: Ricardo Chance — Design Engineer & Creative Developer
- URL: https://www.ricardochance.com/
- Audience: developers and technical teams
- Product surface: documentation site

## Style Foundations
- Visual style: structured, accessible, implementation-first
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
