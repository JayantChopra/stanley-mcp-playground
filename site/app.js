// Three behaviours, all progressive enhancement, all from the halftone spec
// (https://design-template-jet.vercel.app/llms.txt): copy buttons, the scroll
// motion engine (data-rv reveals, stagger, scroll-linked --p), and the
// footer's ordered-dither woods band. JS writes variables; CSS owns the look.

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

// ---- the woods band: an ordered-dither halftone of a real photograph ----
// One pixel per cell on a small canvas, scaled up with image-rendering:
// pixelated. Deterministic: no randomness, so every render is identical.
(function () {
  var cv = document.querySelector(".woods canvas");
  if (!cv) return;
  var B = [
    [0, 32, 8, 40, 2, 34, 10, 42],
    [48, 16, 56, 24, 50, 18, 58, 26],
    [12, 44, 4, 36, 14, 46, 6, 38],
    [60, 28, 52, 20, 62, 30, 54, 22],
    [3, 35, 11, 43, 1, 33, 9, 41],
    [51, 19, 59, 27, 49, 17, 57, 25],
    [15, 47, 7, 39, 13, 45, 5, 37],
    [63, 31, 55, 23, 61, 29, 53, 21],
  ];
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
        var on = ink > (B[y % 8][x % 8] + 0.5) / 64;
        if (on) { d[i] = 233; d[i + 1] = 231; d[i + 2] = 225; d[i + 3] = 255; }
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
