"""Generate the buildless portfolio from its content and HTML template."""
import html
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DIST = ROOT / 'dist'
DATA = json.loads((ROOT / 'projects.json').read_text())
ARROW_NE = '<svg class="ui-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M5 5h14v14"/></svg>'

def esc(value):
    return html.escape(str(value), quote=True)

def phone(image, cls, alt=''):
    return f'<span class="phone {cls}"><span class="phone-screen">{image}</span><span class="phone-island" aria-hidden="true"><i></i></span><span class="phone-home" aria-hidden="true"></span><span class="phone-keys" aria-hidden="true"></span></span>'


def motion_card(p, tags):
    preview=p['demo']+'?card=1'
    return f'''<article class="project-card project-card--motion is-featured reveal" id="project-{esc(p['id'])}" style="--project-bg:{esc(p['color'])}">
      <div class="project-visual motion-project-visual">
        <img class="project-image motion-preview-poster" src="{esc(p['image'])}" width="825" height="1100" loading="lazy" decoding="async" alt="BOLD BITE — найман давхаргат сэндвич">
        <div class="motion-card-copy" aria-hidden="true"><span>MOTION / WEB CONCEPT</span><strong>BOLD<br>BITE.</strong><p data-i18n="boldCardLine">8 давхарга. Нэг тод санаа.</p><small>GSAP · HTML · CSS · JAVASCRIPT</small></div>
        <iframe class="motion-preview-frame" data-src="{esc(preview)}" title="BOLD BITE — eight photoreal layers, animated with GSAP" loading="lazy" tabindex="-1" aria-hidden="true" sandbox="allow-scripts allow-same-origin" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        <button class="motion-card-open" type="button" data-open-project="{esc(p['id'])}" aria-label="Төсөл үзэх: BOLD BITE" aria-haspopup="dialog"><span class="project-badge">{esc(tags)}</span><span class="concept-type" data-concept-label="original">Шинэ вэб концепц</span><span class="motion-preview-stamp" aria-hidden="true"><i></i>08 LAYERS / GSAP MOTION</span><span class="project-open"><span data-i18n="viewProject">Төсөл үзэх</span><span aria-hidden="true">{ARROW_NE}</span></span></button>
      </div>
      <div class="project-info"><h3 class="project-title"><button data-open-project="{esc(p['id'])}" aria-haspopup="dialog">BOLD BITE</button></h3><span class="project-year">{esc(p['year'])}</span><p class="project-subtitle">{esc(p['subtitle'])}</p><div class="project-tags"><span>Creative Frontend</span><span>Motion Design / GSAP</span></div><a class="project-demo-link" href="{esc(p['demo'])}" target="_blank" rel="noopener noreferrer"><span data-i18n="boldOpenDemo">Assemble / Explode / Replay</span> ↗</a></div>
    </article>'''

def card(project, index):
    p = project
    is_print = p.get('presentation') == 'menu'
    is_brand = p.get('presentation') == 'brand'
    is_concept = bool(p.get('concept'))
    tags = ' + '.join({'web':'Вэб', 'mobile':'Мобайл', 'graphic':'График / Хэвлэл'}[t] for t in p['types'])
    if p.get('presentation') == 'motion': return motion_card(p, tags)
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
    if index == 0: extra += ' is-featured'
    if is_concept: extra += ' project-card--concept'
    if p.get('presentation')=='poster': extra+=' project-card--posters'
    if p.get('editorial'): extra+=' project-card--editorial editorial-'+p['editorial']['theme']
    styles = f'--project-bg:{esc(p["color"])}'
    if cover: styles += f';--showcase-bg:{esc(cover["background"])};--showcase-accent:{esc(cover["accent"])};--browser-ratio:{esc(cover["ratio"])}'
    demo_link = f'<a class="project-demo-link" href="{esc(p["demo"])}" target="_blank" rel="noopener noreferrer"><span data-i18n="openDemo">Демо нээх</span> ↗</a>' if p.get('demo') else ''
    return f'''<article class="project-card reveal {extra}" id="project-{esc(p['id'])}" style="{styles}">
      <button class="project-visual" data-open-project="{esc(p['id'])}" aria-label="Төсөл үзэх: {esc(p['title'])}" aria-haspopup="dialog">{visual}<span class="project-badge">{esc(tags)}</span><span class="project-open"><span data-i18n="viewProject">Төсөл үзэх</span><span aria-hidden="true">{ARROW_NE}</span></span></button>
      <div class="project-info"><h3 class="project-title"><button data-open-project="{esc(p['id'])}" aria-haspopup="dialog">{esc(p['title'])}</button></h3><span class="project-year">{esc(p['year'])}</span><p class="project-subtitle">{esc(p['subtitle'])}</p><div class="project-tags">{disciplines}</div>{demo_link}</div>
    </article>'''

