$(document).ready(function() {
  // Obtener usuario actual
  let usuario = localStorage.getItem("usuarioActual");

  // Inicializar contactos del usuario
  let contactos = localStorage.getItem(`contactos_${usuario}`) 
    ? JSON.parse(localStorage.getItem(`contactos_${usuario}`)) 
    : [];

  // Mostrar lista de contactos
  function mostrarContactos() {
    $("#contactList").empty();
    contactos.forEach(c => {
      $("#contactList").append(`<li class="list-group-item contacto-item">${c}</li>`);
    });
  }
  mostrarContactos();

  // Autocompletar al hacer clic en un contacto
  $(document).on("click", ".contacto-item", function() {
    $("#destinatario").val($(this).text());
  });

  // Agregar contacto
  $("#addContactBtn").on("click", function() {
    let nuevo = prompt("Ingrese el nombre del nuevo contacto:");
    if (nuevo && !contactos.includes(nuevo)) {
      contactos.push(nuevo);
      localStorage.setItem(`contactos_${usuario}`, JSON.stringify(contactos));
      mostrarContactos();
      alert(`Contacto ${nuevo} agregado exitosamente`);
    }
  });

  // Saldo actual del usuario
  let saldo = localStorage.getItem(`saldo_${usuario}`) 
    ? parseFloat(localStorage.getItem(`saldo_${usuario}`)) 
    : 0;
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

    let saldoAntes = saldo;
    saldo -= monto;
    let saldoDespues = saldo;
    localStorage.setItem(`saldo_${usuario}`, saldo);

    // Guardar transacción detallada del usuario
    let transacciones = localStorage.getItem(`transacciones_${usuario}`) 
      ? JSON.parse(localStorage.getItem(`transacciones_${usuario}`)) 
      : [];
    transacciones.push({
      tipo: "Envío",
      origen: usuario,
      destinatario,
      monto,
      saldoAntes,
      saldoDespues,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem(`transacciones_${usuario}`, JSON.stringify(transacciones));

    // Agregar destinatario a contactos si no existe
    if (!contactos.includes(destinatario)) {
      contactos.push(destinatario);
      localStorage.setItem(`contactos_${usuario}`, JSON.stringify(contactos));
      mostrarContactos();
    }

    alert(`Dinero enviado: $${monto} a ${destinatario}`);
    $("#saldo").text(`$${saldo}`);
    $("#monto").val("");
    $("#destinatario").val("");
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