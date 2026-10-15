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

def phone(image, cls, alt=''):
    return f'<span class="phone {cls}"><span class="phone-screen">{image}</span><span class="phone-island" aria-hidden="true"><i></i></span><span class="phone-home" aria-hidden="true"></span><span class="phone-keys" aria-hidden="true"></span></span>'

def card(project, index):
    p = project
    is_print = p.get('presentation') == 'menu'
    is_brand = p.get('presentation') == 'brand'
    is_concept = bool(p.get('concept'))
    tags = ' + '.join({'web':'Вэб', 'mobile':'Мобайл', 'graphic':'График / Хэвлэл'}[t] for t in p['types'])
    visual = f'<img class="project-image" src="{esc(p["image"])}" width="800" height="651" loading="lazy" decoding="async" alt="{esc(p["title"])} — дизайны харагдац">'
    if is_print:
        visual = f'''<span class="menu-spread"><img class="menu-page menu-page-left" src="https://ankhbayar-design.rightbirch64.chatgpt.site/assets/kamila-salad.webp" width="855" height="1200" loading="lazy" decoding="async" alt=""><img class="project-image menu-page menu-page-cover" src="{esc(p['image'])}" width="998" height="1400" loading="lazy" decoding="async" alt="Kamila Garden цэсний нүүр"><img class="menu-page menu-page-right" src="https://ankhbayar-design.rightbirch64.chatgpt.site/assets/kamila-soup.webp" width="855" height="1200" loading="lazy" decoding="async" alt=""></span><span class="print-edition">KAMILA GARDEN / MENU DESIGN / 2026</span>'''
    if is_brand:
        visual = '<span class="brand-grid" aria-hidden="true"></span><img class="project-image brand-wordmark" src="https://ankhbayar-design.rightbirch64.chatgpt.site/assets/proplus-logo.webp" width="570" height="174" loading="lazy" decoding="async" alt="PROPLUS үндсэн лого"><span class="brand-swatches" aria-hidden="true"><i style="background:#12367e"></i><i style="background:#2e9bd6"></i><i style="background:#8fd0ee"></i><i style="background:#0c1a33"></i></span><span class="brand-edition">IDENTITY SYSTEM / 26 PAGES</span>'
    if p.get('presentation')=='poster':
        pages=p['gallery'];selected=[next(x for x in pages if x['number']==n) for n in p['featured_numbers']]
        visual='<span class="poster-card-stack">'+''.join(f'<span class="poster-card-paper"><img class="'+('project-image' if i==1 else '')+'" src="'+esc(page['image'])+'" width="595" height="842" loading="lazy" decoding="async" alt="'+esc(page['label'])+'"></span>' for i,page in enumerate(selected))+'</span>'
    if p.get('editorial'):
        e=p['editorial']
        visual=f'<img class="project-image editorial-photo" src="{esc(p["image"])}" width="1600" height="1100" loading="lazy" decoding="async" alt="{esc(p["title"])} — нүүр визуал"><span class="editorial-shade" aria-hidden="true"></span><span class="editorial-wordmark">{esc(p["title"])}</span><span class="editorial-headline" data-editorial-heading="{esc(p["id"])}">{e["heading"]}</span><span class="editorial-preview"><span class="editorial-preview-chrome" aria-hidden="true"><i></i><i></i><i></i><b>INTERFACE / CONCEPT</b></span><img src="{esc(e["preview"])}" width="1400" height="960" loading="lazy" decoding="async" alt="{esc(p["title"])} — интерфэйсийн зохиомж"></span>'
    cover = p.get('cover')
    if cover:
        primary = f'<img class="project-image" src="{esc(cover["primary"])}" loading="lazy" decoding="async" alt="{esc(p["title"])} — үндсэн дэлгэц">'
        secondary = f'<img src="{esc(cover.get("secondary",cover["primary"]))}" loading="lazy" decoding="async" alt="">'
        if cover['kind'] == 'app':
            visual = f'<span class="showcase-orbit" aria-hidden="true"></span><span class="device-pair">{phone(primary,"phone-main")}{phone(secondary,"phone-secondary")}</span>'
        else:
            visual = f'<span class="showcase-orbit" aria-hidden="true"></span><span class="browser-mockup"><span class="browser-chrome" aria-hidden="true"><i></i><i></i><i></i><b>{esc(p["title"])}</b></span><span class="browser-screen">{primary}</span></span>'
            if cover['kind']=='dual':visual+=phone(secondary,'phone-companion')
    if p.get('video'): visual += '<span class="project-video-badge"><span aria-hidden="true">▶</span> Promo video · 0:30</span>'
    if is_concept:
        label = 'Шинэ вэб концепц' if p['concept']=='original' else 'Өөрийн санаачилгын redesign'
        visual += f'<span class="concept-type" data-concept-label="{esc(p["concept"])}">{label}</span>'
    disciplines = '<span>Logo & Visual Identity</span><span>Editorial & Print</span>' if is_print else '<span>Brand Identity</span><span>Brand Guidelines</span>' if is_brand else '<span>UI/UX Design</span><span>Logo Design</span>' if p['id']=='procreditor' else '<span>UI/UX Design</span><span>'+('Web & Mobile' if len(p['types'])>1 else 'Web Design' if p['types']==['web'] else 'Mobile App')+'</span>'
    if p.get('presentation')=='poster': disciplines='<span>Poster Design</span><span>Typography & Composition</span>'
    extra = 'project-card--print' if is_print else 'project-card--brand' if is_brand else 'project-card--showcase showcase-'+cover['kind'] if cover else ''
    if is_concept: extra += ' project-card--concept'
    if p.get('presentation')=='poster': extra+=' project-card--posters'
    if p.get('editorial'): extra+=' project-card--editorial editorial-'+p['editorial']['theme']
    styles = f'--project-bg:{esc(p["color"])}'
    if cover: styles += f';--showcase-bg:{esc(cover["background"])};--showcase-accent:{esc(cover["accent"])};--browser-ratio:{esc(cover["ratio"])}'
    demo_link = f'<a class="project-demo-link" href="{esc(p["demo"])}" target="_blank" rel="noopener noreferrer"><span data-i18n="openDemo">Демо нээх</span> ↗</a>' if p.get('demo') else ''
    return f'''<article class="project-card reveal {extra}" id="project-{esc(p['id'])}" style="{styles}">
      <button class="project-visual" data-open-project="{esc(p['id'])}" aria-label="Төсөл үзэх: {esc(p['title'])}" aria-haspopup="dialog">{visual}<span class="project-badge">{esc(tags)}</span><span class="project-open"><span data-i18n="viewProject">Төсөл үзэх</span><span aria-hidden="true">↗</span></span></button>
      <div class="project-info"><h3 class="project-title"><button data-open-project="{esc(p['id'])}" aria-haspopup="dialog">{esc(p['title'])}</button></h3><span class="project-year">{esc(p['year'])}</span><p class="project-subtitle">{esc(p['subtitle'])}</p><div class="project-tags">{disciplines}</div>{demo_link}</div>
    </article>'''

