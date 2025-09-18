particlesJS("particles-js", {
  "particles": {
    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.5 },
    "size": { "value": 3, "random": true },
    "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
    "move": { "enable": true, "speed": 6 }
  },
  "interactivity": {
    "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": false, "mode": "push" } },
    "modes": { "repulse": { "distance": 200 } }
  },
  "retina_detect": true
});


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
