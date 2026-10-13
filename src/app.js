'use strict';
(() => {
  const projects = JSON.parse(document.querySelector('#project-data').textContent);
  const copy = {
    mn: {
      skip:'Бүтээлүүд рүү очих',location:'Вэб & Мобайл',availability:'Хамтран ажиллах саналд нээлттэй',navWork:'Бүтээлүүд',navAbout:'Миний тухай',navProcess:'Процесс',navContact:'Холбогдох',heroEyebrow:'ХҮНД ЗОРИУЛСАН ДИЗАЙН',heroName1:'ЦОГБАЯР',heroName2:'АНХБАЯР',heroDescription:'Хэрэглэгчийн хэрэгцээнээс эхэлж, ойлгомжтой вэб болон мобайл бүтээгдэхүүн зохиодог.',viewWork:'Бүтээлүүд үзэх',downloadCV:'Танилцуулга үзэх',statProjects:'төсөл',statScreens:'дэлгэц',statSystems:'дизайн систем',scrollCue:'Бүтээлүүдтэй танилцах',pauseMotion:'Хөдөлгөөн түр зогсоох',playMotion:'Хөдөлгөөн асаах',selectedWork:'СОНГОСОН БҮТЭЭЛҮҮД',workPeriod:'Вэб · Мобайл · Дизайн систем / 2025–2026',workTitle:'Санаанаас<br>шийдэл хүртэл.',workIntro:'Өөр өөр хэрэгцээ. Нэг зорилго — хэрэглэгчид ойлгомжтой, ашиглахад хялбар туршлага.',filterAll:'Бүгд',filterWeb:'Вэб',filterMobile:'Мобайл',projectCount:'төсөл',aboutEyebrow:'ДИЗАЙНЫ АРД БАЙГАА ХҮН',aboutTitle:'Сайн байна уу,<br>би Анхбаяр.',aboutBody:'Хэрэглэгчийн хэрэгцээ, бодит асуудлыг ойлгож, тэдгээрийг цэгцтэй бүтэц, ойлгомжтой интерфэйс болгон хувиргахыг зорьдог UI/UX дизайнер.',aboutBody2:'Судалгаа, wireframe, UI дизайн, прототип болон хөгжүүлэгчид шилжүүлэх хүртэлх бүх шатанд ажилладаг.',fullName:'Цогбаяр Анхбаяр',skills:'УР ЧАДВАР & ХЭРЭГСЭЛ',processEyebrow:'АЖЛЫН ПРОЦЕСС',processNote:'Тодорхой зорилго. Цэгцтэй шийдэл.',processTitle:'Юу хийж өгөх вэ?',process1:'Судалгаа',processBody1:'Хэрэглэгч, асуудал, өрсөлдөгч болон бүтээгдэхүүний зорилгыг ойлгоно.',process2:'Бүтэц & Wireframe',processBody2:'Мэдээллийн бүтэц, хэрэглэгчийн урсгал, дэлгэцийн зохиомжийг төлөвлөнө.',process3:'UI & Прототип',processBody3:'Нэгдсэн визуал шийдэл, компонент болон дарж үзэх прототип бүтээнэ.',process4:'Туршилт & Handoff',processBody4:'Санал хүсэлтээр сайжруулж, хөгжүүлэгчид хэрэгтэй мэдээллийг бэлтгэнэ.',contactEyebrow:'ДАРААГИЙН ТӨСӨЛ',contactTitle:'Хамтдаа<br>бүтээе.',contactBody:'Шинэ бүтээгдэхүүн, шинэ санаа эсвэл хамтын ажиллагааны тухай ярилцъя.',footerTagline:'Хэрэглэгчээс эхэлдэг дизайн.',backTop:'Дээш',projectDetail:'ТӨСЛИЙН ТАНИЛЦУУЛГА',openFigma:'Figma дизайныг үзэх',backWork:'Бүтээлүүд рүү буцах',viewProject:'Төсөл үзэх',projectLabel:'UI/UX ДИЗАЙН',menuOpen:'Цэс нээх',menuClose:'Цэс хаах',close:'Хаах',filterLabel:'Төсөл шүүх'
    },
    en: {
      skip:'Skip to selected work',location:'Web & Mobile',availability:'Open to collaboration',navWork:'Selected work',navAbout:'About',navProcess:'Process',navContact:'Let’s talk',heroEyebrow:'DESIGN FOR PEOPLE',heroName1:'TSOGBAYAR',heroName2:'ANKHBAYAR',heroDescription:'I start with people’s needs and design clear experiences for web and mobile.',viewWork:'Explore my work',downloadCV:'View profile',statProjects:'projects',statScreens:'screens',statSystems:'design systems',scrollCue:'Discover the work',pauseMotion:'Pause animation',playMotion:'Play animation',selectedWork:'SELECTED WORK',workPeriod:'Web · Mobile · Design systems / 2025–2026',workTitle:'From an idea<br>to a clear solution.',workIntro:'Different challenges. One purpose: an experience that is clear, thoughtful and easy to use.',filterAll:'All work',filterWeb:'Web',filterMobile:'Mobile',projectCount:'projects',aboutEyebrow:'THE PERSON BEHIND THE DESIGN',aboutTitle:'Hello,<br>I’m Ankhbayar.',aboutBody:'I’m a UI/UX designer who turns user needs and real problems into clear structures and intuitive interfaces.',aboutBody2:'I work across the full design process, from research and wireframes to UI, prototypes and developer handoff.',fullName:'Ankhbayar Tsogbayar',skills:'SKILLS & TOOLS',processEyebrow:'HOW I WORK',processNote:'A clear purpose. A considered solution.',processTitle:'What I can help with.',process1:'Research',processBody1:'Understand the people, the problem, the competition and the product’s purpose.',process2:'Structure & Wireframes',processBody2:'Plan information architecture, user flows and the hierarchy of each screen.',process3:'UI & Prototypes',processBody3:'Create a consistent visual direction, reusable components and interactive prototypes.',process4:'Testing & Handoff',processBody4:'Refine the experience with feedback and prepare the details developers need.',contactEyebrow:'YOUR NEXT PROJECT',contactTitle:'Let’s<br>create.',contactBody:'Let’s talk about your next product, a new idea or a collaboration.',footerTagline:'Design that starts with people.',backTop:'Back to top',projectDetail:'PROJECT OVERVIEW',openFigma:'Explore the Figma design',backWork:'Back to work',viewProject:'View project',projectLabel:'UI/UX DESIGN',menuOpen:'Open menu',menuClose:'Close menu',close:'Close',filterLabel:'Filter projects'
    }
  };
  copy.mn.publicDetailsTitle='ДЭЛГЭРЭНГҮЙ ТАНИЛЦУУЛГА';
  copy.en.publicDetailsTitle='MORE ABOUT ME';
  copy.mn.publicDetailsBody='Миний ажлын туршлага болон холбоо барих мэдээлэлтэй портфолио сайтаас танилцаарай.';
  copy.en.publicDetailsBody='Explore my background and contact details on the live portfolio.';
  copy.mn.publicDetailsLink='Портфолио үзэх';
  copy.en.publicDetailsLink='Explore the portfolio';
  let lang = 'mn';
  try { const saved=localStorage.getItem('portfolio-language'); if(saved==='en'||saved==='mn') lang=saved; } catch (_) {}
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const header=document.querySelector('#site-header');
  const menuButton=document.querySelector('.menu-toggle');
  const art=document.querySelector('#hero-art');
  const motionButton=document.querySelector('#motion-toggle');
  const dialog=document.querySelector('#project-dialog');
  let selectedProject=null;
  let motionPaused=reduce.matches;
  let returnFocus=null;
  const titleOf=p=>lang==='en'?p.title_en:p.title;
  const categoryOf=p=>p.types.map(t=>copy[lang][t==='web'?'filterWeb':'filterMobile']).join(' + ');

  function updateMotion() {
    art.classList.toggle('is-paused',motionPaused);
    motionButton.setAttribute('aria-pressed',String(motionPaused));
    motionButton.setAttribute('aria-label',copy[lang][motionPaused?'playMotion':'pauseMotion']);
    motionButton.querySelector('.motion-label').textContent=copy[lang][motionPaused?'playMotion':'pauseMotion'];
    motionButton.querySelector('.motion-icon').textContent=motionPaused?'▷':'Ⅱ';
  }
  function populateDialog(p) {
    document.querySelector('#dialog-image').src=p.image;
    document.querySelector('#dialog-image').alt=titleOf(p)+' — '+(lang==='en'?'design preview':'дизайны харагдац');
    document.querySelector('.dialog-visual').style.setProperty('--project-bg',p.color);
    document.querySelector('#dialog-title').textContent=titleOf(p);
    document.querySelector('#dialog-subtitle').textContent=lang==='en'?p.subtitle_en:p.subtitle;
    document.querySelector('#dialog-description').textContent=lang==='en'?p.description_en:p.description;
    document.querySelector('#dialog-category').textContent=categoryOf(p);
    document.querySelector('#dialog-year').textContent=p.year;
    document.querySelector('#dialog-figma').href=p.figma;
  }
  function applyLanguage() {
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-i18n]').forEach(el=>{const value=copy[lang][el.dataset.i18n];if(value!==undefined) el.innerHTML=value;});
    const button=document.querySelector('#language-toggle');
    button.textContent=lang==='mn'?'EN':'MN';
    button.setAttribute('aria-label',lang==='mn'?'Switch to English':'Монгол хэл рүү шилжих');
    document.title=lang==='mn'?'Цогбаяр Анхбаяр — UI/UX Designer':'Ankhbayar Tsogbayar — UI/UX Designer';
    menuButton.setAttribute('aria-label',copy[lang][header.classList.contains('is-open')?'menuClose':'menuOpen']);
    document.querySelector('.filters').setAttribute('aria-label',copy[lang].filterLabel);
    document.querySelector('#dialog-close').setAttribute('aria-label',copy[lang].close);
    document.querySelector('.wordmark').setAttribute('aria-label',lang==='en'?'Ankhbayar — Home':'Анхбаяр — Эхлэл');
    document.querySelector('.contact-arrow').setAttribute('aria-label',lang==='en'?'Contact Ankhbayar':'Анхбаяртай холбогдох');
    projects.forEach(p=>{
      const card=document.getElementById('project-'+p.id);
      card.querySelector('.project-title button').textContent=titleOf(p);
      card.querySelector('.project-subtitle').textContent=lang==='en'?p.subtitle_en:p.subtitle;
      card.querySelector('.project-image').alt=titleOf(p)+' — '+(lang==='en'?'UI design preview':'UI дизайны харагдац');
      card.querySelector('.project-badge').textContent=categoryOf(p);
      card.querySelectorAll('[data-open-project]').forEach(b=>b.setAttribute('aria-label',copy[lang].viewProject+': '+titleOf(p)));
    });
    if(selectedProject)populateDialog(selectedProject);
    updateMotion();
  }
  function setMenu(open,focusFirst=false) {
    header.classList.toggle('is-open',open);
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',copy[lang][open?'menuClose':'menuOpen']);
    if(open&&focusFirst)document.querySelector('#main-nav a').focus();
  }
  menuButton.addEventListener('click',()=>setMenu(!header.classList.contains('is-open')));
  menuButton.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();setMenu(true,true);}});
  document.querySelectorAll('#main-nav a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('click',e=>{if(header.classList.contains('is-open')&&!header.contains(e.target))setMenu(false);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&header.classList.contains('is-open')){setMenu(false);menuButton.focus();}});
  const menuMedia=matchMedia('(min-width: 851px)');
  menuMedia.addEventListener('change',()=>setMenu(false));

  document.querySelector('#language-toggle').addEventListener('click',()=>{
    lang=lang==='mn'?'en':'mn';applyLanguage();
    try {localStorage.setItem('portfolio-language',lang);}catch(_){}
  });
  document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    document.querySelectorAll('.filter').forEach(b=>{const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});
    let count=0;
    projects.forEach(p=>{const visible=filter==='all'||p.types.includes(filter);document.getElementById('project-'+p.id).hidden=!visible;if(visible)count++;});
    document.querySelector('#project-count').textContent=String(count);
  }));
  document.querySelectorAll('[data-open-project]').forEach(button=>button.addEventListener('click',()=>{
    selectedProject=projects.find(p=>p.id===button.dataset.openProject);
    if(!selectedProject)return;
    if(typeof dialog.showModal!=='function'){window.open(selectedProject.figma,'_blank','noopener');return;}
    returnFocus=button;populateDialog(selectedProject);dialog.showModal();document.body.classList.add('has-dialog');
  }));
  const closeDialog=()=>dialog.close();
  document.querySelector('#dialog-close').addEventListener('click',closeDialog);
  document.querySelector('#dialog-done').addEventListener('click',closeDialog);
  dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();});
  dialog.addEventListener('close',()=>{document.body.classList.remove('has-dialog');selectedProject=null;if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});

  motionButton.addEventListener('click',()=>{
    motionPaused=!motionPaused;
    document.documentElement.classList.toggle('manual-motion',reduce.matches&&!motionPaused);
    updateMotion();
  });
  reduce.addEventListener('change',()=>{motionPaused=reduce.matches;document.documentElement.classList.remove('manual-motion');updateMotion();});
  document.addEventListener('visibilitychange',()=>document.body.classList.toggle('is-hidden',document.hidden));
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{art.classList.toggle('is-offscreen',!entries[0].isIntersecting);},{rootMargin:'60px'}).observe(art);}
  applyLanguage();
  if(!reduce.matches){document.body.classList.add('intro-running');setTimeout(()=>document.body.classList.remove('intro-running'),1700);}
})();
