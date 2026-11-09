# SOM3AWARE PORTFOLIO — REDESIGN PLAN

## PROJECT

Personal developer portfolio: som3aware
Owner: Ahmed Ismail Abu Qahf
Website: https://som3aware.pages.dev

## CORE DIRECTION

Build a distinctive TUI-inspired developer portfolio that feels like a carefully crafted engineering workspace.

The interface should communicate:

- Software engineering experience.
- Strong frontend and product engineering capabilities.
- Design engineering mindset.
- Attention to detail and interface craftsmanship.
- Technical depth without unnecessary complexity.

The goal is NOT to imitate a terminal inside a browser.

The goal is to combine:

- TUI-inspired visual language.
- Git-inspired navigation and information architecture.
- Modern web usability.
- Editorial typography.
- A distinctive personal identity.

## DESIGN PRINCIPLES

1. FUNCTION OVER DECORATION
   Every terminal-inspired element must serve a purpose.

2. INFORMATION DENSITY
   Present meaningful information efficiently without making the interface feel crowded.

3. CLEAR HIERARCHY
   Prioritize content, readability, and navigation over decorative elements.

4. CONSISTENCY
   Use consistent spacing, typography, colors, borders, and interaction patterns.

5. KEYBOARD-FIRST EXPERIENCE
   Support keyboard navigation while keeping mouse and touch interactions intuitive.

6. REAL CONTENT
   Use actual projects, screenshots, architecture diagrams, technical decisions, and outcomes.

7. DISTINCTIVE PERSONALITY
   The interface should feel like Ahmed's engineering workspace, not a generic developer portfolio template.

8. RESPONSIVE BY DESIGN
   The experience must work naturally on desktop, tablet, and mobile.

## INSPIRATION

Primary reference:
https://github.com/diegomarino/tui-design

Use the repository as a design methodology and visual reference.

Important:
The repository targets actual terminal user interfaces, not browser applications. Adapt its principles to the web instead of copying terminal-specific constraints.

Use its:

- Theme architecture.
- Semantic color tokens.
- Visual composition principles.
- Interaction states.
- Accessibility considerations.
- Layout patterns.
- Theme validation approach.
- Design auditing methodology.

## THEME SYSTEM

OBJECTIVE

Include ALL themes and variants provided by the tui-design repository.

Do not restrict the portfolio to only a few selected themes.

Theme architecture should support:

- All repository color schemes.
- All available light and dark variants.
- Consistent semantic tokens.
- Easy theme switching.
- Persistent user preference.
- Live theme previews.

THEME PICKER

Create a searchable theme picker.

Organize themes by their original scheme names.

Each theme entry should display:

- Theme name.
- Light or dark variant.
- Small color preview.
- Selected state.

The user should be able to:

- Search themes.
- Preview themes.
- Switch themes immediately.
- Restore the default theme.

DEFAULT THEME

Use Rosé Pine as the initial signature theme.

Do not force Rosé Pine on visitors. Allow them to select any available theme.

SEMANTIC COLOR TOKENS

All themes must map to the same semantic token structure.

Required tokens:

background
background-subtle
surface
surface-raised
surface-overlay
surface-selected

foreground
foreground-muted
foreground-subtle
foreground-inverted

border
border-subtle
border-strong

accent
accent-foreground
accent-subtle

success
warning
danger
info

focus
selection
hover

Every component must consume semantic tokens rather than hardcoded theme colors.

INTERACTION STATES

Every interactive component must define:

- Default
- Hover
- Focus-visible
- Selected
- Active / Pressed
- Disabled

Ensure adequate contrast across all themes.

## TYPOGRAPHY SYSTEM

CURRENT DIRECTION

Keep Geist Pixel as the signature display typeface.

Replace Geist Mono because its appearance is not preferred.

The main monospace typeface should provide:

- Excellent readability.
- Distinctive character.
- Technical personality.
- Good performance at small sizes.
- Comfortable long-form reading.

TOP THREE FONT OPTIONS

