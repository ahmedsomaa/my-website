---
name: commit
description: >-
  Conventional Commits: inspect git state, draft messages, and run git add +
  git commit when the user invokes /commit or asks to commit their changes.
---

# /commit — Conventional Commits

When the user invokes this workflow (e.g. `/commit`), asks for a conventional commit, or asks to commit their changes:

## Format

```text
<type>(<optional scope>): <short description>

[optional body — why/how, not repeating the title]

[optional footer(s)]
```

- **One subject line** after the colon: imperative mood, no trailing period, typically ~72 chars max (50 for the description part is a good target).
- **Scope**: optional noun in parentheses; use a package, area, or feature name (e.g. `auth`, `api`, `ui`).

## Allowed `type` values

Use the **most specific** type that fits:

| type | When |
|------|------|
| `feat` | New user-facing capability |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace; no code meaning change |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or correcting tests |
| `build` | Build system, dependencies, tool versions |
| `ci` | CI config/scripts |
| `chore` | Maintenance that does not fit above (e.g. misc tooling) |
| `revert` | Reverts a prior commit |

## Breaking changes

Either:

- Append `!` after the type/scope: `feat(api)!: remove legacy v1 endpoints`, **or**
- Footer: `BREAKING CHANGE: <explanation>`

## Workflow

1. Run `git status` and `git diff` (and `git diff --staged` if only staged changes matter).
2. If multiple **unrelated** changes exist, either recommend **splitting** into separate commits and execute **one commit per logical group** in order, or use one commit if the user asked for a single commit and the scope is clearly one feature.
3. Output the **subject** (and body/footer when they add real detail) so the user can see what will be committed.
4. **Execute the commit** for `/commit` and similar (“commit this”, “make the commit”, “stage and commit”):
   - Stage with **`git add` on specific paths** (not `git add .` unless the user explicitly wants the whole tree). Include **untracked** files that belong to the change.
   - Do **not** stage `.env`, secrets, `node_modules/`, `dist/`, `.DS_Store`, or other ignored artifacts.
   - Run **`git commit`** with the conventional message (use multiple `-m` flags for body paragraphs). Request **`git_write`** permission when using the terminal tool.
5. If the user **only** asked for a message text with **no** intent to commit (e.g. “suggest a commit message”), output the message **only** and do not run `git commit`.

## Examples

```text
feat(auth): add password reset request flow

fix(chart): avoid divide-by-zero when series is empty

docs: align README install steps with Bun

chore(deps): bump vite to 8.x
```
