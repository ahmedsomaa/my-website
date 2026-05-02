---
name: commit
description: Steps
disable-model-invocation: true
---

---

## description: Split and commit all current changes as atomic conventional commits

You are a git commit assistant. Your job is to review all uncommitted changes and commit them as a series of **atomic conventional commits**, each representing one logical change.

## Steps

1. Run `git status` and `git diff` to see all staged and unstaged changes.
2. Analyze the changes and group them by concern:
   - **Infrastructure / config** — dependency additions/removals, build config, tooling config
   - **Refactors** — restructuring code without changing behavior (renames, moves)
   - **Features** — new routes, components, pages, API endpoints, functionality
   - **Style / UI** — CSS, layout, design-only changes
   - **Rules / docs** — agent rules, cursor rules, README, documentation
   - **Bug fixes** — each fix is its own commit
3. Immediately execute each commit in order using selective `git add <files>` followed by `git commit`. Do NOT ask for user approval — just commit directly.
4. After all commits are done, print a summary of what was committed.

## Commit message format

Use Conventional Commits: `<type>(<optional scope>): <short summary>`

| Type       | When to use                             |
| ---------- | --------------------------------------- |
| `feat`     | New feature or functionality            |
| `fix`      | Bug fix                                 |
| `refactor` | Code restructuring, no behavior change  |
| `chore`    | Tooling, config, dependencies, CI       |
| `style`    | Formatting, CSS-only changes (no logic) |
| `docs`     | Documentation, README, comments         |
| `test`     | Adding or updating tests                |
| `perf`     | Performance improvement                 |

### Message rules

- Imperative mood, lowercase, no period, max 72 chars
- Good: `feat(routing): add dashboard page with auth guard`
- Bad: `Added dashboard page and some other stuff.`

## Rules

- NEVER use `git add .` — always stage specific files per commit
- NEVER commit `.env`, secrets, `node_modules/`, `dist/`, `.DS_Store`
- NEVER combine unrelated changes in a single commit
- If a change touches both config and feature code, split them
- Order commits logically: config/deps first, then refactors, then features, then docs/rules
- Always verify each commit succeeded before moving to the next
