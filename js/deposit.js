$(document).ready(function() {
  // Obtener usuario actual
  let usuario = localStorage.getItem("usuarioActual");

  // Inicializar saldo del usuario
  let saldo = localStorage.getItem(`saldo_${usuario}`) 
    ? parseFloat(localStorage.getItem(`saldo_${usuario}`)) 
    : 0;
  $("#saldo").text(`$${saldo}`);

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
    localStorage.setItem(`saldo_${usuario}`, saldo);

    // Guardar transacción detallada del usuario
    let transacciones = localStorage.getItem(`transacciones_${usuario}`) 
      ? JSON.parse(localStorage.getItem(`transacciones_${usuario}`)) 
      : [];
    transacciones.push({
      tipo: "Depósito",
      origen: usuario,
      destinatario,
      monto,
      saldoAntes,
      saldoDespues,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem(`transacciones_${usuario}`, JSON.stringify(transacciones));

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