def photo(project_id):
    p = next(p for p in DATA if p['id'] == project_id)
    if p.get('concept'):
        return f'<div class="mosaic-tile interface-tile interface-web" style="--tile-bg:{esc(p["color"])}"><img src="{esc(p["image"])}" width="480" height="329" decoding="async" alt=""><span class="tile-caption">{esc(p["title"])}</span></div>'
    if p.get('cover'):
        cover=p['cover']
        return f'<div class="mosaic-tile interface-tile interface-{esc(cover["kind"])}" style="--tile-bg:{esc(cover["background"])}"><img src="{esc(cover["primary"])}" width="480" height="391" decoding="async" alt=""><span class="tile-caption">{esc(p["title"])}</span></div>'
    return f'''<div class="mosaic-tile" style="--tile-bg:{esc(p['color'])}"><img src="https://ankhbayar-design.rightbirch64.chatgpt.site/assets/{esc(project_id)}-hero.webp" width="480" height="391" decoding="async" alt=""><span class="tile-caption">{esc(p['title'])}</span></div>'''

def solid(color, content, short=False, dark=False):
    return f'''<div class="mosaic-tile color-tile {'mosaic-short' if short else ''}" style="--tile-bg:{color};{'color:white;' if dark else ''}">{content}</div>'''

def posters_markup():
    collection=next(p for p in DATA if p.get('presentation')=='poster');pages=collection['gallery']
    def piece(page,index,featured=False):
        cls='poster-piece' if featured else 'poster-tile'
        return f'<button class="{cls}" type="button" data-open-project="{esc(collection["id"])}" data-gallery-start="{index}" data-poster-page="{index}" aria-haspopup="dialog"'+('' if featured else ' tabindex="-1"')+f'><span class="poster-paper"><img src="{esc(page["image"])}" width="595" height="842" loading="lazy" decoding="async" alt="{esc(page["label"])}"></span><span class="poster-caption"><b>{page["number"]:02d}</b><span data-poster-caption="{index}">{esc(page["label"].split(" · ",1)[1])}</span><i aria-hidden="true">↗</i></span></button>'
    featured=''.join(piece(page,pages.index(page),True) for n in collection['featured_numbers'] for page in pages if page['number']==n)
    group=''.join(piece(page,i) for i,page in enumerate(pages))
    return '<div class="poster-featured">'+featured+'</div><div class="poster-marquee" id="poster-marquee"><div class="poster-track"><div class="poster-run">'+group+'</div><div class="poster-run" aria-hidden="true">'+group+'</div></div></div>'

