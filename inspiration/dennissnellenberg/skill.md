---
name: design-system-dennis-snellenberg-freelance-designer-developer
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Dennis Snellenberg • Freelance Designer & Developer

## Mission
Deliver implementation-ready design-system guidance for Dennis Snellenberg • Freelance Designer & Developer that can be applied consistently across documentation site interfaces.

## Brand
- Product/brand: Dennis Snellenberg • Freelance Designer & Developer
- URL: https://dennissnellenberg.com/
- Audience: developers and technical teams
- Product surface: documentation site

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=Dennis Sans`, `font.family.stack=Dennis Sans, sans-serif`, `font.size.base=18.432px`, `font.weight.base=450`, `font.lineHeight.base=29.4912px`
- Typography scale: `font.size.xs=11.06px`, `font.size.sm=15.67px`, `font.size.md=18.43px`, `font.size.lg=35.33px`, `font.size.xl=49.92px`, `font.size.2xl=57.6px`, `font.size.3xl=64.51px`, `font.size.4xl=80.64px`
- Color palette: `color.text.primary=#1c1d20`, `color.text.secondary=#ffffff`, `color.surface.base=#000000`, `color.surface.muted=#455ce9`
- Spacing scale: `space.1=9.22px`, `space.2=11.06px`, `space.3=13.06px`, `space.4=13.82px`, `space.5=16.59px`, `space.6=18.43px`, `space.7=19.97px`, `space.8=23.04px`
- Radius/shadow/motion tokens: `radius.xs=39.17px`, `radius.sm=50px` | `shadow.1=rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset`, `shadow.2=rgba(28, 29, 32, 0.176) 0px 0px 0px 1px inset` | `motion.duration.instant=250ms`, `motion.duration.fast=300ms`, `motion.duration.normal=700ms`, `motion.duration.slow=800ms`

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
