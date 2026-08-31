// Behaviours, all progressive enhancement, all from the halftone spec
// (https://design-template-jet.vercel.app/llms.txt): copy buttons, the scroll
// motion engine (data-rv reveals, stagger, scroll-linked --p), the footer's
// ordered-dither woods band, and the hero's turntable phone prop.
// JS writes variables and pixels; CSS owns the look. Nothing here is random,
// so every render is identical.

var BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

// ---- copy buttons ----
function addCopy(el, getText) {
  var btn = document.createElement("button");
  btn.className = "copy-btn";
  btn.type = "button";
  btn.textContent = "copy";
  btn.addEventListener("click", function () {
    navigator.clipboard.writeText(getText()).then(function () {
      btn.textContent = "copied";
      setTimeout(function () { btn.textContent = "copy"; }, 1500);
    });
  });
  el.appendChild(btn);
}

document.querySelectorAll("article blockquote").forEach(function (bq) {
  addCopy(bq, function () { return bq.innerText.replace(/\s*copy(ied)?\s*$/, "").trim(); });
});

var clone = document.querySelector(".clone");
if (clone) {
  addCopy(clone, function () { return clone.dataset.cmd || clone.querySelector("code").innerText.trim(); });
}

// ---- motion engine, a small vanilla cut of the spec's motion.tsx ----
(function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".stagger").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty("--i", i);
    });
  });

  var rv = Array.prototype.slice.call(document.querySelectorAll("[data-rv]"));
  if (reduce || !("IntersectionObserver" in window)) {
    rv.forEach(function (el) { el.classList.add("in"); });
  } else if (rv.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
    // The safety net is scoped to the fold on purpose: only elements already
    // at or above 90% of the viewport get force-revealed. Below-fold reveals
    // genuinely wait for the scroll.
    setTimeout(function () {
      rv.forEach(function (el) {
        if (!el.classList.contains("in") && el.getBoundingClientRect().top < innerHeight * 0.9) {
          el.classList.add("in");
        }
      });
    }, 3500);
  }

  // data-progress: writes --p 0..1 as the element crosses the viewport,
  // and runs backwards on the way up. Scroll-linked, never transitioned.
  var prog = Array.prototype.slice.call(document.querySelectorAll("[data-progress]"));
  if (!prog.length) return;
  if (reduce) {
    prog.forEach(function (el) { el.style.setProperty("--p", 1); });
    return;
  }
  var raf = 0;
  function paint() {
    raf = 0;
    prog.forEach(function (el) {
      var start = parseFloat(el.getAttribute("data-progress")) || 0.88;
      var span = parseFloat(el.getAttribute("data-progress-span") || "0.78");
      var r = el.getBoundingClientRect();
      var p = (innerHeight * start - r.top) / (r.height * span);
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)));
    });
  }
  function kick() { if (!raf) raf = requestAnimationFrame(paint); }
  addEventListener("scroll", kick, { passive: true });
  addEventListener("resize", kick, { passive: true });
  kick();
})();

