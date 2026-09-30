const filterButtons = document.querySelectorAll(".filter-button");
const materialCards = document.querySelectorAll(".material-card");
const filterStatus = document.querySelector("#filter-status");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    let visibleCount = 0;

    materialCards.forEach((card) => {
      const shouldShow =
        selectedCategory === "todos" ||
        card.dataset.category === selectedCategory;

      card.hidden = !shouldShow;

      if (shouldShow) visibleCount += 1;
    });

    const label = button.textContent.trim();
    filterStatus.textContent =
      selectedCategory === "todos"
        ? `${visibleCount} materiais exibidos.`
        : `Filtro ${label} selecionado. ${visibleCount} material(is) exibido(s).`;
  });
});
