'use strict';
(function () {
  const card = new URLSearchParams(location.search).has('card');
  const embedded = parent !== window;
  document.body.classList.toggle('card', card);
  document.body.classList.toggle('embedded', embedded);
  const stage = document.getElementById('stage');
  const viewport = document.getElementById('stage-viewport');
  const amount = document.getElementById('amount');
  const status = document.getElementById('status');
  const output = document.getElementById('amount-output');
  const assemble = document.getElementById('assemble');
  const explode = document.getElementById('explode');
  const replay = document.getElementById('replay');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let hostActive = !embedded, hostAuto = true, ready = false, scene = null;
  const parts = new Map(Array.from(stage.querySelectorAll('.layer')).map(function (el) {
    return [el.dataset.id, {el:el, pixels:el.querySelector('.px'), crisp:el.querySelector('.seat-crisp'), soft:el.querySelector('.seat-soft')}];
  }));
  function parentOrigin() {
    try { return new URL(document.referrer).origin; } catch (_) { return location.origin; }
  }
  function notify(type) {
    if (embedded) parent.postMessage({type:type}, parentOrigin());
  }
  function layout() {
    if (!scene) return;
    const fit = BoldBiteMotion.fitStage(viewport.clientWidth, viewport.clientHeight, scene.separation);
    stage.style.setProperty('--sw', fit.width + 'px');
    stage.style.setProperty('--sh', BoldBiteMotion.stageHeight(scene.separation));
    const pad = BoldBiteMotion.SEP * scene.separation / 2;
    BoldBiteMotion.LAYERS.forEach(function (layer) {
      parts.get(layer.id).el.style.setProperty('--y', layer.y + pad);
    });
  }
  function sync() {
    if (!ready) return;
    scene.setMotion({active:hostActive && !document.hidden, animate:hostAuto && !reduce.matches});
  }
  function updateStatus(kind, target) {
    const complete = kind === 'complete';
    status.textContent = complete ? (target > 0.01 ? 'Exploded view' : 'Assembled sandwich') :
      kind === 'intro' ? 'Eight layers. One bold bite.' : target === 0 ? 'Assembling…' : 'Exploding…';
    assemble.setAttribute('aria-pressed', String(target === 0));
    explode.setAttribute('aria-pressed', String(target === 1));
  }
  function draw(frame) {
    BoldBiteMotion.LAYERS.forEach(function (layer, i) {
      const pose = frame.poses[i], part = parts.get(layer.id);
      part.el.style.transform = 'translate3d(0,' + pose.y.toFixed(5) + '%,0)';
      part.pixels.style.transform = 'translate3d(' + pose.x.toFixed(5) + '%,' + pose.entrance.toFixed(5) + '%,0)';
      part.pixels.style.opacity = pose.opacity;
      part.crisp.style.opacity = Math.max(0, 1 - frame.state.p * 2.2);
      part.soft.style.opacity = Math.min(1, frame.state.p * 1.6) * 0.9;
    });
    const floor = document.getElementById('floor');
    floor.style.transform = 'translateY(55%) scaleX(' + (1 - frame.state.p * 0.18) + ')';
    floor.style.opacity = 1 - frame.state.p * 0.35;
    const value = Math.round(frame.state.p * 100);
    amount.value = String(value);
    amount.setAttribute('aria-valuetext', value + '% exploded');
    output.textContent = value + '%';
  }
  assemble.addEventListener('click', function () { if (ready) scene.assemble(); });
  explode.addEventListener('click', function () { if (ready) scene.explode(); });
  replay.addEventListener('click', function () { if (ready) scene.replay(); });
  amount.addEventListener('input', function () { if (ready) scene.scrub(Number(amount.value) / 100); });
  stage.addEventListener('pointermove', function (event) {
    if (!ready || !fine.matches) return;
    const rect = stage.getBoundingClientRect();
    scene.point((event.clientX - rect.left) / rect.width - 0.5);
  });
  stage.addEventListener('pointerleave', function () { if (ready) scene.resetPoint(); });
  addEventListener('message', function (event) {
    if (event.source !== parent || !embedded || event.origin !== parentOrigin() ||
        event.data?.type !== 'portfolio-motion' || typeof event.data.active !== 'boolean' ||
        typeof event.data.auto !== 'boolean') return;
    hostActive = event.data.active; hostAuto = event.data.auto; sync();
  });
  document.addEventListener('visibilitychange', sync);
  reduce.addEventListener('change', sync);
  addEventListener('pagehide', function () { if (scene) scene.destroy(); });
  addEventListener('resize', layout, {passive:true});
  if ('ResizeObserver' in window) new ResizeObserver(layout).observe(viewport);
  Promise.all(Array.from(stage.querySelectorAll('img')).map(function (img) {
    if (typeof img.decode === 'function') return img.decode();
    return img.complete ? Promise.resolve() : new Promise(function (resolve, reject) {
      img.addEventListener('load', resolve, {once:true}); img.addEventListener('error', reject, {once:true});
    });
  })).then(function () {
    if (!window.gsap || !window.BoldBiteMotion) throw new Error('Animation engine unavailable');
    scene = BoldBiteMotion.createScene({gsap:gsap, card:card, render:draw, onState:updateStatus});
    ready = true; layout(); sync();
    if (card) scene.startLoop(); else scene.replay();
    [assemble, explode, replay, amount].forEach(function (el) { el.disabled = false; });
    document.body.classList.add('is-ready');
    notify('boldbite-ready');
  }).catch(function () {
    status.textContent = 'The preview could not load. Please reload to try again.';
    document.body.classList.add('load-failed');
    notify('boldbite-error');
  });
})();