1. JETBRAINS MONO

Personality:
Technical, precise, developer-oriented.

Strengths:

- Excellent readability.
- Strong character.
- Designed for programming environments.
- Good for navigation, body copy, metadata, and technical content.

2. INCONSOLATA

Personality:
Expressive, open, slightly editorial.

Strengths:

- Distinctive visual character.
- Softer appearance.
- Less generic than many monospace fonts.
- Works well with the TUI-inspired direction.

3. IBM PLEX MONO

Personality:
Structured, professional, humanist.

Strengths:

- Excellent readability.
- Balanced proportions.
- Professional without feeling generic.
- Works well for information-dense interfaces.

PREFERRED PAIRINGS

Option A:
Geist Pixel + JetBrains Mono

Option B:
Geist Pixel + Inconsolata

Option C:
Geist Pixel + IBM Plex Mono

RECOMMENDATION

Start with Geist Pixel + JetBrains Mono.

Keep Inconsolata as the strongest alternative.

Do not introduce Berkeley Mono as a required dependency because it is commercial and requires licensing.

FONT USAGE

Geist Pixel:

- Main signature headings.
- Section titles where appropriate.
- Selected visual accents.
- Small identity details.

Selected Monospace:

- Navigation.
- Body content.
- Project descriptions.
- Metadata.
- Technical details.
- Statistics.
- Keyboard shortcuts.
- Status bar.
- Labels.

Avoid using pixel typography everywhere. Its visual impact comes from selective usage.

## APP SHELL

Preserve the existing two-pane TUI-inspired layout.

HEADER

The header should contain:

- Personal brand: ahmed@som3aware
- Primary navigation.
- CV action.
- Theme switcher.
- Command palette shortcut.
- Help shortcut.

Consider removing the clock if it does not provide meaningful functionality.

LEFT PANE

Treat the left pane as a file explorer.

It should contain:

- Main navigation.
- Grouped sections.
- Clear active selection.
- Optional item descriptions.
- Small contextual metadata.
- Appropriate spacing.

RIGHT PANE

The right pane displays the selected page.

It should contain:

- Clear page heading.
- Relevant page content.
- Structured information.
- Project previews.
- Contextual actions.
- Consistent content spacing.

BOTTOM STATUS BAR

Keep the status bar, but make it contextual.

It can display:

- Current mode.
- Current section.
- Selected item.
- Available keyboard shortcuts.
- Interaction feedback.

Do not show every keyboard shortcut all the time.

Show the most relevant shortcuts and provide a help overlay for the full list.

## INFORMATION ARCHITECTURE

Simplify the main navigation into six destinations:

1. INDEX
2. WORK
3. EXPERIENCE
4. EXPERTISE
5. ABOUT
6. CONTACT

CV should remain accessible as a persistent header action instead of being a primary navigation destination.

INDEX

Purpose:
A concise overview of who Ahmed is and what he builds.

Content:

- Personal introduction.
- Professional positioning.
- Key statistics.
- Three featured projects.
- Current experience.
- Testimonial preview.
- Contact and CV actions.

Suggested positioning:

Full-stack engineer. Product-minded. Design-driven.

I build digital products end to end, combining engineering depth with a strong eye for interfaces and user experience.

WORK

Organize projects into three groups.

Featured:

- Stayro
- Hivo
- Reconciled

Other work:

- Outlined AI
- Sharp Studio
- Editor Setup

Archive:

- Open Trivia
- Covid Tracker
- Storefront API

Important projects should receive detailed case studies.

Each case study should include:

- Project context.
- Problem.
- Role and responsibilities.
- Contributions.
- Technical decisions.
- Challenges.
- Outcomes.
- Technology stack.
- Screenshots.
- Architecture diagrams where relevant.

Avoid generic project cards with only a title, description, and technology badges.

EXPERIENCE

Display professional experience chronologically.

Current:
Cypienta — Senior Full-stack Engineer.

Previous:
Eignspaces — Growth Engineer.
Nodogoro.
New Smart Egypt.
VOIS.

