"""Write tools/themes/<id>.json for themes the tui-design skill does not ship.

Every colour comes from the scheme's own published files (URLs in `sources`).
Colours published with alpha are flattened over the background they sit on
(`derived:` in provenance). Where the official files have no colour for a role,
the pick is marked `choice:` with the reason.

Usage: python3 tools/extra_themes.py   (then python3 tools/gen_themes.py tools/themes)
"""

import json
import pathlib

OUT = pathlib.Path(__file__).resolve().parent / 'themes'


def over(fg: str, bg: str) -> str:
    """Flatten #rrggbbaa (or #rgb / #rrggbb) over an opaque background."""
    fg = fg.lstrip('#')
    if len(fg) == 3:
        fg = ''.join(c * 2 for c in fg)
    a = int(fg[6:8], 16) / 255 if len(fg) == 8 else 1.0
    f = [int(fg[i : i + 2], 16) for i in (0, 2, 4)]
    b = [int(bg.lstrip('#')[i : i + 2], 16) for i in (0, 2, 4)]
    return '#' + ''.join(f'{round(x * a + y * (1 - a)):02x}' for x, y in zip(f, b))


def theme(id, name, scheme, variant, appearance, license, sources, palette, terminal, tokens, notes=()):
    prov, flat = {}, {}
    for k, (v, why) in tokens.items():
        flat[k] = v
        prov[k] = why
    return {
        'id': id, 'name': name, 'scheme': scheme, 'variant': variant, 'appearance': appearance,
        'license': license, 'sources': sources, 'palette': palette, 'terminal': terminal,
        'tokens': flat, 'provenance': prov, 'ansi16': {}, 'notes': list(notes),
    }


def term(bg, fg, ansi, sel=None, cursor=None):
    return {'background': bg, 'foreground': fg, 'cursor': cursor, 'cursor_text': None,
            'selection_background': sel, 'selection_foreground': None, 'ansi': ansi}


themes = []

# ---------- Flexoki (Steph Ango). Roles from the README colour table; accents use 400 on dark, 600 on light.
FX = {'black': '#100F0F', 'paper': '#FFFCF0', '950': '#1C1B1A', '900': '#282726', '850': '#343331', '800': '#403E3C',
      '700': '#575653', '600': '#6F6E69', '500': '#878580', '300': '#B7B5AC', '200': '#CECDC3', '150': '#DAD8CE',
      '100': '#E6E4D9', '50': '#F2F0E5',
      're600': '#AF3029', 'or600': '#BC5215', 'ye600': '#AD8301', 'gr600': '#66800B', 'cy600': '#24837B', 'bl600': '#205EA6', 'pu600': '#5E409D', 'ma600': '#A02F6F',
      're400': '#D14D41', 'or400': '#DA702C', 'ye400': '#D0A215', 'gr400': '#879A39', 'cy400': '#3AA99F', 'bl400': '#4385BE', 'pu400': '#8B7EC8', 'ma400': '#CE5D97'}
FX_SRC = {'palette': 'https://github.com/kepano/flexoki/blob/main/_generators/src/palette.ts',
          'terminal': 'https://github.com/kepano/flexoki/tree/main/kitty',
          'style_guide': 'https://github.com/kepano/flexoki#syntax-highlighting',
          'app_port': 'https://github.com/kepano/flexoki/tree/main/vscode'}
