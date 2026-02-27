(function () {
  var revealNodes = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealNodes.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealNodes.forEach(function (node) {
      revealObserver.observe(node);
    });
  } else {
    revealNodes.forEach(function (node) {
      node.classList.add("is-visible");
    });
  }

  var forms = document.querySelectorAll(".apply-form");
  forms.forEach(function (form) {
    var statusNode = form.querySelector("[data-form-status]");
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var valid = true;
      var requiredFields = form.querySelectorAll("[required]");
      requiredFields.forEach(function (field) {
        var fieldIsValid = true;
        if (field.type === "checkbox") {
          fieldIsValid = field.checked;
        } else {
          fieldIsValid = field.value.trim().length > 0;
        }

        if (!fieldIsValid) {
          valid = false;
          if (field.type !== "checkbox") {
            field.setAttribute("aria-invalid", "true");
          }
        } else if (field.type !== "checkbox") {
          field.removeAttribute("aria-invalid");
        }
      });

      if (!valid) {
        if (statusNode) {
          statusNode.className = "form-status";
          statusNode.textContent =
            "Заполните обязательные поля и подтвердите готовность к тестовому заданию.";
        }
        return;
      }

      if (statusNode) {
        statusNode.className = "form-status success";
        statusNode.textContent =
          "Заявка принята. Мы свяжемся в течение 24 часов в рабочие дни.";
      }
      form.reset();
    });
  });

  var yearNodes = document.querySelectorAll(".js-year");
  var yearValue = String(new Date().getFullYear());
  yearNodes.forEach(function (node) {
    node.textContent = yearValue;
  });
})();
