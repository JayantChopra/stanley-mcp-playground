// Two small behaviours, both progressive enhancement.
// 1. Copy buttons: every blockquote is a paste-able prompt; the clone command
//    gets one too.
// 2. The landing page's one signature motion: reveal-on-enter with stagger.
//    JS only adds a class and writes --i; CSS owns the look. Reduced motion
//    and noscript both fall through to the finished state.

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
  addCopy(clone, function () { return clone.querySelector("code").innerText.trim(); });
}

var revealed = document.querySelectorAll("[data-rv]");
if (revealed.length) {
  document.querySelectorAll(".stagger").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty("--i", i);
    });
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
  revealed.forEach(function (el) { io.observe(el); });
}