for dark in (True, False):
    t = '400' if dark else '600'
    bg, bg2, ui, ui2, ui3, tx3, tx2, tx = (
        ('black', '950', '900', '850', '800', '700', '500', '200') if dark
        else ('paper', '50', '100', '150', '200', '300', '600', 'black'))
    kitty = (['#100F0F', '#AF3029', '#66800B', '#AD8301', '#205EA6', '#A02F6F', '#24837B', '#878580',
              '#6F6E69', '#D14D41', '#879A39', '#D0A215', '#4385BE', '#CE5D97', '#3AA99F', '#CECDC3'] if dark else
             ['#100F0F', '#D14D41', '#879A39', '#D0A215', '#4385BE', '#CE5D97', '#3AA99F', '#FFFCF0',
              '#6F6E69', '#AF3029', '#66800B', '#AD8301', '#205EA6', '#A02F6F', '#24837B', '#F2F0E5'])
    themes.append(theme(
        f'flexoki-{"dark" if dark else "light"}', f'Flexoki {"Dark" if dark else "Light"}', 'flexoki',
        'dark' if dark else 'light', 'dark' if dark else 'light', 'MIT (kepano/flexoki)', FX_SRC, FX,
        term(FX[bg], FX[tx], kitty, sel=FX['800' if dark else '200']),
        {
            'bg.base': (bg, 'spec: bg = main background'),
            'bg.inset': (bg, 'spec: no tone below bg'),
            'bg.surface': (bg2, 'spec: bg-2 = secondary background'),
            'bg.raised': (ui, 'spec: ui = borders / raised ui'),
            'bg.overlay': (bg2, 'port: vscode editorWidget.background = bg-2'),
            'fg.default': (tx, 'spec: tx = primary text'),
            'fg.muted': (tx2, 'spec: tx-2 = muted text'),
            'fg.faint': (tx3, 'spec: tx-3 = faint text, comments'),
            'fg.on-accent': (bg, 'port: vscode button.foreground = bg'),
            'border.default': (ui3, 'choice: spec ui-3 (active borders); ui and ui-2 are too close to bg to outline panes'),
            'border.focus': (f'cy{t}', 'port: vscode button/badge = cyan'),
            'accent.primary': (f'cy{t}', 'port: vscode button.background = cyan'),
            'accent.secondary': (f'pu{t}', 'choice: purple, the spec accent not used by a status role'),
            'selection.bg': (ui3, 'port: kitty selection_background / vscode list.activeSelectionBackground'),
            'selection.fg': (tx, 'port: kitty selection_foreground'),
            'selection.inactive.bg': (ui2, 'port: vscode list.inactiveSelectionBackground'),
            'text-selection.bg': (ui3, 'port: kitty selection_background'),
            'status.error': (f're{t}', 'port: vscode editorError.foreground'),
            'status.warning': (f'or{t}', 'port: vscode editorWarning.foreground'),
            'status.success': (f'gr{t}', 'cross-scheme: green'),
            'status.info': (f'bl{t}', 'port: vscode editorInfo.foreground'),
        }))

# ---------- Vesper (Rauno Freiberg): monochrome with a peach accent
VS = {'bg': '#101010', 'bg2': '#161616', 'bg3': '#1C1C1C', 'sel': '#232323', 'hover': '#282828', 'line': '#343434',
      'gray5': '#505050', 'gray7': '#7E7E7E', 'gray': '#A0A0A0', 'fg': '#FFFFFF', 'peach': '#FFC799', 'peach2': '#FFCFA8',
      'red': '#FF8080', 'mint': '#99FFE4'}
themes.append(theme(
    'vesper', 'Vesper', 'vesper', 'main', 'dark', 'MIT (raunofreiberg/vesper)',
    {'app_port': 'https://github.com/raunofreiberg/vesper/blob/main/themes/Vesper-dark-color-theme.json',
     'terminal': 'https://github.com/mbadolato/iTerm2-Color-Schemes/blob/master/ghostty/Vesper (community port; Vesper ships no terminal palette)'},
    VS,
    term('#101010', '#ffffff', ['#101010', '#f5a191', '#90b99f', '#e6b99d', '#aca1cf', '#e29eca', '#ea83a5', '#a0a0a0',
                                '#7e7e7e', '#ff8080', '#99ffe4', '#ffc799', '#b9aeda', '#ecaad6', '#f591b2', '#ffffff'], sel='#988049'),
    {
        'bg.base': ('bg', 'port: editor.background'),
        'bg.inset': ('bg', 'port: no tone below the editor background'),
        'bg.surface': ('bg2', 'port: ui colour #161616'),
        'bg.raised': ('bg3', 'port: ui colour #1C1C1C'),
        'bg.overlay': ('bg3', 'port: ui colour #1C1C1C'),
        'fg.default': ('fg', 'port: editor.foreground'),
        'fg.muted': ('gray', 'port: statusBar.foreground'),
        'fg.faint': ('gray7', 'port: ui colour #7E7E7E'),
        'fg.on-accent': ('#000000', 'port: button.foreground'),
        'border.default': ('line', 'port: ui colour #343434'),
        'border.focus': ('peach', 'port: focusBorder'),
        'accent.primary': ('peach', 'port: button.background, textLink.foreground'),
        'accent.secondary': ('mint', 'port: editorGutter.addedBackground'),
        'selection.bg': ('sel', 'port: list.activeSelectionBackground'),
        'selection.fg': ('peach', 'port: list.activeSelectionForeground'),
        'selection.inactive.bg': ('hover', 'port: list.hoverBackground'),
        'text-selection.bg': (over('#FFFFFF25', '#101010'), 'derived: editor.selectionBackground #FFFFFF25 over bg'),
        'status.error': ('red', 'port: editorError.foreground'),
        'status.warning': ('peach', 'port: editorWarning.foreground'),
        'status.success': ('mint', 'port: editorGutter.addedBackground'),
        'status.info': ('peach2', 'choice: the theme has no info colour; its light peach #FFCFA8'),
    },
    ['Vesper uses its accent for warnings too; kept, it is the official mapping.']))