def mosaic_image(src, width, height):
    return f'<img src="{esc(src)}" width="{width}" height="{height}" decoding="async" alt="">'

def mosaic_tile(project, kind, background, visual, discipline, title=None, extra=''):
    caption = esc(title or project['title'])
    return f'<div class="mosaic-tile mosaic-work mosaic-{kind}" data-mosaic-project="{esc(project["id"])}" style="--tile-bg:{esc(background)}" {extra}><span class="mosaic-discipline">{esc(discipline)}</span>{visual}<span class="tile-caption">{caption}</span></div>'

def photo(project_id):
    p = next(p for p in DATA if p['id'] == project_id)
    if project_id == 'kamila-garden':
        pages = [('left','https://ankhbayar-design.rightbirch64.chatgpt.site/assets/kamila-pizza.webp'),('right','https://ankhbayar-design.rightbirch64.chatgpt.site/assets/kamila-main.webp'),('front','https://ankhbayar-design.rightbirch64.chatgpt.site/assets/kamila-cover.webp')]
        visual = '<span class="mosaic-menu-papers">'+''.join(f'<span class="mosaic-menu-paper mosaic-menu-{position}">{mosaic_image(src,999,1400)}</span>' for position,src in pages)+'</span>'
        return mosaic_tile(p,'menu','#e9dcc0',visual,'EDITORIAL / MENU DESIGN')
    if project_id == 'proplus':
        visual = '<span class="mosaic-brand-grid"></span><span class="mosaic-logo-card">'+mosaic_image('https://ankhbayar-design.rightbirch64.chatgpt.site/assets/proplus-logo.webp',570,174)+'</span><span class="mosaic-brand-sheets"><span>'+mosaic_image('https://ankhbayar-design.rightbirch64.chatgpt.site/assets/proplus-colors.webp',990,1400)+'</span><span>'+mosaic_image('https://ankhbayar-design.rightbirch64.chatgpt.site/assets/proplus-application.webp',990,1400)+'</span></span>'
        return mosaic_tile(p,'brand','#12367e',visual,'BRAND IDENTITY',title='PROPLUS · Brand system')
    if project_id == 'procreditor':
        visual = '<span class="mosaic-identity-card">'+mosaic_image('https://ankhbayar-design.rightbirch64.chatgpt.site/assets/procreditor-logo.svg',400,60)+'</span><span class="mosaic-identity-colors"><i></i><i></i><i></i><i></i></span><span class="mosaic-identity-web">'+mosaic_image(p['cover']['primary'],1500,1256)+'</span>'
        return mosaic_tile(p,'identity','#dfeef5',visual,'LOGO / DIGITAL IDENTITY',title='Procreditor · Logo & Web')
    if p.get('concept'):
        visual = '<span class="mosaic-concept-art">'+mosaic_image(p['image'],1400,960)+'</span>'
        discipline = '3D / SPORTSWEAR STUDIO' if project_id == 'tg-sport-concept' else 'SELF-INITIATED WEB CONCEPT'
        return mosaic_tile(p,'concept',p['color'],visual,discipline)
    cover = p['cover']
    if cover['kind'] == 'app':
        primary = phone(mosaic_image(cover['primary'],393,852),'phone-main')
        secondary = phone(mosaic_image(cover['secondary'],393,852),'phone-secondary')
        return mosaic_tile(p,'app',cover['background'],'<span class="mosaic-light"></span><span class="mosaic-phone-pair">'+secondary+primary+'</span>','MOBILE APP / UI DESIGN',title='Tusla · Mongolia Helper' if project_id=='tusla' else None)
    visual = '<span class="mosaic-light"></span><span class="mosaic-browser" style="--mosaic-browser-ratio:'+esc(cover['ratio'])+'"><span class="mosaic-browser-chrome"><i></i><i></i><i></i></span><span class="mosaic-browser-screen">'+mosaic_image(cover['primary'],1440,round(1440/cover['ratio']))+'</span></span>'
    return mosaic_tile(p,'web',cover['background'],visual,'WEB EXPERIENCE / UI DESIGN')

