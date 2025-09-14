    function showPage(pageId) {
      document.getElementById('main-page').style.display = 'none';
      document.getElementById(pageId).style.display = 'block';
    }
    function go(href) {
  window.location.href = href;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("talk")?.addEventListener("click", () => go("page1.html"));
  document.getElementById("play")?.addEventListener("click", () => go("page2.html"));
  document.getElementById("music")?.addEventListener("click", () => go("page3.html"));
  document.getElementById("pomodoro")?.addEventListener("click", () => go("page4.html"));
  document.getElementById("calculator")?.addEventListener("click", () => go("page5.html"));
});