# ---------- GitHub (Primer functional tokens, @primer/primitives 11.10.0)
PR_SRC = {'palette': 'https://github.com/primer/primitives (dist/styleLint/functional/themes/{dark,light}.json, v11.10.0)'}
GH = {
    'dark': dict(bg='#0d1117', muted='#151b23', inset='#010409', neutral='#656c7633', fg='#f0f6fc', fgm='#9198a1', fgd='#656c76',
                 accent='#4493f8', accent_em='#1f6feb', success='#3fb950', attention='#d29922', danger='#f85149', done='#ab7df8',
                 border='#3d444d', sel='#1f6febb3',
                 ansi=['#2f3742', '#ff7b72', '#3fb950', '#d29922', '#58a6ff', '#be8fff', '#39c5cf', '#f0f6fc',
                       '#656c76', '#ffa198', '#56d364', '#e3b341', '#79c0ff', '#d2a8ff', '#56d4dd', '#ffffff']),
    'light': dict(bg='#ffffff', muted='#f6f8fa', inset='#f6f8fa', neutral='#818b981f', fg='#1f2328', fgm='#59636e', fgd='#818b98',
                  accent='#0969da', accent_em='#0969da', success='#1a7f37', attention='#9a6700', danger='#d1242f', done='#8250df',
                  border='#d1d9e0', sel='#0969da33',
                  ansi=['#1f2328', '#cf222e', '#116329', '#4d2d00', '#0969da', '#8250df', '#1b7c83', '#59636e',
                        '#393f46', '#a40e26', '#1a7f37', '#633c01', '#218bff', '#a475f9', '#3192aa', '#818b98']),
}
for mode, c in GH.items():
    raised = over(c['neutral'], c['bg'])
    themes.append(theme(
        f'github-{mode}', f'GitHub {mode.title()}', 'github', mode, mode, 'MIT (primer/primitives)', PR_SRC,
        {k: v for k, v in c.items() if k != 'ansi' and len(v) == 7},
        term(c['bg'], c['fg'], c['ansi'], sel=over(c['sel'], c['bg'])),
        {
            'bg.base': ('bg', 'spec: bgColor-default'),
            'bg.inset': ('inset', 'spec: bgColor-inset'),
            'bg.surface': ('muted', 'spec: bgColor-muted'),
            'bg.raised': (raised, 'derived: bgColor-neutral-muted over bgColor-default'),
            'bg.overlay': ('muted', 'choice: bgColor-muted; overlay-bgColor equals bg in light mode'),
            'fg.default': ('fg', 'spec: fgColor-default'),
            'fg.muted': ('fgm', 'spec: fgColor-muted'),
            'fg.faint': ('fgd', 'spec: fgColor-disabled'),
            'fg.on-accent': ('#ffffff', 'spec: fgColor-onEmphasis'),
            'border.default': ('border', 'spec: borderColor-default'),
            'border.focus': ('accent_em', 'spec: focus-outlineColor'),
            'accent.primary': ('accent', 'spec: fgColor-accent'),
            'accent.secondary': ('done', 'spec: fgColor-done'),
            'selection.bg': (raised, 'derived: bgColor-neutral-muted over bg (list selection on github.com)'),
            'selection.fg': ('fg', 'spec: fgColor-default'),
            'selection.inactive.bg': ('muted', 'spec: bgColor-muted'),
            'text-selection.bg': (over(c['sel'], c['bg']), 'derived: selection-bgColor over bg'),
            'status.error': ('danger', 'spec: fgColor-danger'),
            'status.warning': ('attention', 'spec: fgColor-attention'),
            'status.success': ('success', 'spec: fgColor-success'),
            'status.info': ('accent', 'spec: fgColor-accent'),
        }))

# ---------- Ayu (vscode-ayu built themes, master)
AY_SRC = {'app_port': 'https://github.com/ayu-theme/vscode-ayu/tree/master (ayu-mirage.json, ayu-light.json)',
          'palette': 'https://github.com/ayu-theme/ayu-colors'}
