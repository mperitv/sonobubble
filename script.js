(function () {
  var c = document.getElementById('bubbles');
  if (!c || !c.getContext) return;
  var ctx = c.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var w, h, bubbles = [];
  var docH = 0, vh = 0;
  function size() { w = document.documentElement.clientWidth; vh = innerHeight; docH = Math.max(document.documentElement.scrollHeight, vh); h = docH; c.width = w * dpr; c.height = vh * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  function make(fresh) {
    var r = 10 + Math.random() * 46;
    return { x: Math.random() * w, y: fresh ? h + r : Math.random() * h, r: r, vy: .12 + Math.random() * .3, ph: Math.random() * 6.28, rot: (Math.random() - .5) * .6, a: Math.random() * 6.28, b: Math.random() * 6.28, sw: 8 + Math.random() * 18 };
  }
  function init() { size(); var n = Math.round(Math.min(70, Math.max(10, (w * docH) / 55000))); bubbles = []; for (var i = 0; i < n; i++) bubbles.push(make(false)); }
  function draw(b) {
    var x = b.x + Math.sin(b.ph) * b.sw, y = b.y, r = b.r, i, t, rr;
    ctx.save(); ctx.translate(x, y); ctx.rotate(b.rot);
    ctx.beginPath();
    for (i = 0; i <= 36; i++) {
      t = i / 36 * 6.2832;
      rr = r * (1 + .022 * Math.sin(2 * t + b.a) + .014 * Math.sin(4 * t + b.b));
      if (i) ctx.lineTo(Math.cos(t) * rr, Math.sin(t) * rr); else ctx.moveTo(Math.cos(t) * rr, Math.sin(t) * rr);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(150,190,240,.1)'; ctx.fill();
    ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(38,37,30,.3)'; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, r * .68, 3.5, 4.35); ctx.lineWidth = Math.max(2.5, r * .09); ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.stroke();
    ctx.beginPath(); ctx.arc(-r * .5, r * .1, Math.max(1.6, r * .05), 0, 6.283); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fill();
    ctx.restore();
  }
  function frame() {
    ctx.clearRect(0, 0, w, vh); var sy = window.pageYOffset || 0;
    for (var i = 0; i < bubbles.length; i++) {
      var b = bubbles[i]; if (b.y > sy - b.r - 40 && b.y < sy + vh + b.r + 40) { ctx.save(); ctx.translate(0, -sy); draw(b); ctx.restore(); }
      if (!reduce) { b.y -= b.vy; b.ph += .008; if (b.y < -b.r) bubbles[i] = make(true); }
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  addEventListener('scroll', function () { if (reduce) frame(); }, { passive: true });
  addEventListener('load', function () { init(); if (reduce) frame(); });
  addEventListener('resize', function () { init(); if (reduce) frame(); });
  init(); frame();
})();
