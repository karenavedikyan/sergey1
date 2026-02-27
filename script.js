const PHONE_E164 = "79186360011";

function $(selector, root = document) {
  return root.querySelector(selector);
}

function escapeText(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

function isProbablyUrlOrText(value) {
  const v = escapeText(value);
  if (!v) return false;
  return v.length >= 6;
}

function showError(inputName, message) {
  const hint = document.querySelector(`[data-error-for="${CSS.escape(inputName)}"]`);
  if (hint) hint.textContent = message || "";
}

function clearErrors(form) {
  for (const el of form.querySelectorAll("[data-error-for]")) el.textContent = "";
}

function buildApplicationText(values) {
  const lines = [
    "Заявка на отбор дизайнера карточек маркетплейсов",
    "",
    `Имя: ${values.name}`,
    `Telegram: ${values.telegram}`,
    `Портфолио / 3 лучшие работы: ${values.portfolio}`,
    `Опыт: ${values.experience}`,
    `Тестовое задание: ${values.testReady ? "Готов(а)" : "Не готов(а)"}`,
  ];
  return lines.join("\n");
}

function encodeForUrl(text) {
  return encodeURIComponent(text);
}

function setResult(text) {
  const result = $("#result");
  const resultText = $("#resultText");
  resultText.textContent = text;
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function setSendLinks(text) {
  const wa = $("#sendWhatsApp");
  const tg = $("#sendTelegram");

  wa.href = `https://wa.me/${PHONE_E164}?text=${encodeForUrl(text)}`;
  tg.href = `https://t.me/share/url?url=${encodeForUrl("")}&text=${encodeForUrl(text)}`;
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function init() {
  document.documentElement.style.scrollBehavior = "smooth";

  const form = $("#applyForm");
  const clearBtn = $("#clearForm");
  const copyBtn = $("#copyText");

  if (!form) return;

  clearBtn?.addEventListener("click", () => {
    form.reset();
    clearErrors(form);
    const result = $("#result");
    if (result) result.hidden = true;
  });

  copyBtn?.addEventListener("click", async () => {
    const text = $("#resultText")?.textContent || "";
    if (!text) return;
    const ok = await copyToClipboard(text);
    copyBtn.textContent = ok ? "Скопировано" : "Не удалось";
    window.setTimeout(() => (copyBtn.textContent = "Скопировать"), 1400);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors(form);

    const values = {
      name: escapeText($("#name")?.value),
      telegram: escapeText($("#telegram")?.value),
      portfolio: escapeText($("#portfolio")?.value),
      experience: escapeText($("#experience")?.value),
      testReady: Boolean($("#testReady")?.checked),
    };

    let hasError = false;

    if (!values.name || values.name.length < 2) {
      showError("name", "Укажите имя (минимум 2 символа).");
      hasError = true;
    }

    if (!values.telegram || values.telegram.length < 2) {
      showError("telegram", "Укажите Telegram (ник или ссылку).");
      hasError = true;
    }

    if (!isProbablyUrlOrText(values.portfolio)) {
      showError("portfolio", "Добавьте ссылку на портфолио или 3 лучшие работы.");
      hasError = true;
    }

    if (!values.experience || values.experience.length < 6) {
      showError("experience", "Коротко опишите опыт (минимум 6 символов).");
      hasError = true;
    }

    if (!values.testReady) {
      showError("testReady", "Нужно подтвердить готовность выполнить тестовое.");
      hasError = true;
    }

    if (hasError) return;

    const text = buildApplicationText(values);
    setResult(text);
    setSendLinks(text);
  });
}

document.addEventListener("DOMContentLoaded", init);