AY = {
    'mirage': dict(bg='#242936', panel='#1f2430', widget='#282e3b', inset='#181c26', fg='#fefaecc4', fgm='#d3e3fc73',
                   fgd='#d3e3fc39', guide='#8a919959', accent='#ffcc66', on='#735923', error='#ff6666', added='#87d96c',
                   modified='#80bfff', keyword='#ffad66', listsel='#63759926', sel='#409fff40',
                   ansi=['#171b24', '#f28273', '#87d96c', '#fcca60', '#6acdff', '#ddbbff', '#93e2c8', '#c7c7c7',
                         '#686868', '#f28779', '#d5ff80', '#ffcd66', '#73d0ff', '#dfbfff', '#95e6cb', '#ffffff']),
    'light': dict(bg='#fcfcfc', panel='#f8f9fa', widget='#f3f4f5', inset='#ebeef0', fg='#020a12a3', fgm='#021a3c7a',
                  fgd='#021a3c31', guide='#8a919959', accent='#f29718', on='#7e4b01', error='#e65050', added='#6cbf43',
                  modified='#478acc', keyword='#fa8d3e', listsel='#6b7d8f24', sel='#035bd626',
                  ansi=['#000000', '#f06b6c', '#6cbf43', '#e7a100', '#21a1e2', '#a176cb', '#4abc96', '#c7c7c7',
                        '#686868', '#f07171', '#86b300', '#eba400', '#22a4e6', '#a37acc', '#4cbf99', '#d1d1d1']),
}
for v, c in AY.items():
    bg = c['bg']
    themes.append(theme(
        f'ayu-{v}', f'Ayu {v.title()}', 'ayu', v, 'dark' if v == 'mirage' else 'light', 'MIT (ayu-theme)', AY_SRC,
        {k: x for k, x in c.items() if k != 'ansi' and len(x) == 7},
        term(c['panel'], over(c['fg'], c['panel']), c['ansi'], sel=over(c['sel'], bg)),
        {
            'bg.base': ('bg', 'port: editor.background'),
            'bg.inset': ('inset', 'port: statusBar.background'),
            'bg.surface': ('panel', 'port: sideBar/panel.background'),
            'bg.raised': ('widget', 'port: editorWidget.background'),
            'bg.overlay': ('widget', 'port: editorWidget.background'),
            'fg.default': (over(c['fg'], bg), 'derived: editor.foreground (alpha) over bg'),
            'fg.muted': (over(c['fgm'], bg), 'derived: descriptionForeground (alpha) over bg'),
            'fg.faint': (over(c['fgd'], bg), 'derived: editorLineNumber.foreground (alpha) over bg'),
            'fg.on-accent': ('on', 'port: button.foreground'),
            'border.default': (over(c['guide'], bg), 'derived: editorIndentGuide.activeBackground over bg; panel.border is darker than bg'),
            'border.focus': ('accent', 'port: focusBorder'),
            'accent.primary': ('accent', 'port: button.background, textLink.foreground'),
            'accent.secondary': ('keyword', 'port: syntax keyword colour'),
            'selection.bg': (over(c['listsel'], bg), 'derived: list.activeSelectionBackground over bg'),
            'selection.fg': (over(c['fg'], bg), 'port: list.activeSelectionForeground = editor.foreground'),
            'selection.inactive.bg': (over(c['listsel'], bg), 'derived: list.hoverBackground over bg'),
            'text-selection.bg': (over(c['sel'], bg), 'derived: editor.selectionBackground over bg'),
            'status.error': ('error', 'port: editorError.foreground'),
            'status.warning': ('accent', 'port: editorWarning.foreground = accent'),
            'status.success': ('added', 'port: vcs added'),
            'status.info': ('modified', 'port: gitDecoration.modifiedResourceForeground'),
        },
        ['Ayu uses its accent for warnings too; kept, it is the official mapping.']))

# ---------- Vitesse (Anthony Fu), theme-vitesse 1.0.0
VT_SRC = {'app_port': 'https://github.com/antfu/vscode-theme-vitesse (npm theme-vitesse 1.0.0, themes/*.json)',
          'terminal': 'npm theme-vitesse 1.0.0 extra/xterm-vitesse-*.json'}