columns = [
  [solid('#ef5d44','<span class="tile-kicker">UI / UX</span><span class="tile-type">UI.<br>UX.</span>'),photo('petcare'),photo('jiguur'),solid('#a7d9f5','<span class="tile-kicker">WEB & MOBILE</span><span class="tile-type">WEB.<br>APP.</span>',True),photo('proplus')],
  [solid('#fcdd71','<span class="tile-kicker">THINK. DESIGN. REFINE.</span><span class="tile-star">✳</span>'),photo('park'),solid('#151515','<span class="tile-kicker">A CONSIDERED PROCESS</span><span class="tile-type">FORM.<br>FLOW.</span>',False,True),photo('tusla'),solid('#ef5d44','<span class="tile-kicker">ANKHBAYAR.</span><span class="tile-type">A.</span>',True)],
  [solid('#a7d9f5',f'<span class="tile-kicker">SELECTED WORK</span><span class="tile-number">{len(DATA)}</span><span class="tile-kicker">DESIGN PROJECTS</span>'),photo('kamila-garden'),photo('tg-sport-concept'),solid('#fcdd71','<span class="tile-kicker">DIGITAL & PRINT</span><span class="tile-type">FORM.<br>FEEL.</span>',True),photo('nuudel')]
]
mosaic = ''
for i, items in enumerate(columns):
    group = '<div class="mosaic-run">'+''.join(items)+'</div>'
    offset = [-60,-142,14][i]
    mosaic += f'<div class="mosaic-column" style="--offset:{offset}px"><div class="mosaic-track">{group}{group}</div></div>'

DIST.mkdir(parents=True, exist_ok=True)
(DIST / 'assets').mkdir(exist_ok=True)
if (ROOT/'demos').is_dir(): shutil.copytree(ROOT/'demos',DIST/'demos',dirs_exist_ok=True)
template = (ROOT / 'src/index.html').read_text()
project_json = json.dumps(DATA, ensure_ascii=False).replace('<', '\\u003c')
counts = {'web':sum(p['types']==['web'] for p in DATA), 'mobile':sum(p['types']==['mobile'] for p in DATA), 'multi':sum('web' in p['types'] and 'mobile' in p['types'] for p in DATA), 'print':sum('graphic' in p['types'] for p in DATA)}
output = template.replace('{{MOSAIC}}',mosaic).replace('{{POSTERS}}',posters_markup()).replace('{{PROJECTS}}','\n'.join(card(p,i) for i,p in enumerate(DATA))).replace('{{PROJECT_DATA}}',project_json).replace('{{PROJECT_TOTAL}}',str(len(DATA)))
for key, value in counts.items():
    output = output.replace('{{COUNT_'+key.upper()+'}}',str(value))
    output = output.replace('{{SHARE_'+key.upper()+'}}',str(value/len(DATA)*100))
output = output.replace('{{DIGITAL_SHARE}}', str(sum('graphic' not in p['types'] for p in DATA)/len(DATA)*100))
(DIST / 'index.html').write_text(output)
for filename in ['styles.css','app.js']:
    shutil.copyfile(ROOT / 'src' / filename, DIST / 'assets' / filename)
print(f'Built {len(DATA)} project cards and 3 animated columns.')
