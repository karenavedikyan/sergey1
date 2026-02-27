const scrollButton = document.querySelector("[data-scroll-target]");
const form = document.getElementById("application-form");
const message = document.getElementById("form-message");

if (scrollButton) {
  scrollButton.addEventListener("click", () => {
    const target = document.querySelector(scrollButton.dataset.scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

if (form && message) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      message.textContent = "Пожалуйста, заполните все обязательные поля корректно.";
      message.style.color = "#ffb4a2";
      form.reportValidity();
      return;
    }

    message.textContent =
      "Спасибо! Заявка принята. Напишите в WhatsApp или Telegram для ускорения связи.";
    message.style.color = "#6ad7a3";
    form.reset();
  });
}