VT = {
    'dark': dict(bg='#121212', sel='#181818', line='#191919', fg='#dbd7caee', fgm='#dedcd590', fgd='#dedcd550',
                 green='#4d9375', red='#cb7676', orange='#d4976c', blue='#6394bf', cyan='#5eaab5', tsel='#eeeeee18',
                 ansi=['#393a34', '#cb7676', '#4d9375', '#e6cc77', '#6394bf', '#d9739f', '#5eaab5', '#dbd7ca',
                       '#777777', '#cb7676', '#4d9375', '#e6cc77', '#6394bf', '#d9739f', '#5eaab5', '#ffffff']),
    'light': dict(bg='#ffffff', sel='#f7f7f7', line='#f0f0f0', fg='#393a34', fgm='#393a3490', fgd='#393a3450',
                  green='#1c6b48', red='#ab5959', orange='#a65e2b', blue='#296aa3', cyan='#2993a3', tsel='#22222218',
                  ansi=['#121212', '#ab5959', '#1e754f', '#bda437', '#296aa3', '#a13865', '#2993a3', '#dbd7ca',
                        '#aaaaaa', '#ab5959', '#1e754f', '#bda437', '#296aa3', '#a13865', '#2993a3', '#dddddd']),
}
for mode, c in VT.items():
    bg = c['bg']
    themes.append(theme(
        f'vitesse-{mode}', f'Vitesse {mode.title()}', 'vitesse', mode, mode, 'MIT (antfu/vscode-theme-vitesse)', VT_SRC,
        {k: x for k, x in c.items() if k != 'ansi' and len(x) == 7},
        term(bg, over(c['fg'], bg), c['ansi'], sel=over(c['tsel'], bg)),
        {
            'bg.base': ('bg', 'port: editor.background'),
            'bg.inset': ('bg', 'port: every panel uses the editor background'),
            'bg.surface': ('sel', 'port: list.activeSelectionBackground (the only raised tone)'),
            'bg.raised': ('line', 'port: panel.border tone'),
            'bg.overlay': ('sel', 'port: list.hoverBackground'),
            'fg.default': (over(c['fg'], bg), 'derived: editor.foreground over bg'),
            'fg.muted': (over(c['fgm'], bg), 'derived: descriptionForeground over bg'),
            'fg.faint': (over(c['fgd'], bg), 'derived: editorLineNumber.foreground over bg'),
            'fg.on-accent': (bg, 'port: button.foreground'),
            'border.default': (over(c['fgd'], bg), 'choice: line-number tone; the official panel.border is too close to bg to outline panes'),
            'border.focus': ('green', 'port: button.background (focusBorder is transparent)'),
            'accent.primary': ('green', 'port: button.background, textLink.foreground'),
            'accent.secondary': ('cyan', 'choice: ANSI cyan, not used by a status role'),
            'selection.bg': ('sel', 'port: list.activeSelectionBackground'),
            'selection.fg': (over(c['fg'], bg), 'port: list.activeSelectionForeground'),
            'selection.inactive.bg': ('sel', 'port: list.inactiveSelectionBackground'),
            'text-selection.bg': (over(c['tsel'], bg), 'derived: editor.selectionBackground over bg'),
            'status.error': ('red', 'port: editorError.foreground'),
            'status.warning': ('orange', 'port: editorWarning.foreground'),
            'status.success': ('green', 'port: gitDecoration.addedResourceForeground'),
            'status.info': ('blue', 'port: editorInfo.foreground'),
        },
        ['Vitesse uses its accent green for success too; kept, it is the official mapping.']))

# ---------- VS Code themes bundled with Shiki (npm tm-themes 1.12.12), converted role by role
import urllib.request

TM = 'https://cdn.jsdelivr.net/npm/tm-themes@1.12.12/themes/{}.json'
ANSI = ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White']


def lum(h):
    c = [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    c = [x / 12.92 if x <= .04045 else ((x + .055) / 1.055) ** 2.4 for x in c]
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]


def ratio(a, b):
    x, y = sorted((lum(a), lum(b)), reverse=True)
    return (x + .05) / (y + .05)


HUE_ANGLE = {'Red': 0, 'Yellow': 55, 'Green': 120, 'Cyan': 180, 'Blue': 225, 'Magenta': 300}


def syntax_hue(d, bg, name):
    """Most used syntax (tokenColors) colour whose hue is nearest the named hue."""
    import colorsys
    from collections import Counter
    cnt = Counter()
    for tc in d.get('tokenColors', []):
        f = (tc.get('settings') or {}).get('foreground')
        if isinstance(f, str) and f.startswith('#') and len(f.lstrip('#')) in (3, 6, 8):
            cnt[over(f, bg)] += 1
    best, score = None, None
    for col, n in cnt.items():
        r, g, b = (int(col[i:i + 2], 16) / 255 for i in (1, 3, 5))
        h, l, sat = colorsys.rgb_to_hls(r, g, b)
        if sat < .25:
            continue  # greys carry no hue
        dist = min(abs(h * 360 - HUE_ANGLE[name]), 360 - abs(h * 360 - HUE_ANGLE[name]))
        key = (dist > 40, dist - n)  # near the hue first, then most used
        if score is None or key < score:
            best, score = col, key
    return best or over(d['colors'].get('editor.foreground', '#808080'), bg)


