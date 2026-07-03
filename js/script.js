// learn-with-victoria.de

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll(".reveal");

  if (revealTargets.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }

  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a").forEach((link) => {
    const linkPath = link.getAttribute("href");

    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });

  const whatsappNumber = "4917687841204";
  const whatsappMessage = "Hallo Victoria, ich interessiere mich für Englischunterricht und möchte gerne mehr erfahren.";
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.setAttribute("href", whatsappUrl);
  });

  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }

    event.preventDefault();

    const data = new FormData(form);
    const lines = [
      `Name: ${data.get("Name") || ""}`,
      `E-Mail: ${data.get("E-Mail") || ""}`,
      `Telefon / WhatsApp: ${data.get("Telefon / WhatsApp") || ""}`,
      `Aktuelles Englischlevel: ${data.get("Aktuelles Englischlevel") || ""}`,
      `Wunschziel: ${data.get("Wunschziel") || ""}`,
      "",
      "Nachricht:",
      data.get("Nachricht") || ""
    ];

    const subject = encodeURIComponent("Anfrage für Englischunterricht");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:info@learn-with-victoria.de?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent = "Dein E-Mail-Programm wird geöffnet. Danke für deine Anfrage.";
    }
  });
});
