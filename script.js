const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const routeButtons = document.querySelectorAll(".route");
const planSelect = document.querySelector("#plan");
const studentsInput = document.querySelector("#students");
const estimate = document.querySelector("#estimate");
const faqButtons = document.querySelectorAll(".faq-item");
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

function formatEgp(value) {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(value);
}

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

function updateEstimate() {
  const price = Number(planSelect.value);
  const students = Math.max(1, Number(studentsInput.value) || 1);
  estimate.textContent = formatEgp(price * students);
}

window.addEventListener("scroll", updateHeader);
updateHeader();
updateEstimate();

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("show");
  header.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("show");
    header.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

routeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    routeButtons.forEach((route) => route.classList.remove("active"));
    button.classList.add("active");
    planSelect.value = button.dataset.price;
    updateEstimate();
  });
});

planSelect.addEventListener("change", updateEstimate);
studentsInput.addEventListener("input", updateEstimate);

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = answer.classList.toggle("show");
    button.querySelector("strong").textContent = isOpen ? "−" : "+";
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name").toString().trim().split(" ")[0] || "there";
  formMessage.textContent = `Thanks, ${name}. ESTP will contact you shortly.`;
  contactForm.reset();
});