def mosaic_poster(number):
    p = next(p for p in DATA if p.get('presentation') == 'poster')
    page = next(page for page in p['gallery'] if page['number'] == number)
    backgrounds = {1:'#cedbe2',6:'#281c3b',8:'#dce4d8',11:'#301e29'}
    visual = '<span class="mosaic-poster-paper">'+mosaic_image(page['image'],595,842)+'</span>'
    return mosaic_tile(p,'poster mosaic-poster-'+str(number),backgrounds[number],visual,'POSTER / VISUAL DESIGN',title='Poster '+f'{number:02d}',extra=f'data-mosaic-poster="{number}"')

def filters_markup():
    items = [
        ('all','filterAll','Бүгд','filterAllHint','Бүх чиглэл','#dfebc8','<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>'),
        ('web','filterWeb','Вэб','filterWebHint','Дижитал туршлага','#c8def2','<rect x="2.5" y="4" width="19" height="13" rx="2.5"/><path d="M8 21h8m-4-4v4M3 8h18"/>'),
        ('mobile','filterMobile','Мобайл','filterMobileHint','Апп интерфэйс','#f2cfbf','<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-4 14h4"/>'),
        ('concept','filterConcept','Концепц','filterConceptHint','Өөрийн санаачилга','#ded2f3','<path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z"/>'),
        ('graphic','filterGraphic','График / Хэвлэл','filterGraphicHint','Лого · Постер · Цэс','#f0dfaa','<path d="m14 3 7 7-10 10H4v-7L14 3Zm-3 3 7 7M4 20l5-5"/><circle cx="10" cy="14" r="1"/>')
    ]
    buttons=[]
    for key,label_key,label,hint_key,hint,color,icon in items:
        count = sum(key=='all' or (bool(p.get('concept')) if key=='concept' else key in p['types']) for p in DATA)
        active=key=='all'
        buttons.append(f'<button class="filter'+(' is-active' if active else '')+f'" type="button" data-filter="{key}" aria-pressed="{str(active).lower()}" aria-controls="project-grid" style="--filter-accent:{color}"><span class="filter-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">{icon}</svg></span><span class="filter-copy"><strong data-i18n="{label_key}">{label}</strong></span><span class="filter-count">{count}</span></button>')
    return ''.join(buttons)

def posters_markup():
    collection=next(p for p in DATA if p.get('presentation')=='poster');pages=collection['gallery']
    def piece(page,index,featured=False):
        cls='poster-piece' if featured else 'poster-tile'
        return f'<button class="{cls}" type="button" data-open-project="{esc(collection["id"])}" data-gallery-start="{index}" data-poster-page="{index}" aria-haspopup="dialog"'+('' if featured else ' tabindex="-1"')+f'><span class="poster-paper"><img src="{esc(page["image"])}" width="595" height="842" loading="lazy" decoding="async" alt="{esc(page["label"])}"></span><span class="poster-caption"><b>{page["number"]:02d}</b><span data-poster-caption="{index}">{esc(page["label"].split(" · ",1)[1])}</span><i aria-hidden="true">↗</i></span></button>'
    featured=''.join(piece(page,pages.index(page),True) for n in collection['featured_numbers'] for page in pages if page['number']==n)
    group=''.join(piece(page,i) for i,page in enumerate(pages))
    return '<div class="poster-featured">'+featured+'</div><div class="poster-marquee" id="poster-marquee"><div class="poster-track"><div class="poster-run">'+group+'</div><div class="poster-run" aria-hidden="true">'+group+'</div></div></div>'

columns = [
  [photo('petcare'),mosaic_poster(1),photo('jiguur'),photo('proplus'),mosaic_poster(11)],
  [photo('kamila-garden'),photo('park'),mosaic_poster(6),photo('tusla'),photo('titem-concept')],
  [photo('tg-sport-concept'),mosaic_poster(8),photo('nuudel'),photo('procreditor'),photo('namu-coffee')]
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
output = template.replace('{{MOSAIC}}',mosaic).replace('{{FILTERS}}',filters_markup()).replace('{{POSTERS}}',posters_markup()).replace('{{PROJECTS}}','\n'.join(card(p,i) for i,p in enumerate(DATA))).replace('{{PROJECT_DATA}}',project_json).replace('{{PROJECT_TOTAL}}',str(len(DATA)))
(DIST / 'index.html').write_text(output)
for filename in ['styles.css','app.js']:
    shutil.copyfile(ROOT / 'src' / filename, DIST / 'assets' / filename)
print(f'Built {len(DATA)} project cards and 3 animated columns.')
