$(document).ready(function() {
  // Inicializar saldo
  let saldo = localStorage.getItem("saldo") ? parseFloat(localStorage.getItem("saldo")) : 0;
  $("#saldo").text(`$${saldo}`);

  // Inicializar contactos
  let contactos = localStorage.getItem("contactos") ? JSON.parse(localStorage.getItem("contactos")) : ["Ana", "Pedro", "Luis"];

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
      localStorage.setItem("contactos", JSON.stringify(contactos));
      mostrarContactos();
      alert(`Contacto ${nuevo} agregado exitosamente`);
    }
  });

  // Depositar dinero
  $("#depositForm").on("submit", function(event) {
    event.preventDefault();
    let monto = parseFloat($("#monto").val());
    let destinatario = $("#destinatario").val().trim();

    if (!destinatario) {
      alert("Seleccione o ingrese un destinatario");
      return;
    }
    if (isNaN(monto) || monto <= 0) {
      alert("Ingrese un monto válido");
      return;
    }

    let saldoAntes = saldo;
    saldo += monto;
    let saldoDespues = saldo;
    localStorage.setItem("saldo", saldo);

    // Guardar transacción detallada
    let transacciones = localStorage.getItem("transacciones") ? JSON.parse(localStorage.getItem("transacciones")) : [];
    transacciones.push({
      tipo: "Depósito",
      origen: "Usuario",
      destinatario,
      monto,
      saldoAntes,
      saldoDespues,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem("transacciones", JSON.stringify(transacciones));

    alert(`Depósito exitoso: $${monto} a ${destinatario}`);
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