def from_vscode(tm_id, id, name, scheme, variant, accent=None, local=None, license=None):
    """accent: (keys to try first, reason) when the theme's button colour is not its signature colour."""
    if local:
        d = json.loads((pathlib.Path(__file__).resolve().parent / 'theme-sources' / local).read_text())
    else:
        req = urllib.request.Request(TM.format(tm_id), headers={'User-Agent': 'theme-build'})
        d = json.load(urllib.request.urlopen(req, timeout=30))
    c = {k: v for k, v in d['colors'].items() if isinstance(v, str) and v.startswith('#')}
    bg = over(c['editor.background'], '#000000' if d['type'] == 'dark' else '#ffffff')
    notes = []

    def pick(*keys, base=None, visible=None):
        """First key the theme sets; alpha is flattened over `base` (default bg)."""
        for k in keys:
            if k in c:
                v = over(c[k], base or bg)
                if visible and ratio(v, bg) < visible:
                    continue
                return v, (f'port: {k}' if len(c[k].lstrip('#')) in (3, 6) else f'derived: {k} (alpha) over bg')
        return None

    ansi, why = [], []
    for bright in ('', 'Bright'):
        for n in ANSI:
            k = f'terminal.ansi{bright}{n}'
            alt = f"terminal.ansi{'' if bright else 'Bright'}{n}"
            if k in c:
                ansi.append(over(c[k], bg))
            elif alt in c:
                ansi.append(over(c[alt], bg))
                why.append(k)
            elif n in ('Black', 'White'):  # neither normal nor bright: black is the background, white the text colour
                text = c.get('editor.foreground') or c.get('foreground') or '#808080'
                ansi.append(bg if n == 'Black' else over(text, bg))
                why.append(k + (' (= background)' if n == 'Black' else ' (= text colour)'))
            else:  # no terminal colour for this hue: the theme's own syntax colour nearest that hue
                ansi.append(syntax_hue(d, bg, n))
                why.append(k + ' (= nearest syntax colour)')
    if why:
        notes.append(f"ANSI slots the theme does not set, copied from their normal/bright pair: {', '.join(why)}")
    fg = pick('editor.foreground', 'foreground') or (ansi[7], 'port: terminal.ansiWhite (no editor foreground)')
    t = {
        'bg.base': (bg, 'port: editor.background'),
        'bg.inset': (bg, 'port: editor.background'),
        'bg.surface': pick('sideBar.background', 'panel.background', 'editorWidget.background') or (bg, 'port: editor.background'),
        'bg.raised': pick('editorWidget.background', 'dropdown.background', 'list.hoverBackground') or (bg, 'port: editor.background'),
        'bg.overlay': pick('editorWidget.background', 'quickInput.background', 'dropdown.background') or (bg, 'port: editor.background'),
        'fg.default': fg,
        'fg.muted': pick('descriptionForeground', 'sideBar.foreground', 'editorLineNumber.activeForeground', 'tab.inactiveForeground') or fg,
        'fg.faint': pick('editorLineNumber.foreground', 'editorWhitespace.foreground') or (ansi[8], 'port: terminal.ansiBrightBlack'),
        'fg.on-accent': pick('button.foreground') or (bg, 'choice: background colour on the accent'),
        # a border has to be visible against bg to outline panes
        'border.default': pick('panel.border', 'editorGroup.border', 'sideBar.border', 'input.border', 'widget.border', visible=1.3)
                          or pick('editorLineNumber.foreground') or (ansi[8], 'port: terminal.ansiBrightBlack'),
        'accent.primary': (accent and pick(*accent[0], visible=2))
                          or pick('button.background', 'focusBorder', 'textLink.foreground', visible=2) or (ansi[4], 'port: terminal.ansiBlue'),
        'accent.secondary': (ansi[5], 'port: terminal.ansiMagenta'),
        'selection.bg': pick('list.activeSelectionBackground', 'editor.selectionBackground') or (bg, 'port: editor.background'),
        'selection.fg': pick('list.activeSelectionForeground') or fg,
        'selection.inactive.bg': pick('list.hoverBackground', 'list.inactiveSelectionBackground') or (bg, 'port: editor.background'),
        'text-selection.bg': pick('editor.selectionBackground', 'list.activeSelectionBackground') or (bg, 'port: editor.background'),
        'status.error': pick('editorError.foreground', 'errorForeground') or (ansi[1], 'port: terminal.ansiRed'),
        'status.warning': pick('editorWarning.foreground') or (ansi[3], 'port: terminal.ansiYellow'),
        'status.success': pick('gitDecoration.addedResourceForeground') or (ansi[2], 'port: terminal.ansiGreen'),
        'status.info': pick('editorInfo.foreground') or (ansi[4], 'port: terminal.ansiBlue'),
    }
    if accent:
        t['accent.primary'] = (t['accent.primary'][0], f"choice: {t['accent.primary'][1]}; {accent[1]}")
        t['border.focus'] = t['accent.primary']
    themes.append(theme(
        id, name, scheme, variant, d['type'], license or 'MIT (shikijs/textmate-grammars-themes, tm-themes 1.12.12; each theme keeps its own licence)',
        {'app_port': tm_id if local else TM.format(tm_id)}, {}, term(bg, t['fg.default'][0], ansi), t, notes))


