// Copy buttons, the site's only JS. Every blockquote is a paste-able prompt;
// the clone pill carries its full command in data-cmd since the display
// truncates. Progressive enhancement; the site works without it.
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
