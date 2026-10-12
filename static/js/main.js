/* Скрипт сайта AIСтарт */
(function () {
  "use strict";

  /* 1. Текущий год в подвале */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* 2. Фильтр карточек по категориям */
  var filterButtons = Array.prototype.slice.call(
    document.querySelectorAll(".filter__button")
  );
  var cards = Array.prototype.slice.call(document.querySelectorAll(".card"));
  var emptyMessage = document.getElementById("empty-message");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var category = button.getAttribute("data-filter");

      // Снимаем активное состояние со всех кнопок
      filterButtons.forEach(function (btn) {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");

      // Показываем только карточки выбранной категории
      var visibleCount = 0;
      cards.forEach(function (card) {
        var isVisible =
          category === "all" ||
          card.getAttribute("data-category") === category;
        card.hidden = !isVisible;
        if (isVisible) {
          visibleCount += 1;
        }
      });

      if (emptyMessage) {
        emptyMessage.hidden = visibleCount !== 0;
      }
    });
  });

  /* 3. Уведомление при нажатии «Купить» (демо-сайт) */
  var toast = document.getElementById("toast");
  var hideTimer = null;

  function showToast(message) {
    if (!toast) {
      return;
    }
    toast.textContent = message;
    toast.classList.add("toast--visible");
    if (hideTimer) {
      clearTimeout(hideTimer);
    }
    hideTimer = setTimeout(function () {
      toast.classList.remove("toast--visible");
    }, 3200);
  }

  Array.prototype.forEach.call(
    document.querySelectorAll(".js-buy"),
    function (button) {
      button.addEventListener("click", function () {
        showToast("Демонстрационный сайт: оплата пока не подключена.");
      });
    }
  );
})();
