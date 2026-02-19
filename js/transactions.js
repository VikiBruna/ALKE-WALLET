$(document).ready(function() {
  const tableBody = $("#transactionsTable");
  const noTransactions = $("#noTransactions");

  // Obtener transacciones
  let transacciones = localStorage.getItem("transacciones") ? JSON.parse(localStorage.getItem("transacciones")) : [];

  if (transacciones.length === 0) {
    noTransactions.text("No hay transacciones registradas.");
  } else {
    transacciones.forEach(tx => {
      let row = $("<tr></tr>");
      row.html(`
        <td>${tx.tipo}</td>
        <td>${tx.destinatario}</td>
        <td>$${tx.monto}</td>
        <td>${tx.fecha}</td>
      `);
      tableBody.append(row);
    });
  }

  // Modo oscuro persistente
  if (localStorage.getItem("darkMode") === "enabled") {
    $("body").addClass("dark-mode");
  }
  $("#darkModeToggle").on("click", function() {
    $("body").toggleClass("dark-mode");
    localStorage.setItem("darkMode", $("body").hasClass("dark-mode") ? "enabled" : "disabled");
  });
});