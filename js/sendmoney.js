$(document).ready(function() {
  // Obtener contactos guardados o inicializar
  let contactos = localStorage.getItem("contactos") ? JSON.parse(localStorage.getItem("contactos")) : ["Ana", "Pedro", "Luis"];

  // Autocompletar con jQuery UI
  $("#destinatario").autocomplete({
    source: contactos
  });

  // Mostrar saldo actual
  let saldo = localStorage.getItem("saldo") ? parseFloat(localStorage.getItem("saldo")) : 0;
  $("#saldo").text(`$${saldo}`);

  // Enviar dinero
  $("#sendForm").on("submit", function(event) {
    event.preventDefault();

    let destinatario = $("#destinatario").val().trim();
    let monto = parseFloat($("#monto").val());

    if (!destinatario || isNaN(monto) || monto <= 0) {
      alert("Ingrese un destinatario y un monto válido");
      return;
    }

    if (monto > saldo) {
      alert("Saldo insuficiente");
      return;
    }

    // Actualizar saldo
    saldo -= monto;
    localStorage.setItem("saldo", saldo);

    // Guardar transacción
    let transacciones = localStorage.getItem("transacciones") ? JSON.parse(localStorage.getItem("transacciones")) : [];
    transacciones.push({
      tipo: "Envío",
      destinatario: destinatario,
      monto: monto,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem("transacciones", JSON.stringify(transacciones));

    // Guardar contacto si no existe
    if (!contactos.includes(destinatario)) {
      contactos.push(destinatario);
      localStorage.setItem("contactos", JSON.stringify(contactos));
    }

    alert(`Dinero enviado: $${monto} a ${destinatario}`);
    window.location.href = "menu.html";
  });

  // Modo oscuro persistente
  if (localStorage.getItem("darkMode") === "enabled") {
    $("body").addClass("dark-mode");
  }
  $("#darkModeToggle").on("click", function() {
    $("body").toggleClass("dark-mode");
    localStorage.setItem("darkMode", $("body").hasClass("dark-mode") ? "enabled" : "disabled");
  });
});