Where relevant, associate products and projects with the organization where they were developed.

For example, Stayro, Hivo, and Reconciled should be represented as separate products under their relevant employment context.

Consider a Git-inspired career timeline.

EXPERTISE

Create a dedicated page for technical capabilities.

Organize skills by discipline:

Frontend Engineering:

- React.
- Svelte.
- TypeScript.
- Modern CSS.
- Design systems.
- UI architecture.

Mobile Engineering:

- React Native.
- Expo.
- Mobile application architecture.

Backend Engineering:

- Node.js.
- Python.
- Django.
- APIs.
- Databases.

Infrastructure:

- Cloud infrastructure.
- CI/CD.
- Deployment.
- Monitoring.

AI:

- AI integrations.
- LLM APIs.
- AI-powered product workflows.

Only include technologies supported by actual experience.

Differentiate between:

- Strong experience.
- Working knowledge.
- Currently exploring.

Do not use skill progress bars or arbitrary percentages.

ABOUT

Merge the existing About and Philosophy sections.

Content:

- Personal introduction.
- Engineering journey.
- How Ahmed approaches software development.
- Engineering principles.
- Education.
- Mentorship.
- Interests beyond coding.

Keep the six existing engineering principles:

1. Simplicity in complexity.
2. Attention to detail.
3. Interface craftsmanship.
4. Engineering quality.
5. Writing and knowledge sharing.
6. Mentorship and growth.

CONTACT

Keep it simple.

Include:

- Email.
- LinkedIn.
- GitHub.
- X.
- Hashnode.
- Frontend Mentor.
- CV.

Avoid unnecessary contact forms or decorative sections.

## COMPONENT SYSTEM

Create reusable components for:

- File tree navigation.
- Navigation items.
- Active navigation states.
- Breadcrumbs.
- Page headings.
- Stat blocks.
- Metadata blocks.
- Technology labels.
- Status indicators.
- Project cards.
- Project previews.
- Experience timeline.
- Career graph.
- Testimonial blocks.
- Theme picker.
- Command palette.
- Keyboard shortcut hints.
- Help overlay.
- Toast notifications.
- Copy-to-clipboard actions.
- Section separators.

Components must support all themes and interaction states.

## GIT-INSPIRED VISUAL LANGUAGE

Use Git concepts as a visual language, not as decoration.

Potential elements:

- Branches.
- Commits.
- File paths.
- Repository structure.
- Commit metadata.
- Branch relationships.
- Current branch indicator.
- Git-inspired career timeline.

The career graph can represent career progression as branches, with projects connected to their respective organizations.

Avoid unnecessary Git terminology when it makes content harder to understand.

## KEYBOARD INTERACTIONS

Preserve existing keyboard navigation and improve it.

Suggested shortcuts:

j / k:
Move selection down or up.

h / l:
Navigate between panes or levels where appropriate.

Enter:
Open selected item.

Esc:
Close overlays or return to previous state.

/:
Search.

Cmd/Ctrl + K:
Open command palette.

?:
Open keyboard shortcuts help.

t:
Open theme picker.

y:
Copy current relevant content where applicable.

z:
Toggle expanded view where applicable.

gg:
Jump to the beginning.

G:
Jump to the end.

Requirements:

- Avoid keyboard conflicts with text inputs.
- Provide visible focus states.
- Keep mouse navigation functional.
- Support touch interactions.
- Provide contextual shortcut hints.
- Make all important pages directly accessible through URLs.

## COMMAND PALETTE

Add a command palette accessible through Cmd/Ctrl + K.

It should support:

- Navigate to pages.
- Search projects.
- Search experience.
- Switch themes.
- Open CV.
- Navigate to contact.
- Display available commands.

Keep the palette fast, minimal, and keyboard-friendly.

## CONTENT PRESENTATION

Use actual visual material wherever possible.

Prioritize:

- Real application screenshots.
- Product mockups.
- Architecture diagrams.
- Technical workflows.
- Before/after comparisons.
- Meaningful project outcomes.

