# Fonts

Self-hosted so the terminal glyphs (`─ ├ └ ● ○ ▸ ✓ ✗ ▲ ⏎ █`) draw in the chosen font. The Google Fonts web subsets drop them.
Each folder keeps its licence. Licences: SIL Open Font License 1.1, except Ubuntu Sans Mono (Ubuntu Font Licence 1.0), Victor Mono (MIT) and Go Mono (BSD).
Adwaita Mono is second in every font stack: it has all the terminal glyphs and fills the gaps of the chosen font (Ubuntu Sans Mono has only box lines, blocks and ✓).

| Font                        | Source                                                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JetBrains Mono              | JetBrains/JetBrainsMono v2.304 webfonts                                                                                                                                                             |
| Fira Code                   | npm `firacode` 6.2.0                                                                                                                                                                                |
| Geist Mono                  | npm `geist` 1.4.2                                                                                                                                                                                   |
| Xanh Mono | google/fonts `ofl/xanhmono` TTFs, packed to woff2 (no glyph changes) |
| Ubuntu Sans Mono | google/fonts `ufl/ubuntusansmono` variable TTFs, packed to woff2 (no glyph changes). Ubuntu Font Licence 1.0 |
| Commit Mono | `@fontsource/commit-mono` 5.3.0 |
| Source Code Pro | adobe-fonts/source-code-pro, `release` branch WOFF2 |
| Go Mono | braver/programmingfonts (`fonts/resources/go-mono`); the Go project's BSD licence |
| Victor Mono | npm `victormono` 1.5.6 (MIT) |
| Maple Mono | `@fontsource/maple-mono` 5.3.0 (reserved font name, so unmodified) |
| Adwaita Mono | `@fontsource/*` 5.3.0, subset to Latin, punctuation, arrows and the box drawing, block, shape and dingbat ranges, with the default OpenType features only (no reserved font name, so OFL allows it) |

Heading fonts Geist Pixel and UnifontEX (unmodified, about 2 MB: its licence reserves the name `UnifontExMono`) load from Fontsource on demand.
All fonts are the original releases, not the Nerd Fonts patched builds (those add ~2 MB of icon glyphs the site does not use).