for args in [
    ('poimandres', 'poimandres', 'Poimandres', 'poimandres', 'main'),
    ('night-owl', 'night-owl', 'Night Owl', 'night-owl', 'dark'),
    ('night-owl-light', 'night-owl-light', 'Night Owl Light', 'night-owl', 'light'),
    ('houston', 'houston', 'Houston', 'houston', 'main'),
    ('material-theme-palenight', 'material-palenight', 'Material Palenight', 'material', 'palenight'),
    ('material-theme-ocean', 'material-ocean', 'Material Ocean', 'material', 'ocean'),
    ('horizon', 'horizon', 'Horizon', 'horizon', 'dark'),
    ('horizon-bright', 'horizon-bright', 'Horizon Bright', 'horizon', 'bright'),
    ('github-dark-dimmed', 'github-dimmed', 'GitHub Dark Dimmed', 'github', 'dimmed',
     (['textLink.foreground'], 'blue link colour, to match GitHub Dark and Light (its button is green)')),
    ('synthwave-84', 'synthwave-84', "SynthWave '84", 'synthwave', 'main',
     (['terminal.ansiMagenta'], 'its neon pink; the button colour is a dull grey-purple')),
    ('andromeeda', 'andromeeda', 'Andromeeda', 'andromeeda', 'main'),
    ('aurora-x', 'aurora-x', 'Aurora X', 'aurora-x', 'main'),
    ('ayu-dark', 'ayu-dark', 'Ayu Dark', 'ayu', 'dark'),
    ('dark-plus', 'dark-plus', 'Dark+', 'vscode', 'dark'),
    ('light-plus', 'light-plus', 'Light+', 'vscode', 'light'),
    ('dracula-soft', 'dracula-soft', 'Dracula Soft', 'dracula', 'soft'),
    ('github-dark', 'github-dark-classic', 'GitHub Dark Classic', 'github', 'classic-dark'),
    ('github-light', 'github-light-classic', 'GitHub Light Classic', 'github', 'classic-light'),
    ('github-dark-high-contrast', 'github-dark-hc', 'GitHub Dark High Contrast', 'github', 'dark-hc'),
    ('github-light-high-contrast', 'github-light-hc', 'GitHub Light High Contrast', 'github', 'light-hc'),
    ('gruvbox-dark-hard', 'gruvbox-dark-hard', 'Gruvbox Dark Hard', 'gruvbox', 'dark-hard'),
    ('gruvbox-dark-soft', 'gruvbox-dark-soft', 'Gruvbox Dark Soft', 'gruvbox', 'dark-soft'),
    ('gruvbox-light-hard', 'gruvbox-light-hard', 'Gruvbox Light Hard', 'gruvbox', 'light-hard'),
    ('gruvbox-light-soft', 'gruvbox-light-soft', 'Gruvbox Light Soft', 'gruvbox', 'light-soft'),
    ('laserwave', 'laserwave', 'LaserWave', 'laserwave', 'main'),
    ('material-theme', 'material', 'Material', 'material', 'default'),
    ('material-theme-darker', 'material-darker', 'Material Darker', 'material', 'darker'),
    ('material-theme-lighter', 'material-lighter', 'Material Lighter', 'material', 'lighter'),
    ('min-dark', 'min-dark', 'Min Dark', 'min', 'dark'),
    ('min-light', 'min-light', 'Min Light', 'min', 'light'),
    ('monokai', 'monokai', 'Monokai', 'monokai', 'main'),
    ('one-dark-pro', 'one-dark-pro', 'One Dark Pro', 'onedark', 'pro'),
    ('plastic', 'plastic', 'Plastic', 'plastic', 'main'),
    ('red', 'red', 'Red', 'red', 'main'),
    ('slack-dark', 'slack-dark', 'Slack Dark', 'slack', 'dark'),
    ('slack-ochin', 'slack-ochin', 'Slack Ochin', 'slack', 'ochin'),
    ('snazzy-light', 'snazzy-light', 'Snazzy Light', 'snazzy', 'light'),
    ('vitesse-black', 'vitesse-black', 'Vitesse Black', 'vitesse', 'black'),
]:
    from_vscode(*args)


# ---------- themes published as a terminal palette (kitty, ghostty, Omarchy colors.toml).
# Files are kept in tools/theme-sources so the build runs offline; URLs are in each theme's sources.
import re

SRC = pathlib.Path(__file__).resolve().parent / 'theme-sources'

NOC = 'https://github.com/liviuschera/noctis/blob/master/themes/{}.json'
from_vscode(NOC.format('noctis'), 'noctis', 'Noctis', 'noctis', 'main', local='noctis.json', license='see liviuschera/noctis')
from_vscode(NOC.format('lux'), 'noctis-lux', 'Noctis Lux', 'noctis', 'lux', local='noctis-lux.json', license='see liviuschera/noctis')


def mix(a, b, t):
    """t of colour a over colour b."""
    x = [int(a[i:i + 2], 16) for i in (1, 3, 5)]
    y = [int(b[i:i + 2], 16) for i in (1, 3, 5)]
    return '#' + ''.join(f'{round(p * t + q * (1 - t)):02x}' for p, q in zip(x, y))


