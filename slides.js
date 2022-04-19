(function() {

  window.addEventListener("DOMContentLoaded", () => {
    const h1 = document.getElementsByTagName("h1")[0];

    let state_hide = false;
    const button = document.createElement("button");
    button.textContent = "Hide desc";
    button.style.marginLeft = "1rem";
    button.addEventListener("click", () => {
      state_hide = !state_hide;
      document.body.classList.toggle('hide-desc');
      button.textContent = state_hide ? "Show desc" : "Hide desc";
    }, false);
    h1.insertAdjacentElement("beforeend", button);
  }, false);

})();

