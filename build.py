"""Generate the buildless portfolio from its content and HTML template."""
import html
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DIST = ROOT / 'dist'
DATA = json.loads((ROOT / 'projects.json').read_text())

def esc(value):
    return html.escape(str(value), quote=True)

def card(project, index):
    p = project
    tags = ' + '.join('Вэб' if t == 'web' else 'Мобайл' for t in p['types'])
    return f'''<article class="project-card" id="project-{esc(p['id'])}" style="--project-bg:{esc(p['color'])}">
      <button class="project-visual" data-open-project="{esc(p['id'])}" aria-label="Төсөл үзэх: {esc(p['title'])}" aria-haspopup="dialog"><img class="project-image" src="{esc(p['image'])}" width="800" height="651" loading="lazy" decoding="async" alt="{esc(p['title'])} — UI дизайны харагдац"><span class="project-badge">{esc(tags)}</span><span class="project-open"><span data-i18n="viewProject">Төсөл үзэх</span><span aria-hidden="true">↗</span></span></button>
      <div class="project-info"><h3 class="project-title"><button data-open-project="{esc(p['id'])}" aria-haspopup="dialog">{esc(p['title'])}</button></h3><span class="project-year">{esc(p['year'])}</span><p class="project-subtitle">{esc(p['subtitle'])}</p><div class="project-tags"><span>UI/UX Design</span><span>Figma</span></div></div>
    </article>'''

def photo(project_id):
    p = next(p for p in DATA if p['id'] == project_id)
    return f'''<div class="mosaic-tile" style="--tile-bg:{esc(p['color'])}"><img src="assets/{esc(project_id)}-hero.webp" width="480" height="391" decoding="async" alt=""><span class="tile-caption">{esc(p['title'])}</span></div>'''

def solid(color, content, short=False, dark=False):
    return f'''<div class="mosaic-tile color-tile {'mosaic-short' if short else ''}" style="--tile-bg:{color};{'color:white;' if dark else ''}">{content}</div>'''

columns = [
  [solid('#ef5d44','<span class="tile-kicker">UI / UX</span><span class="tile-type">UI.<br>UX.</span>'),photo('petcare'),photo('nuudel'),solid('#a7d9f5','<span class="tile-kicker">WEB & MOBILE</span><span class="tile-type">WEB.<br>APP.</span>',True),photo('mono')],
  [solid('#fcdd71','<span class="tile-kicker">THINK. DESIGN. REFINE.</span><span class="tile-star">✳</span>'),photo('park'),solid('#151515','<span class="tile-kicker">A CONSIDERED PROCESS</span><span class="tile-type">FORM.<br>FLOW.</span>',False,True),photo('tusla'),solid('#ef5d44','<span class="tile-kicker">ANKHBAYAR.</span><span class="tile-type">A.</span>',True)],
  [solid('#a7d9f5','<span class="tile-kicker">SELECTED WORK</span><span class="tile-number">11</span><span class="tile-kicker">DESIGN PROJECTS</span>'),photo('mono'),photo('tusla'),solid('#fcdd71','<span class="tile-kicker">LESS FRICTION.</span><span class="tile-type">CLEAR.<br>SIMPLE.</span>',True),photo('nuudel')]
]
mosaic = ''
for i, items in enumerate(columns):
    group = '<div class="mosaic-run">'+''.join(items)+'</div>'
    offset = [-60,-142,14][i]
    mosaic += f'<div class="mosaic-column" style="--offset:{offset}px"><div class="mosaic-track">{group}{group}</div></div>'

DIST.mkdir(parents=True, exist_ok=True)
(DIST / 'assets').mkdir(exist_ok=True)
template = (ROOT / 'src/index.html').read_text()
project_json = json.dumps(DATA, ensure_ascii=False).replace('<', '\\u003c')
output = template.replace('{{MOSAIC}}',mosaic).replace('{{PROJECTS}}','\n'.join(card(p,i) for i,p in enumerate(DATA))).replace('{{PROJECT_DATA}}',project_json)
(DIST / 'index.html').write_text(output)
for filename in ['styles.css','app.js']:
    shutil.copyfile(ROOT / 'src' / filename, DIST / 'assets' / filename)
print(f'Built {len(DATA)} project cards and 3 animated columns.')
