const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {
  const fields = {
    name: {
      input: document.querySelector("#name"),
      error: document.querySelector("#name-error"),
      validate(value) {
        return value.length >= 3;
      },
      message: "Informe seu nome completo com pelo menos 3 caracteres."
    },
    email: {
      input: document.querySelector("#email"),
      error: document.querySelector("#email-error"),
      validate(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Informe um endereço de e-mail válido."
    },
    message: {
      input: document.querySelector("#message"),
      error: document.querySelector("#message-error"),
      validate(value) {
        return value.length >= 10;
      },
      message: "A mensagem precisa ter pelo menos 10 caracteres."
    },
    privacy: {
      input: document.querySelector("#privacy"),
      error: document.querySelector("#privacy-error"),
      validate(value, input) {
        return input.checked;
      },
      message: "É necessário aceitar o uso dos dados para enviar a mensagem."
    }
  };

  function validateField(field) {
    const value = field.input.value.trim();
    const valid = field.validate(value, field.input);

    field.input.setAttribute("aria-invalid", String(!valid));
    field.error.textContent = valid ? "" : field.message;

    return valid;
  }

  Object.values(fields).forEach((field) => {
    field.input.addEventListener("blur", () => validateField(field));
    field.input.addEventListener("input", () => {
      if (field.input.getAttribute("aria-invalid") === "true") {
        validateField(field);
      }
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.className = "form-status";
    formStatus.textContent = "";

    const validFields = Object.values(fields).map(validateField);
    const isValid = validFields.every(Boolean);

    if (!isValid) {
      formStatus.classList.add("error");
      formStatus.textContent = "Revise os campos indicados antes de enviar o formulário.";
      const firstInvalid = Object.values(fields).find(
        (field) => field.input.getAttribute("aria-invalid") === "true"
      );
      firstInvalid?.input.focus();
      return;
    }

    formStatus.classList.add("success");
    formStatus.textContent = "Mensagem enviada com sucesso. Obrigado por contribuir com o Recicla Mais!";
    contactForm.reset();

    Object.values(fields).forEach((field) => {
      field.input.removeAttribute("aria-invalid");
      field.error.textContent = "";
    });

    formStatus.focus();
  });
}
