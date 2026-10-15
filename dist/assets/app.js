'use strict';
(() => {
  const projects = JSON.parse(document.querySelector('#project-data').textContent);
  const copy = {
    mn: {
      skip:'Бүтээлүүд рүү очих',location:'Вэб & Мобайл',availability:'Хамтран ажиллах саналд нээлттэй',navWork:'Бүтээлүүд',navAbout:'Миний тухай',navProcess:'Процесс',navContact:'Холбогдох',heroEyebrow:'ХҮНД ЗОРИУЛСАН ДИЗАЙН',heroName1:'ЦОГБАЯР',heroName2:'АНХБАЯР',heroDescription:'Хэрэглэгчийн хэрэгцээнээс эхэлж, ойлгомжтой вэб болон мобайл бүтээгдэхүүн зохиодог.',viewWork:'Бүтээлүүд үзэх',statProjects:'төсөл',statScreens:'дэлгэц',statSystems:'дизайн систем',scrollCue:'Бүтээлүүдтэй танилцах',pauseMotion:'Хөдөлгөөн түр зогсоох',playMotion:'Хөдөлгөөн асаах',selectedWork:'СОНГОСОН БҮТЭЭЛҮҮД',workPeriod:'Вэб · Мобайл · Дизайн систем / 2025–2026',workTitle:'Санаанаас<br>шийдэл хүртэл.',workIntro:'Өөр өөр хэрэгцээ. Нэг зорилго — хэрэглэгчид ойлгомжтой, ашиглахад хялбар туршлага.',filterAll:'Бүгд',filterWeb:'Вэб',filterMobile:'Мобайл',projectCount:'төсөл',aboutEyebrow:'МИНИЙ ТУХАЙ',aboutTitle:'Сайн байна уу,<br>би Анхбаяр.',aboutBody:'Хэрэглэгчийн хэрэгцээ, бодит асуудлыг ойлгож, тэдгээрийг цэгцтэй бүтэц, ойлгомжтой интерфэйс болгон хувиргахыг зорьдог UI/UX дизайнер.',aboutBody2:'Судалгаа, wireframe, UI дизайн, прототип болон хөгжүүлэгчид шилжүүлэх хүртэлх бүх шатанд ажилладаг.',fullName:'Цогбаяр Анхбаяр',skills:'УР ЧАДВАР & ХЭРЭГСЭЛ',processEyebrow:'АЖЛЫН ПРОЦЕСС',processNote:'Тодорхой зорилго. Цэгцтэй шийдэл.',processTitle:'Юу хийж өгөх вэ?',process1:'Судалгаа',processBody1:'Хэрэглэгч, асуудал, өрсөлдөгч болон бүтээгдэхүүний зорилгыг ойлгоно.',process2:'Бүтэц & Wireframe',processBody2:'Мэдээллийн бүтэц, хэрэглэгчийн урсгал, дэлгэцийн зохиомжийг төлөвлөнө.',process3:'UI & Прототип',processBody3:'Нэгдсэн визуал шийдэл, компонент болон дарж үзэх прототип бүтээнэ.',process4:'Туршилт & Handoff',processBody4:'Санал хүсэлтээр сайжруулж, хөгжүүлэгчид хэрэгтэй мэдээллийг бэлтгэнэ.',contactEyebrow:'ДАРААГИЙН ТӨСӨЛ',contactTitle:'Хамтдаа<br>бүтээе.',contactBody:'Шинэ бүтээгдэхүүн, шинэ санаа эсвэл хамтын ажиллагааны тухай ярилцъя.',footerTagline:'Хэрэглэгчээс эхэлдэг дизайн.',backTop:'Дээш',projectDetail:'ТӨСЛИЙН ТАНИЛЦУУЛГА',openFigma:'Figma дизайныг үзэх',backWork:'Бүтээлүүд рүү буцах',viewProject:'Төсөл үзэх',projectLabel:'UI/UX ДИЗАЙН',menuOpen:'Цэс нээх',menuClose:'Цэс хаах',close:'Хаах',filterLabel:'Төсөл шүүх'
    },
    en: {
      skip:'Skip to selected work',location:'Web & Mobile',availability:'Open to collaboration',navWork:'Selected work',navAbout:'About',navProcess:'Process',navContact:'Let’s talk',heroEyebrow:'DESIGN FOR PEOPLE',heroName1:'TSOGBAYAR',heroName2:'ANKHBAYAR',heroDescription:'I start with people’s needs and design clear experiences for web and mobile.',viewWork:'Explore my work',statProjects:'projects',statScreens:'screens',statSystems:'design systems',scrollCue:'Discover the work',pauseMotion:'Pause animation',playMotion:'Play animation',selectedWork:'SELECTED WORK',workPeriod:'Web · Mobile · Design systems / 2025–2026',workTitle:'From an idea<br>to a clear solution.',workIntro:'Different challenges. One purpose: an experience that is clear, thoughtful and easy to use.',filterAll:'All work',filterWeb:'Web',filterMobile:'Mobile',projectCount:'projects',aboutEyebrow:'ABOUT ME',aboutTitle:'Hello,<br>I’m Ankhbayar.',aboutBody:'I’m a UI/UX designer who turns user needs and real problems into clear structures and intuitive interfaces.',aboutBody2:'I work across the full design process, from research and wireframes to UI, prototypes and developer handoff.',fullName:'Ankhbayar Tsogbayar',skills:'SKILLS & TOOLS',processEyebrow:'HOW I WORK',processNote:'A clear purpose. A considered solution.',processTitle:'What I can help with.',process1:'Research',processBody1:'Understand the people, the problem, the competition and the product’s purpose.',process2:'Structure & Wireframes',processBody2:'Plan information architecture, user flows and the hierarchy of each screen.',process3:'UI & Prototypes',processBody3:'Create a consistent visual direction, reusable components and interactive prototypes.',process4:'Testing & Handoff',processBody4:'Refine the experience with feedback and prepare the details developers need.',contactEyebrow:'YOUR NEXT PROJECT',contactTitle:'Let’s<br>create.',contactBody:'Let’s talk about your next product, a new idea or a collaboration.',footerTagline:'Design that starts with people.',backTop:'Back to top',projectDetail:'PROJECT OVERVIEW',openFigma:'Explore the Figma design',backWork:'Back to work',viewProject:'View project',projectLabel:'UI/UX DESIGN',menuOpen:'Open menu',menuClose:'Close menu',close:'Close',filterLabel:'Filter projects'
    }
  };

  Object.assign(copy.mn, {
    heroDescription:'UI/UX, график ба брэндинг, motion graphics болон вэб дизайны чиглэлээр ажилладаг.',
    workPeriod:'Дижитал · График · Хэвлэл / 2025–2026',
    workIntro:'Аппын дэлгэцээс рестораны цэс хүртэл. Агуулга, бүтэц, өнгө болон дүрслэлийг нэг ойлгомжтой туршлага болгодог.',
    aboutBody2:'Судалгаа, wireframe, UI дизайн, прототип, хөгжүүлэгчид шилжүүлэх болон хэвлэлийн зохиомж дээр ажилладаг.',
    directionsTitle:'МЭРГЭЖЛИЙН ЧИГЛЭЛҮҮД',aboutBody:'Дижитал бүтээгдэхүүн, лого ба брэндинг, хэвлэлийн визуал болон motion дизайны чиглэлээр ажилладаг. Агуулга, бүтэц, өнгө, хөдөлгөөнийг нэг ойлгомжтой шийдэл болгохыг зорьдог.',filterGraphic:'График / Хэвлэл',scopeEyebrow:'DESIGN IN MANY FORMS',scopeTitle:'Дэлгэцээс<br>хэвлэл хүртэл.',
    scopeBody:'Нэг цуглуулга. Дөрвөн төрлийн дизайн. Миний ажлуудын хүрээг нэг дороос.',scopeFeatured:'Онцлох хэвлэлийн ажил · 17 хуудаст цэс',
    scopeTotal:'сонгосон төсөл',scopeWeb:'Вэб дизайн',scopeMobile:'Мобайл апп',scopeMulti:'Вэб + Мобайл',scopePrint:'График / Хэвлэл',identityTitle:'ЛОГО & БРЭНДИЙН ДИЗАЙН',identityHint:'Таних тэмдгээс нэгдсэн визуал системд.',identityGuidelines:'Лого & брэндийн удирдамж',identityLogo:'Лого дизайн',identityExplorations:'Логоны хувилбарууд & цэс',openGuidelines:'Брэндийн удирдамж үзэх · PDF',
    processCanvasLabel:'САНАА → БҮТЭЭЛ',viewFullSize:'Томруулж үзэх',previousPage:'Өмнөх зураг',nextPage:'Дараах зураг',
    galleryLabel:'Төслийн зургууд',choosePhase:'Энэ алхмыг үзэх',pauseMotion:'Хөдөлгөөн зогсоох',playMotion:'Хөдөлгөөн асаах'
  });
  Object.assign(copy.en, {
    heroDescription:'A multidisciplinary designer working across UI/UX, graphic and brand design, motion graphics and websites.',
    workPeriod:'Digital · Graphic · Print / 2025–2026',
    workIntro:'From an app screen to a restaurant menu. I bring content, structure, colour and imagery into one clear experience.',
    aboutBody2:'My work spans research, wireframes, UI, prototypes, developer handoff and editorial layouts for print.',
    directionsTitle:'DESIGN DISCIPLINES',aboutBody:'I work across digital products, logos and brand identities, editorial layouts and motion design, bringing content, structure, colour and movement into a coherent experience.',filterGraphic:'Graphic / Print',scopeEyebrow:'DESIGN IN MANY FORMS',scopeTitle:'From screen<br>to print.',
    scopeBody:'One collection. Four formats. A visual overview of the work I make.',scopeFeatured:'Featured print project · 17-page menu',
    scopeTotal:'selected projects',scopeWeb:'Web design',scopeMobile:'Mobile apps',scopeMulti:'Web + Mobile',scopePrint:'Graphic / Print',identityTitle:'LOGOS & BRAND IDENTITIES',identityHint:'From a mark to a coherent visual system.',identityGuidelines:'Logo & brand guidelines',identityLogo:'Logo design',identityExplorations:'Logo explorations & menu',openGuidelines:'View brand guidelines · PDF',
    processCanvasLabel:'IDEA → OUTCOME',viewFullSize:'View full size',previousPage:'Previous image',nextPage:'Next image',
    galleryLabel:'Project images',choosePhase:'Explore this step',pauseMotion:'Pause motion',playMotion:'Play motion'
  });

  Object.assign(copy.mn,{openFigmaShort:'Figma-д үзэх',openGuideShort:'Удирдамж үзэх',openImageShort:'Зураг үзэх',});
  Object.assign(copy.en,{openFigmaShort:'View in Figma',openGuideShort:'View guide',openImageShort:'View image',});

  Object.assign(copy.mn,{publicDetailsTitle:'Дэлгэрэнгүй танилцуулга',publicDetailsBody:'Миний ажлын туршлага болон холбоо барих мэдээлэлтэй портфолио сайтаас танилцаарай.',publicDetailsLink:'Портфолио үзэх'});
  Object.assign(copy.en,{publicDetailsTitle:'More about me',publicDetailsBody:'Explore my background and contact details on the live portfolio.',publicDetailsLink:'Explore the portfolio'});
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  let lang = 'mn';
  let savedMotion = null;
  try {
    const saved = localStorage.getItem('portfolio-language');
    if (saved === 'en' || saved === 'mn') lang = saved;
    savedMotion = localStorage.getItem('portfolio-motion');
  } catch (_) {}
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const header = $('#site-header');
  const menuButton = $('.menu-toggle');
  const art = $('#hero-art');
  const motionButton = $('#motion-toggle');
  const dialog = $('#project-dialog');
  const canvas = $('#process-canvas');
  let selectedProject = null;
  let galleryIndex = 0;
  let returnFocus = null;
  let motionPaused = reduce.matches || savedMotion === 'paused';
  let phase = 0;
  let processVisible = false;
  let processManual = false;
  let phaseTimer = null;
  const titleOf = p => lang === 'en' ? p.title_en : p.title;
  const subtitleOf = p => lang === 'en' ? p.subtitle_en : p.subtitle;
  const categoryKeys = {web:'filterWeb', mobile:'filterMobile', graphic:'filterGraphic'};
  const categoryOf = p => p.types.map(t => copy[lang][categoryKeys[t]]).join(' + ');
  const canAnimate = () => !motionPaused && !reduce.matches;
  const featureFrame = $('#tg-feature-frame');
  let featureVisible = false;
  const posterSection = $('#posters');
  const posterCollection = projects.find(p=>p.presentation==='poster');
  let postersVisible = false;
  let postersPaused = false;
  Object.assign(copy.mn,{aboutBody:'UI/UX, вэб, апп, лого ба брэндинг, хэвлэл болон motion дизайн хийдэг.',aboutBody2:'Claude, ChatGPT-ийг ахисан түвшинд ашиглаж, судалгаа, концепц, прототип, вэб код болон motion контент бүтээдэг.',profileEyebrow:'ТУРШЛАГА & БОЛОВСРОЛ',navPosters:'Постер',posterEyebrow:'ПОСТЕР & ВИЗУАЛ ЗОХИОМЖ',posterTitle:'Постер дизайн<span>.</span>',posterIntro:'Өөр өөр агуулга. Өөрийн өнгө төрх. Типографик, фото болон мэдээллийн зохиомжийн цуглуулга.',posterFeatured:'ОНЦЛОХ ПОСТЕРУУД',allPosters:'Бүх 11 постер үзэх',posterRailNote:'Бусад бүтээлүүд · Баруунаас зүүн тийш урсана',posterClickHint:'Постер дээр дарж томруулан үзээрэй.',pausePosters:'Урсгал зогсоох',playPosters:'Урсгал асаах',posterMotionOff:'Хөдөлгөөн унтраалттай',viewPoster:'Постер үзэх',contactEmail:'Имэйл',contactPhone:'Утас',contactInstagram:'Instagram',contactGithub:'GitHub',writeEmail:'Имэйл бичих'});
  Object.assign(copy.en,{aboutBody:'I design interfaces for websites and apps, logos and brand identities, print layouts and motion graphics.',aboutBody2:'I use Claude and ChatGPT at an advanced level for research, concepts, prototypes, web code and motion content.',profileEyebrow:'EXPERIENCE & EDUCATION',navPosters:'Posters',posterEyebrow:'POSTERS & VISUAL COMPOSITION',posterTitle:'Poster design<span>.</span>',posterIntro:'Different subjects. Distinct visual voices. A collection of typography, photography and considered composition.',posterFeatured:'FEATURED POSTERS',allPosters:'Explore all 11 posters',posterRailNote:'More from the collection · Moving right to left',posterClickHint:'Select a poster to explore it in detail.',pausePosters:'Pause the flow',playPosters:'Play the flow',posterMotionOff:'Motion is off',viewPoster:'View poster',contactEmail:'Email',contactPhone:'Phone',contactInstagram:'Instagram',contactGithub:'GitHub',writeEmail:'Write an email'});
  function syncPosterMotion() {
    const disabled=motionPaused || reduce.matches;
    const running=!disabled && !postersPaused && postersVisible && !document.hidden && !dialog.open;
    posterSection.classList.toggle('is-paused',!running);
    const button=$('#poster-motion-toggle');
    button.disabled=disabled;
    button.setAttribute('aria-pressed',String(postersPaused || disabled));
    $('#poster-motion-label').textContent=copy[lang][disabled?'posterMotionOff':postersPaused?'playPosters':'pausePosters'];
    $('#poster-motion-icon').textContent=disabled?'−':postersPaused?'▷':'Ⅱ';
  }
  $('#poster-motion-toggle').addEventListener('click',()=>{postersPaused=!postersPaused;syncPosterMotion();});
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries=>{postersVisible=entries[0].isIntersecting;if(postersVisible)posterSection.querySelectorAll('img').forEach(img=>img.loading='eager');syncPosterMotion();},{rootMargin:'160px 0px'}).observe(posterSection);
  } else postersVisible=true;
  Object.assign(copy.mn, {conceptEyebrow:'ӨӨРИЙН САНААЧИЛГЫН КОНЦЕПЦУУД',conceptTitle:'Сонирхлоос эхэлсэн<br>шинэ хувилбарууд.',conceptIntro:'Одоо байгаа вэбүүдийг өөрийн сонирхлоор дахин загварчилсан 4 ажил. Namu Coffee нь «би вэбийг нь хийвэл…» гэж шинээр төсөөлсөн концепц.',tgKicker:'TG SPORT / ӨӨРИЙН САНААЧИЛГЫН REDESIGN',tgIntro:'Хувцасны дизайныг хардаг байсан бол одоо өөрөө бүтээ. Өнгөө сонгоод, нэр болон дугаараа өмсгөл дээрээ тавиарай.',tgRotate:'Чирж эргүүлнэ',tgCustomize:'Өнгө · Нэр · Дугаар',openStudio:'Бүрэн 3D студи нээх',tgNote:'Одоо байгаа вэбийг өөрийн санаагаар сайжруулсан хувийн концепц.',tgDragHint:'Чирж эргүүлээд, доороос нь өөрчилж үзээрэй.',load3d:'3D харагдац нээх',conceptCollection:'TITEM · barber.mn · Таван хошуу · Namu Coffee',showConcepts:'5 концепцийг үзэх',filterConcept:'Санаачилгын концепц',openDemo:'Демо нээх',conceptOriginal:'Шинэ вэб концепц',conceptRedesign:'Өөрийн санаачилгын redesign',conceptNote:'Өөрийн сонирхлоор хийсэн redesign концепц. Албан ёсны захиалгат ажил биш; үйлдлүүд нь демо.',conceptNoteOriginal:'«Би вэбийг нь хийвэл…» гэж шинээр төсөөлсөн Namu Coffee вэб концепц. Үйлдлүүд нь демо.'});
  Object.assign(copy.en, {conceptEyebrow:'SELF-INITIATED CONCEPTS',conceptTitle:'A little curiosity.<br>A new perspective.',conceptIntro:'Four personal redesigns of existing websites. Namu Coffee is an original “if I designed their website” concept.',tgKicker:'TG SPORT / SELF-INITIATED REDESIGN',tgIntro:'Go from viewing a kit to making it your own. Choose a colour, then add your name and number to the uniform.',tgRotate:'Drag to rotate',tgCustomize:'Colour · Name · Number',openStudio:'Open the full 3D studio',tgNote:'An independent, personal redesign of the existing website.',tgDragHint:'Drag to rotate. Use the controls below to make it yours.',load3d:'Explore the 3D kit',conceptCollection:'TITEM · barber.mn · Tavan Khoshuu · Namu Coffee',showConcepts:'Explore all 5 concepts',filterConcept:'Personal concepts',openDemo:'Open live demo',conceptOriginal:'Original website concept',conceptRedesign:'Self-initiated redesign',conceptNote:'An independently created personal redesign concept. Actions in this demonstration are simulated.',conceptNoteOriginal:'An original “if I designed their website” concept for Namu Coffee. Actions in this demonstration are simulated.'});
  function syncFeatureMotion() {
    if (!featureFrame.getAttribute('src')) return;
    featureFrame.contentWindow?.postMessage({type:'portfolio-motion',active:featureVisible && !document.hidden && !dialog.open,auto:canAnimate()},new URL(featureFrame.dataset.src,location.href).origin);
  }
  function loadFeature() {
    if (!featureFrame.getAttribute('src')) featureFrame.src=featureFrame.dataset.src+(matchMedia('(max-width: 700px)').matches?'?lowq':'');
  }
  featureFrame.addEventListener('load',()=>{
    if (!featureFrame.getAttribute('src')) return;
    $('#tg-feature').classList.add('is-loaded');
    $('#tg-feature-load').hidden=true;
    syncFeatureMotion();
  });
  $('#tg-feature-load').addEventListener('click',loadFeature);
  if ('IntersectionObserver' in window) {
    const featureObserver=new IntersectionObserver(entries=>{featureVisible=entries[0].isIntersecting;if(featureVisible)loadFeature();syncFeatureMotion();},{rootMargin:'100px 0px',threshold:0});
    featureObserver.observe($('.tg-feature-stage'));
  } else {featureVisible=true;loadFeature();}

  function updatePhase() {
    $('#phase-title').textContent = copy[lang]['process' + (phase + 1)];
    $('#phase-body').textContent = copy[lang]['processBody' + (phase + 1)];
    $('#phase-count').textContent = '0' + (phase + 1) + ' / 04';
    $$('[data-phase-node]').forEach(el => el.classList.toggle('is-current', Number(el.dataset.phaseNode) === phase));
    $$('[data-process-step]').forEach(el => el.classList.toggle('is-current', Number(el.dataset.processStep) === phase));
    $$('[data-phase-select]').forEach(button => {
      const step = Number(button.dataset.phaseSelect);
      button.setAttribute('aria-pressed', String(step === phase));
      button.setAttribute('aria-label', copy[lang].choosePhase + ': ' + copy[lang]['process' + (step + 1)]);
    });
  }
  function syncProcessTimer() {
    clearInterval(phaseTimer);
    phaseTimer = null;
    const running = canAnimate() && processVisible && !document.hidden && !processManual;
    canvas.classList.toggle('is-cycling', running);
    if (running) phaseTimer = setInterval(() => { phase = (phase + 1) % 4; updatePhase(); }, 6400);
  }
  function updateMotion() {
    art.classList.toggle('is-paused', motionPaused);
    document.body.classList.toggle('motion-paused', motionPaused);
    document.documentElement.classList.toggle('manual-motion', reduce.matches && !motionPaused);
    motionButton.setAttribute('aria-pressed', String(motionPaused));
    motionButton.setAttribute('aria-label', copy[lang][motionPaused ? 'playMotion' : 'pauseMotion']);
    motionButton.querySelector('.motion-label').textContent = copy[lang][motionPaused ? 'playMotion' : 'pauseMotion'];
    motionButton.querySelector('.motion-icon').textContent = motionPaused ? '▷' : 'Ⅱ';
    syncProcessTimer();
    syncFeatureMotion();
    syncPosterMotion();
  }
  function showGalleryPage(index) {
    const p = selectedProject;
    if (!p) return;
    const pages = p.gallery || [{image:p.image}];
    galleryIndex = (index + pages.length) % pages.length;
    const page = pages[galleryIndex];
    const figma = page.figma || p.figma;
    const label = (lang === 'en' ? page.label_en : page.label) || subtitleOf(p);
    const image = $('#dialog-image');
    const video = $('#dialog-video');
    const isVideo = page.type === 'video';
    video.hidden = !isVideo;
    $('#dialog-image-link').hidden = isVideo;
    dialog.classList.toggle('is-video-preview',isVideo);
    if (isVideo) {
      if (video.getAttribute('src') !== page.video) {video.pause();video.src=page.video;video.poster=page.image;video.load();}
    } else video.pause();
    image.src = page.image;
    image.alt = titleOf(p) + ' — ' + label;
    $('#gallery-caption').textContent = (galleryIndex + 1) + ' / ' + pages.length + ' · ' + label;
    $$('[data-gallery-page]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.galleryPage) === galleryIndex)));
    $('#dialog-image-link').href = figma || page.image;
    $('#dialog-image-link').setAttribute('aria-label',(figma ? copy[lang].openFigma : copy[lang].viewFullSize) + ': ' + label);
    $('#dialog-figma').href = p.demo || figma || p.document || page.image;
    $('#dialog-figma-top').href=p.demo || figma || p.document || page.image;
    $('#dialog-top-label').textContent=copy[lang][figma?'openFigmaShort':p.document?'openGuideShort':'openImageShort'];
    $('#dialog-link-label').textContent = figma ? copy[lang].openFigma : p.document ? copy[lang].openGuidelines : copy[lang].viewFullSize;
    const selected=$('[data-gallery-page="'+galleryIndex+'"]');
    if(selected){const strip=$('#gallery-thumbs');strip.scrollTo({left:strip.scrollLeft+selected.getBoundingClientRect().left-strip.getBoundingClientRect().left-strip.clientWidth/2+selected.offsetWidth/2,behavior:canAnimate()?'smooth':'auto'});}
  }
  function populateDialog(p) {
    $('#dialog-visual').style.setProperty('--project-bg', p.color);
    dialog.classList.toggle('is-print-project', !!p.gallery);
    dialog.classList.toggle('is-demo-preview',!!p.demo);
    dialog.classList.toggle('is-poster-project',p.presentation==='poster');
    const frame=$('#dialog-demo');
    frame.hidden=!p.demo;
    $('#dialog-concept-note').hidden=!p.concept;
    $('#dialog-concept-note').textContent=copy[lang][p.concept==='original'?'conceptNoteOriginal':'conceptNote'];
    $('#gallery-controls').hidden = !p.gallery;
    $('#gallery-thumbs').replaceChildren();
    if (p.gallery) p.gallery.forEach((page, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'gallery-thumb';
      button.dataset.galleryPage = index;
      button.dataset.media = page.type || 'image';
      button.setAttribute('aria-label', (lang === 'en' ? page.label_en : page.label));
      const image = document.createElement('img');
      image.src = page.image;
      image.width = 42; image.height = 60; image.alt = ''; image.loading = 'lazy';
      button.append(image);
      button.addEventListener('click', () => showGalleryPage(index));
      $('#gallery-thumbs').append(button);
    });
    $('#dialog-title').textContent = titleOf(p);
    $('#dialog-subtitle').textContent = subtitleOf(p);
    $('#dialog-description').textContent = lang === 'en' ? p.description_en : p.description;
    $('#dialog-category').textContent = categoryOf(p);
    $('#dialog-year').textContent = p.year;
    if (p.demo) {
      $('#dialog-video').pause();$('#dialog-video').hidden=true;
      $('#dialog-image-link').hidden=true;
      dialog.classList.remove('is-video-preview');
      frame.title=titleOf(p)+' — '+copy[lang].openDemo;
      if(frame.getAttribute('src')!==p.demo)frame.src=p.demo;
      $('#dialog-figma').href=p.demo;$('#dialog-figma-top').href=p.demo;
      $('#dialog-link-label').textContent=copy[lang].openDemo;$('#dialog-top-label').textContent=copy[lang].openDemo;
    } else {frame.removeAttribute('src');showGalleryPage(galleryIndex);}
  }
  function applyLanguage() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => {
      const value = copy[lang][el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    $('#language-toggle').textContent = lang === 'mn' ? 'EN' : 'MN';
    $('#language-toggle').setAttribute('aria-label', lang === 'mn' ? 'Switch to English' : 'Монгол хэл рүү шилжих');
    document.title = lang === 'mn' ? 'Цогбаяр Анхбаяр — UI/UX & Visual Designer' : 'Ankhbayar Tsogbayar — UI/UX & Visual Designer';
    menuButton.setAttribute('aria-label', copy[lang][header.classList.contains('is-open') ? 'menuClose' : 'menuOpen']);
    $('.filters').setAttribute('aria-label', copy[lang].filterLabel);
    $('#dialog-close').setAttribute('aria-label', copy[lang].close);
    $('#gallery-prev').setAttribute('aria-label', copy[lang].previousPage);
    $('#gallery-next').setAttribute('aria-label', copy[lang].nextPage);
    $('#gallery-thumbs').setAttribute('aria-label', copy[lang].galleryLabel);
    $('.wordmark').setAttribute('aria-label', lang === 'en' ? 'Ankhbayar — Home' : 'Анхбаяр — Эхлэл');
    $('.contact-arrow').setAttribute('aria-label', lang === 'en' ? 'Email Ankhbayar' : 'Анхбаярт имэйл бичих');
    canvas.setAttribute('aria-label', lang === 'en' ? 'Animated design process diagram' : 'Дизайны процессын хөдөлгөөнт зураглал');
    const counts = [projects.filter(p=>p.types.length===1&&p.types[0]==='web').length,projects.filter(p=>p.types.length===1&&p.types[0]==='mobile').length,projects.filter(p=>p.types.includes('web')&&p.types.includes('mobile')).length,projects.filter(p=>p.types.includes('graphic')).length];
    $('.scope-ring').setAttribute('aria-label', projects.length + ' ' + copy[lang].projectCount + ': ' + counts.map((n,i) => n + ' ' + copy[lang][['scopeWeb','scopeMobile','scopeMulti','scopePrint'][i]]).join(', '));
    $$('[data-open-project]').forEach(button => {const p=projects.find(p=>p.id===button.dataset.openProject);if(p)button.setAttribute('aria-label',copy[lang].viewProject+': '+titleOf(p));});
    projects.forEach(p => {
      const card = document.getElementById('project-' + p.id);
      card.querySelector('.project-title button').textContent = titleOf(p);
      card.querySelector('.project-subtitle').textContent = subtitleOf(p);
      card.querySelector('.project-image').alt = titleOf(p) + ' — ' + subtitleOf(p);
      card.querySelector('.project-badge').textContent = categoryOf(p);
      const conceptLabel=card.querySelector('[data-concept-label]');
      if(conceptLabel)conceptLabel.textContent=copy[lang][p.concept==='original'?'conceptOriginal':'conceptRedesign'];
      card.querySelectorAll('[data-open-project]').forEach(b => b.setAttribute('aria-label', copy[lang].viewProject + ': ' + titleOf(p)));
    });
    $$('[data-poster-page]').forEach(button=>{const page=posterCollection.gallery[Number(button.dataset.posterPage)];button.setAttribute('aria-label',copy[lang].viewPoster+': '+(lang==='en'?page.label_en:page.label));});
    $$('[data-poster-caption]').forEach(el=>{const page=posterCollection.gallery[Number(el.dataset.posterCaption)];el.textContent=(lang==='en'?page.label_en:page.label).split(' · ').slice(1).join(' · ');});
    $$('[data-editorial-heading]').forEach(el=>{const p=projects.find(x=>x.id===el.dataset.editorialHeading);el.innerHTML=lang==='en'?p.editorial.heading_en:p.editorial.heading;});
    if (selectedProject) populateDialog(selectedProject);
    updatePhase(); updateMotion();
  }
  function setMenu(open, focusFirst = false) {
    header.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', copy[lang][open ? 'menuClose' : 'menuOpen']);
    if (open && focusFirst) $('#main-nav a').focus();
  }
  menuButton.addEventListener('click', () => setMenu(!header.classList.contains('is-open')));
  menuButton.addEventListener('keydown', e => { if (e.key === 'ArrowDown') {e.preventDefault();setMenu(true,true);} });
  $$('#main-nav a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', e => {if (header.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);});
  document.addEventListener('keydown', e => {if (e.key === 'Escape' && header.classList.contains('is-open')) {setMenu(false);menuButton.focus();}});
  matchMedia('(min-width: 851px)').addEventListener('change', () => setMenu(false));
  $('#language-toggle').addEventListener('click', () => {
    lang = lang === 'mn' ? 'en' : 'mn'; applyLanguage();
    try { localStorage.setItem('portfolio-language',lang); } catch (_) {}
  });

  function filterProjects(filter) {
    $$('.filter').forEach(b => {const active = b.dataset.filter === filter;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});
    let count = 0;
    projects.forEach(p => {
      const card = document.getElementById('project-' + p.id);
      const visible = filter === 'all' || (filter==='concept' ? !!p.concept : p.types.includes(filter));
      card.hidden = !visible;
      if (visible) {
        count++;
        card.classList.add('is-revealed');
        if (canAnimate() && typeof card.animate === 'function') card.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:500,delay:Math.min((count-1)*30,150),easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
      }
    });
    $('#project-count').textContent = String(count);
  }
  $$('.filter').forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));
  $('.scope-feature-link').addEventListener('click', () => filterProjects('all'));
  $('#show-concepts').addEventListener('click',()=>{filterProjects('concept');$('.filter-row').scrollIntoView({behavior:canAnimate()?'smooth':'auto',block:'start'});$('.filter[data-filter="concept"]').focus({preventScroll:true});});
  $$('[data-open-project]').forEach(button => button.addEventListener('click', () => {
    selectedProject = projects.find(p => p.id === button.dataset.openProject);
    if (!selectedProject) return;
    if (typeof dialog.showModal !== 'function') {window.open(selectedProject.demo || selectedProject.figma || selectedProject.document || selectedProject.image,'_blank','noopener');return;}
    returnFocus = button; galleryIndex = Number(button.dataset.galleryStart || 0); populateDialog(selectedProject);
    dialog.showModal(); dialog.scrollTop = 0; document.body.classList.add('has-dialog');
    syncFeatureMotion();
    syncPosterMotion();
  }));
  $('#dialog-close').addEventListener('click', () => dialog.close());
  $('#dialog-done').addEventListener('click', () => dialog.close());
  $('#gallery-prev').addEventListener('click', () => showGalleryPage(galleryIndex - 1));
  $('#gallery-next').addEventListener('click', () => showGalleryPage(galleryIndex + 1));
  dialog.addEventListener('keydown', e => {
    if (!selectedProject?.gallery || e.target.tagName === 'VIDEO') return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {e.preventDefault();showGalleryPage(galleryIndex + (e.key === 'ArrowRight' ? 1 : -1));}
  });
  dialog.addEventListener('click', e => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    const video=$('#dialog-video');video.pause();video.removeAttribute('src');video.load();
    $('#dialog-demo').removeAttribute('src');
    document.body.classList.remove('has-dialog'); selectedProject = null; $('#gallery-thumbs').replaceChildren();
    if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
    syncFeatureMotion();
    syncPosterMotion();
  });
  $$('[data-phase-select]').forEach(button => button.addEventListener('click', () => {
    phase = Number(button.dataset.phaseSelect); processManual = true; updatePhase(); syncProcessTimer();
  }));
  motionButton.addEventListener('click', () => {
    motionPaused = !motionPaused; processManual = false; updateMotion();
    try {localStorage.setItem('portfolio-motion',motionPaused ? 'paused' : 'playing');} catch (_) {}
  });
  reduce.addEventListener('change', () => {motionPaused = reduce.matches;updateMotion();});
  document.addEventListener('visibilitychange', () => {document.body.classList.toggle('is-hidden',document.hidden);syncProcessTimer();syncFeatureMotion();syncPosterMotion();});

  // A native scroll, one frame update, and transforms only. No scroll interception.
  let scrollQueued = false;
  function updateScrollProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    $('#reading-progress').style.transform = 'scaleX(' + (max > 0 ? Math.max(0,Math.min(1,window.scrollY/max)) : 0) + ')';
    scrollQueued = false;
  }
  window.addEventListener('scroll', () => {if (!scrollQueued) {scrollQueued=true;requestAnimationFrame(updateScrollProgress);}}, {passive:true});
  window.addEventListener('resize', updateScrollProgress, {passive:true});

  function countUp(el) {
    const target = Number(el.dataset.count);
    if (!canAnimate()) {el.textContent=target;return;}
    const started = performance.now();
    function tick(now) {
      const progress = Math.min(1,(now-started)/1100);
      el.textContent = Math.round(target * (1-Math.pow(1-progress,3)));
      if (progress < 1 && canAnimate()) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }
  applyLanguage();
  updateScrollProgress();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {art.classList.toggle('is-offscreen',!entries[0].isIntersecting);},{rootMargin:'60px'}).observe(art);
    new IntersectionObserver(entries => {processVisible=entries[0].isIntersecting;syncProcessTimer();},{threshold:.2}).observe(canvas);
    const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed'); reveals.unobserve(entry.target);
    }),{threshold:.08,rootMargin:'0px 0px 35px 0px'});
    document.documentElement.classList.add('reveal-ready');
    $$('.reveal').forEach(el => reveals.observe(el));
    const counters = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      countUp(entry.target);counters.unobserve(entry.target);
    }),{threshold:.7});
    $$('[data-count]').forEach(el => counters.observe(el));
  }
  if (canAnimate()) {document.body.classList.add('intro-running');setTimeout(() => document.body.classList.remove('intro-running'),1700);}
})();
