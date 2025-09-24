const claro = getComputedStyle(document.documentElement).getPropertyValue('--primaria').trim();
const escuro = getComputedStyle(document.documentElement).getPropertyValue('--escuro-900').trim();
const darkBody = getComputedStyle(document.documentElement).getPropertyValue('.dark').trim();
let toggleDark = 0;

function initParticles() {
  const tema = localStorage.getItem("theme");

  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }

  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: tema === "dark" ? escuro : claro },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: tema === "dark" ? escuro : claro,
        opacity: 0.4,
        width: 1
      },
      move: { enable: true, speed: 6 }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: false, mode: "push" }
      },
      modes: { repulse: { distance: 200 } }
    },
    retina_detect: true
  });
}

initParticles();


emailjs.init("fFwckNS5atX7a7CtL");

document.getElementById("contact_form").addEventListener("submit", function (event) {
   event.preventDefault();

   const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value
   }

   const serviceID = "service_u00qrnd";
   const templateID = "template_i2qaxj9";
   const submitButton = document.getElementById("submit_button");
   submitButton.textContent = "Enviando..."
   submitButton.disabled = true;
   
   emailjs.send(serviceID, templateID, formData)
      .then(()=> {
         Toastify({
            text: "E-mail enviado com sucesso!",
            style: {
               background: "#28a745",
               color: "#e2e8f0"
            },
         }).showToast();

         document.getElementById("contact_form").reset();
      })
      .catch((error) => {
         Toastify({
            text: "Erro ao enviar o e-mail!",
            style: {
               background: "#dc3545",
               color: "#e2e8f0"
            },
         }).showToast();
         console.log("Erro no envio", error);
      })
      .finally(() => {
         submitButton.textContent = "Enviar Mensagem";
         submitButton.disabled = false;
      })
});

let copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);

const btn = document.getElementById("toggle-theme");
const icon = document.getElementById("theme-icon");

btn.addEventListener("click", () => {
   document.body.classList.toggle("dark");

   if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      icon.setAttribute("name", "sunny-outline");
   } else {
      localStorage.setItem("theme", "light");
      icon.setAttribute("name", "moon-outline");
   }

   initParticles();
});

if (localStorage.getItem("theme") === "dark") {
   document.body.classList.add("dark");
   icon.setAttribute("name", "sunny-outline");
} else {
   icon.setAttribute("name", "moon-outline");
}

