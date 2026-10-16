(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BoldBiteMotion = factory();
})(globalThis, function () {
  'use strict';
  const LAYERS = [{"id": "bun-top", "label": "Sesame brioche crown", "h": 670, "y": 0, "k": 7, "seat": 0.5, "rest": 0.95, "s": 1338}, {"id": "lettuce", "label": "Frilly leaf lettuce", "h": 461, "y": 406, "k": 6, "seat": 0.5, "rest": 0.8, "s": 1118}, {"id": "tomato", "label": "Heirloom tomato", "h": 296, "y": 627, "k": 5, "seat": 0.5, "rest": 0.88, "s": 920}, {"id": "avocado", "label": "Fanned avocado", "h": 311, "y": 732, "k": 4, "seat": 0.5, "rest": 0.88, "s": 774}, {"id": "onion", "label": "Pickled red onion", "h": 295, "y": 858, "k": 3, "seat": 0.5, "rest": 0.88, "s": 631}, {"id": "cheese", "label": "Cashew cheddar", "h": 455, "y": 936, "k": 2, "seat": 0.4, "rest": 0.55, "s": 460}, {"id": "patty", "label": "Charred herb patty", "h": 611, "y": 850, "k": 1, "seat": 0.55, "rest": 0.93, "s": 230}, {"id": "bun-bottom", "label": "Toasted brioche base", "h": 547, "y": 1172, "k": 0, "seat": 0.45, "rest": 1.0, "s": 0}];
  const SEP = 1338;
  const HEIGHT = Math.max.apply(null, LAYERS.map(function (layer) { return layer.y + layer.h; }));
  const clamp = function (n, min, max) { return Math.max(min, Math.min(max, n)); };
  function stageHeight(separation) { return HEIGHT + SEP * separation; }
  function offset(index, progress, separation) {
    return (SEP / 2 - LAYERS[index].s) * separation * progress / LAYERS[index].h * 100;
  }
  function fitStage(width, height, separation) {
    const w = Math.max(1, Math.min(600, width - 32, (height - 32) * 1200 / stageHeight(separation)));
    return {width:w, height:w * stageHeight(separation) / 1200};
  }
  function createScene(options) {
    const gsap = options.gsap;
    const separation = options.card ? 0.58 : 0.9;
    const state = {p:0, target:0};
    const poses = LAYERS.map(function () { return {y:0, x:0, entrance:0, opacity:1}; });
    let animation = null, parallax = null, active = false, allowed = true, destroyed = false;
    function render() {
      if (!destroyed) options.render({state:state, poses:poses, separation:separation});
    }
    function announce(kind) { if (options.onState) options.onState(kind, state.target); }
    function stop() {
      if (animation) animation.kill();
      animation = null;
    }
    function snap(progress) {
      state.p = clamp(progress, 0, 1); state.target = state.p;
      poses.forEach(function (pose, i) {
        pose.y = offset(i, state.p, separation);
        pose.entrance = 0; pose.opacity = 1;
      });
      render();
    }
    function appendMove(timeline, target, at) {
      const assembling = target === 0;
      poses.forEach(function (pose, i) {
        const k = LAYERS[i].k;
        timeline.to(pose, {
          y:offset(i, target, separation),
          duration:assembling ? 0.95 : 1.15,
          ease:assembling ? 'back.out(1.05)' : 'expo.out'
        }, at + (assembling ? k * 0.045 : Math.abs(k - 3.5) * 0.03));
      });
      timeline.to(state, {p:target, duration:1.3, ease:'power2.out'}, at);
    }
    function makeTimeline(repeat) {
      return gsap.timeline({paused:true, repeat:repeat || 0, onUpdate:render});
    }
    function sync() {
      if (animation) animation.paused(!active || !allowed);
      if ((!active || !allowed) && parallax) { parallax.kill(); parallax = null; }
    }
    function move(target) {
      stop(); state.target = target;
      if (!allowed) { snap(target); announce('complete'); return; }
      announce('moving');
      animation = makeTimeline();
      appendMove(animation, target, 0);
      animation.eventCallback('onComplete', function () { snap(target); announce('complete'); });
      sync();
    }
    function replay() {
      stop();
      if (!allowed) { snap(0); announce('complete'); return; }
      snap(1); state.target = 0; announce('intro');
      poses.forEach(function (pose) { pose.opacity = 0; pose.entrance = 10; });
      render();
      animation = makeTimeline();
      poses.forEach(function (pose, i) {
        animation.to(pose, {opacity:1, entrance:0, duration:0.85, ease:'expo.out'}, (7 - i) * 0.055);
      });
      appendMove(animation, 0, 1.25);
      animation.eventCallback('onComplete', function () { snap(0); announce('complete'); });
      sync();
    }
    function startLoop() {
      stop(); snap(0);
      animation = makeTimeline(-1);
      appendMove(animation, 1, 0.8);
      appendMove(animation, 0, 3.6);
      animation.to({}, {duration:1.6}, 5.1);
      sync();
    }
    function scrub(progress) {
      stop(); snap(progress); announce('complete');
    }
    function setMotion(next) {
      active = !!next.active; allowed = !!next.animate;
      sync();
    }
    function point(amount) {
      if (!active || !allowed || options.card) return;
      if (parallax) parallax.kill();
      parallax = gsap.to(poses, {
        x:function (i) { return clamp(amount, -0.5, 0.5) * (LAYERS[i].k - 3.5) * 0.7 * (0.4 + state.p); },
        duration:0.6, ease:'power3.out', onUpdate:render
      });
    }
    function resetPoint() {
      if (parallax) parallax.kill();
      if (!active || !allowed) { poses.forEach(function (pose) { pose.x = 0; }); render(); return; }
      parallax = gsap.to(poses, {x:0, duration:0.6, ease:'power3.out', onUpdate:render});
    }
    snap(0);
    return {
      assemble:function () { move(0); }, explode:function () { move(1); },
      replay:replay, startLoop:startLoop, scrub:scrub, setMotion:setMotion,
      point:point, resetPoint:resetPoint,
      get timeline() { return animation; },
      get separation() { return separation; },
      snapshot:function () {
        return {progress:state.p, target:state.target, active:active, animate:allowed,
          poses:poses.map(function (pose) { return {y:pose.y, x:pose.x, entrance:pose.entrance, opacity:pose.opacity}; })};
      },
      destroy:function () { destroyed = true; stop(); if (parallax) parallax.kill(); }
    };
  }
  return {LAYERS:LAYERS, HEIGHT:HEIGHT, SEP:SEP, offset:offset, stageHeight:stageHeight, fitStage:fitStage, createScene:createScene};
});