def read_palette(path):
    """kitty `key value`, ghostty `key = value` / `palette = N=#hex`, Omarchy `key = "#hex"`."""
    out = {}
    for line in path.read_text().splitlines():
        line = line.split('#', 1)[0] if not re.search(r'#[0-9a-fA-F]{6}', line) else line
        m = re.match(r'\s*palette\s*=\s*(\d+)=(#[0-9a-fA-F]{6})', line)
        if m:
            out[f'color{m[1]}'] = m[2].lower()
            continue
        m = re.match(r'\s*([\w-]+)\s*=?\s*"?(#[0-9a-fA-F]{6})', line)
        if m:
            out[m[1].replace('-', '_')] = m[2].lower()
    return out


def from_terminal(file, id, name, scheme, variant, appearance, url, license, accent_key=None, notes=()):
    c = read_palette(SRC / file)
    bg, fg = c['background'], c['foreground']
    ansi = [c[f'color{i}'] for i in range(16)]
    near = lambda v: ratio(v, bg) < 1.3  # too close to bg to see
    acc_key = accent_key or ('accent' if 'accent' in c else 'active_border_color' if 'active_border_color' in c else None)
    acc = (c[acc_key], f'port: {acc_key}') if acc_key and not near(c[acc_key]) else (ansi[4], 'choice: ANSI blue (no accent in the palette)')
    sel = c.get('selection_background')
    t = {
        'bg.base': (bg, 'port: background'),
        'bg.inset': (bg, 'port: background'),
        'bg.surface': (mix(fg, bg, .05), 'derived: 5% foreground over background (the palette has no panel tone)'),
        'bg.raised': (mix(fg, bg, .09), 'derived: 9% foreground over background'),
        'bg.overlay': (mix(fg, bg, .09), 'derived: 9% foreground over background'),
        'fg.default': (fg, 'port: foreground'),
        'fg.muted': (mix(fg, bg, .7), 'derived: 70% foreground over background'),
        'fg.faint': (ansi[8], 'port: color8 (bright black)') if not near(ansi[8]) else (mix(fg, bg, .45), 'derived: 45% foreground over background'),
        'fg.on-accent': (bg, 'choice: background colour on the accent'),
        'border.default': (ansi[8], 'port: color8 (bright black)') if not near(ansi[8]) else (mix(fg, bg, .3), 'derived: 30% foreground over background'),
        'border.focus': acc,
        'accent.primary': acc,
        'accent.secondary': (ansi[5], 'port: color5 (magenta)'),
        'selection.bg': (sel, 'port: selection_background') if sel and not near(sel) else (mix(fg, bg, .15), 'derived: 15% foreground over background'),
        'selection.fg': (c.get('selection_foreground', fg), 'port: selection_foreground'),
        'selection.inactive.bg': (mix(fg, bg, .09), 'derived: 9% foreground over background'),
        'text-selection.bg': (sel or mix(fg, bg, .15), 'port: selection_background'),
        'status.error': (ansi[1], 'port: color1 (red)'),
        'status.warning': (ansi[3], 'port: color3 (yellow)'),
        'status.success': (ansi[2], 'port: color2 (green)'),
        'status.info': (ansi[4], 'port: color4 (blue)'),
    }
    themes.append(theme(id, name, scheme, variant, appearance, license, {'terminal': url}, {}, term(bg, fg, ansi, sel=sel), t, list(notes)))


NF = 'https://github.com/EdenEast/nightfox.nvim/blob/main/extra/{}/kitty.conf'
for v in ['nightfox', 'dayfox', 'dawnfox', 'duskfox', 'nordfox', 'terafox', 'carbonfox']:
    from_terminal(f'nightfox-{v}.conf', v, v.title(), 'nightfox', v, 'light' if v in ('dayfox', 'dawnfox') else 'dark',
                  NF.format(v), 'MIT (EdenEast/nightfox.nvim)')

ZB = 'https://github.com/mcchrish/zenbones.nvim/blob/main/extras/kitty/zenbones_{}.conf'
for v in ['dark', 'light']:
    from_terminal(f'zenbones-{v}.conf', f'zenbones-{v}', f'Zenbones {v.title()}', 'zenbones', v, v, ZB.format(v), 'MIT (mcchrish/zenbones.nvim)')

from_terminal('sonokai-default.ghostty', 'sonokai', 'Sonokai', 'sonokai', 'default', 'dark',
              'https://terminalcolors.com/downloads/ghostty/sonokai-default (port of sainnhe/sonokai, which ships no terminal file)',
              'MIT (sainnhe/sonokai)')


if __name__ == '__main__':
    for t in themes:
        (OUT / f"{t['id']}.json").write_text(json.dumps(t, indent=2, ensure_ascii=False) + '\n')
        print('wrote', t['id'])