// ---- the turntable prop: a phone spinning through the dither ----
// Software raster, no WebGL: six flat-shaded faces, painter-sorted, drawn
// small and quantised through the shared Bayer. Single-axis spin, per the
// prop recipe; the screen's chat bubbles ride the front face.
(function () {
  var host = document.querySelector(".prop");
  if (!host) return;
  var cv = host.querySelector("canvas");
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var CELL = 3;
  var NAVY = [20, 38, 88];
  var ACCENT = [99, 85, 255];
  var W = 1.25, H = 2.6, D = 0.16, CAM = 8, TILT = 0.16, PHASE = -0.55;
  var TURN_MS = 9500;

  var PTS = [];
  [[-1, 1], [1, 1], [1, -1], [-1, -1]].forEach(function (c) { PTS.push([c[0] * W, c[1] * H, D]); });
  [[-1, 1], [1, 1], [1, -1], [-1, -1]].forEach(function (c) { PTS.push([c[0] * W, c[1] * H, -D]); });
  // tone is ink density: thin edge faces run darker so they print, not scatter
  var FACES = [
    { i: [0, 1, 2, 3], tone: 0.6 },
    { i: [5, 4, 7, 6], tone: 0.52 },
    { i: [4, 5, 1, 0], tone: 0.74 },
    { i: [3, 2, 6, 7], tone: 0.74 },
    { i: [4, 0, 3, 7], tone: 0.68 },
    { i: [1, 5, 6, 2], tone: 0.68 },
  ];
  // screen and bubbles in model space on the front plane; bubble "you" is the accent
  var SCREEN = quad(-1.11, 2.38, 1.11, -2.3, D + 0.01);
  var BUBBLES = [
    { q: quad(-0.35, 2.1, 0.95, 1.2, D + 0.02), tone: 0.5, accent: true },
    { q: quad(-0.95, 0.85, 0.55, -0.35, D + 0.02), tone: 0.34 },
    { q: quad(-0.95, -0.75, 0.05, -1.5, D + 0.02), tone: 0.26 },
  ];
  var CAMDOT = quad(0.5, 2.3, 0.95, 1.85, -D - 0.01);

  function quad(x0, y0, x1, y1, z) {
    return [[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]];
  }

  function rot(p, a) {
    var x = p[0] * Math.cos(a) + p[2] * Math.sin(a);
    var z = -p[0] * Math.sin(a) + p[2] * Math.cos(a);
    var y = p[1] * Math.cos(TILT) - z * Math.sin(TILT);
    z = p[1] * Math.sin(TILT) + z * Math.cos(TILT);
    return [x, y, z];
  }

  function render(ang) {
    var cols = Math.ceil(host.clientWidth / CELL);
    var rows = Math.ceil(host.clientHeight / CELL);
    if (!cols || !rows) return;
    var unit = rows / (H * 2.7);
    var cx = cols / 2, cy = rows * 0.47;

    function proj(p) {
      var r = rot(p, ang);
      var k = CAM / (CAM - r[2]);
      return { x: cx + r[0] * k * unit, y: cy - r[1] * k * unit, z: r[2] };
    }
    function fill(ctx, pts2, grey) {
      ctx.beginPath();
      pts2.forEach(function (p, i) { i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); });
      ctx.closePath();
      ctx.fillStyle = "rgb(" + grey + "," + grey + "," + grey + ")";
      ctx.fill();
    }
    var g = (t) => Math.round(255 * (1 - t));

    var off = document.createElement("canvas");
    off.width = cols; off.height = rows;
    var ox = off.getContext("2d");
    ox.fillStyle = "#fff";
    ox.fillRect(0, 0, cols, rows);
    var mk = document.createElement("canvas");
    mk.width = cols; mk.height = rows;
    var mx = mk.getContext("2d");

    // ground dust under the slab
    var base = proj([0, -H, 0]);
    ox.save();
    ox.translate(base.x, base.y + rows * 0.02);
    ox.scale(1, 0.24);
    var dust = ox.createRadialGradient(0, 0, 0, 0, 0, unit * 2.4);
    dust.addColorStop(0, "rgba(0,0,0,0.34)");
    dust.addColorStop(1, "rgba(0,0,0,0)");
    ox.fillStyle = dust;
    ox.fillRect(-unit * 3, -unit * 3, unit * 6, unit * 6);
    ox.restore();

    FACES.map(function (f) {
      var pts2 = f.i.map(function (i) { return proj(PTS[i]); });
      return { pts2: pts2, tone: f.tone, z: pts2.reduce(function (s, p) { return s + p.z; }, 0) };
    }).sort(function (a, b) { return a.z - b.z; }).forEach(function (f) {
      fill(ox, f.pts2, g(f.tone));
    });

    var frontVis = rot([0, 0, 1], ang)[2] > 0.06;
    var backVis = rot([0, 0, -1], ang)[2] > 0.06;
    if (frontVis) {
      fill(ox, SCREEN.map(proj), g(0.06));
      BUBBLES.forEach(function (b) {
        var pts2 = b.q.map(proj);
        fill(ox, pts2, g(b.tone));
        if (b.accent) fill(mx, pts2, 255);
      });
    }
    if (backVis) fill(ox, CAMDOT.map(proj), g(0.9));

    var src = ox.getImageData(0, 0, cols, rows).data;
    var msk = mx.getImageData(0, 0, cols, rows).data;
    cv.width = cols; cv.height = rows;
    var ctx = cv.getContext("2d");
    var out = ctx.createImageData(cols, rows);
    var d = out.data;
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var i = (y * cols + x) * 4;
        var ink = 1 - src[i] / 255;
        if (ink > (BAYER[y % 8][x % 8] + 0.5) / 64) {
          var c = msk[i] > 128 ? ACCENT : NAVY;
          d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255;
        }
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  render(PHASE);
  if (reduce) {
    var rt = 0;
    addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () { render(PHASE); }, 150);
    }, { passive: true });
    return;
  }

  var running = false, raf = 0, last = 0;
  function tick(t) {
    raf = 0;
    if (!running) return;
    if (t - last >= 33) {
      render(PHASE + (t / TURN_MS) * Math.PI * 2);
      last = t;
    }
    raf = requestAnimationFrame(tick);
  }
  new IntersectionObserver(function (entries) {
    running = entries[0].isIntersecting;
    if (running && !raf) raf = requestAnimationFrame(tick);
  }).observe(host);
})();

// ---- the woods band: an ordered-dither halftone of a real photograph ----
// One pixel per cell on a small canvas, scaled up with image-rendering:
// pixelated.
(function () {
  var cv = document.querySelector(".woods canvas");
  if (!cv) return;
  var img = new Image();
  img.src = (document.body.getAttribute("data-root") || "") + "img/woods.jpg";
  var CELL = 3;

  function draw() {
    var host = cv.parentElement;
    var cols = Math.ceil(host.clientWidth / CELL);
    var rows = Math.ceil(host.clientHeight / CELL);
    if (!cols || !rows) return;
    var off = document.createElement("canvas");
    off.width = cols; off.height = rows;
    var ox = off.getContext("2d");
    // cover-fit, framed so the treetops sit mid-band with sky above
    var s = Math.max(cols / img.width, rows / img.height) * 1.1;
    var w = img.width * s, h = img.height * s;
    ox.drawImage(img, (cols - w) / 2, (rows - h) * 0.12, w, h);
    var src = ox.getImageData(0, 0, cols, rows).data;

    cv.width = cols; cv.height = rows;
    var ctx = cv.getContext("2d");
    var out = ctx.createImageData(cols, rows);
    var d = out.data;
    var fadeRows = rows * 0.4; // trees climb out of the black instead of being cut flat
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var i = (y * cols + x) * 4;
        var lum = (src[i] * 0.2126 + src[i + 1] * 0.7152 + src[i + 2] * 0.0722) / 255;
        var ink = (1 - lum) * 0.78; // dark trees print as ink; bright sky stays black
        if (y < fadeRows) ink *= y / fadeRows;
        if (ink > (BAYER[y % 8][x % 8] + 0.5) / 64) {
          d[i] = 233; d[i + 1] = 231; d[i + 2] = 225; d[i + 3] = 255;
        }
      }
    }
    ctx.putImageData(out, 0, 0);
  }

  img.onload = function () {
    draw();
    var t = 0;
    addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(draw, 150);
    }, { passive: true });
  };
})();