Avoid generic illustrations and decorative graphics that do not communicate anything.

Use consistent image ratios and layouts.

## RESPONSIVE EXPERIENCE

Desktop:
Keep the two-pane workspace layout.

Tablet:
Reduce pane widths and maintain clear content hierarchy.

Mobile:
Use a single-pane navigation model.

The mobile experience should include:

- A compact header.
- A clear navigation mechanism.
- Readable project content.
- Touch-friendly controls.
- No horizontal overflow.
- No reliance on keyboard shortcuts.

## ACCESSIBILITY

Ensure:

- Semantic HTML.
- Keyboard accessibility.
- Visible focus indicators.
- Sufficient contrast.
- Accessible labels.
- Reduced-motion support.
- Appropriate heading hierarchy.
- Screen-reader-friendly navigation.

## PERFORMANCE

Prioritize:

- Fast initial rendering.
- Optimized images.
- Minimal unnecessary JavaScript.
- Efficient theme switching.
- Lightweight transitions.
- Proper font loading.
- No unnecessary animation.

## IMPLEMENTATION ROADMAP

PHASE 1 — VISUAL FOUNDATION

- Review the current implementation.
- Audit the existing typography.
- Test JetBrains Mono, Inconsolata, and IBM Plex Mono.
- Keep Geist Pixel as the display font.
- Implement semantic design tokens.
- Integrate all themes and variants from tui-design.
- Validate contrast and interaction states.

PHASE 2 — APP SHELL

- Refine the header.
- Improve the left navigation pane.
- Improve the content pane.
- Refine the bottom status bar.
- Add responsive layouts.
- Add command palette.
- Improve keyboard navigation.

PHASE 3 — COMPONENT SYSTEM

- Build reusable navigation components.
- Build project components.
- Build metadata and stat components.
- Build experience timeline.
- Build theme picker.
- Build command palette.
- Build keyboard help overlay.
- Validate components across themes.

PHASE 4 — CONTENT REDESIGN

- Redesign the index page.
- Restructure project listings.
- Build detailed case studies.
- Improve experience presentation.
- Create expertise page.
- Merge About and Philosophy.
- Simplify Contact.
- Improve CV accessibility.

PHASE 5 — INTERACTION AND POLISH

- Refine transitions.
- Improve focus states.
- Add useful interaction feedback.
- Improve mobile behavior.
- Validate accessibility.
- Optimize font and image loading.
- Test every theme.

PHASE 6 — FINAL AUDIT

Evaluate the portfolio across:

- Desktop.
- Tablet.
- Mobile.
- Light themes.
- Dark themes.
- Keyboard navigation.
- Mouse navigation.
- Touch navigation.
- Accessibility.
- Performance.
- Visual consistency.

## FINAL DESIGN DIRECTION

The final portfolio should feel like:

A personal engineering workspace with the precision of a developer tool, the clarity of a modern product interface, and the personality of an editorial portfolio.

Keep:

- TUI-inspired layout.
- Git-inspired identity.
- Geist Pixel display typography.
- A carefully selected monospace font.
- All tui-design themes.
- Keyboard-first interactions.
- Real engineering work.
- Clear information hierarchy.

Avoid:

- Fake terminal gimmicks.
- Excessive borders.
- Excessive ASCII decoration.
- Unnecessary animations.
- Generic portfolio layouts.
- Arbitrary skill percentages.
- Decorative Git elements without meaning.
- Pixel typography everywhere.

## SUCCESS CRITERIA

The redesign is successful when:

1. The portfolio feels distinctive and recognizable.
2. The interface remains easy to navigate.
3. All themes work consistently.
4. Typography is readable and intentional.
5. Projects communicate real engineering depth.
6. The Git-inspired language reinforces the personal identity.
7. Keyboard interactions feel natural.
8. Mobile usability is not compromised.
9. The experience feels polished without being overdesigned.
10. The portfolio positions Ahmed as a product-minded design engineer and software engineer.
