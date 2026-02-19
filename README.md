# Alke Wallet

Alke Wallet es una aplicación web que simula una billetera digital. Permite **iniciar sesión**, **depositar dinero**, **enviar dinero a contactos**, y **visualizar el historial de transacciones** en una tabla estilo bancario con saldos acumulados.

---

## Funcionalidades

- **Login seguro**: formulario de inicio de sesión.
- **Menú principal**: acceso rápido a depósitos, envíos y transacciones.
- **Depósitos**:
  - Ingresar monto y destinatario.
  - Agregar contactos y autocompletar al seleccionarlos.
  - Registro automático en el historial.
- **Envíos de dinero**:
  - Selección de contactos guardados.
  - Validación de saldo disponible.
  - Registro automático en el historial.
- **Historial de transacciones**:
  - Tabla con columnas: Fecha, Nº de Operación, Descripción, Abonos, Cargos y Saldos.
  - La columna **Saldos** muestra el dinero disponible después de cada operación.
- **Modo oscuro persistente**: se guarda en `localStorage` y se aplica en todas las páginas.

---

## Tecnologías utilizadas

- **HTML5** para la estructura.
- **CSS3 + Bootstrap 5** para estilos y diseño responsivo.
- **JavaScript + jQuery** para la lógica y manipulación del DOM.
- **localStorage** para persistencia de datos (saldo, contactos, transacciones).

---

##  Estructura del proyecto

```plaintext
AlkeWallet/
│
├── index.html
├── login.html
├── menu.html
├── deposit.html
├── sendmoney.html
├── transactions.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── index.js
│   ├── login.js
│   ├── menu.js
│   ├── deposit.js
│   ├── sendmoney.js
│   └── transactions.js
│
└── README.md
```

---


## Capturas de pantalla



---

##  Cómo ejecutar el proyecto

**1. Clona el repositorio:**
   ```bash
   git clone https://github.com/VikiBruna/ALKE-WALLET.git
   ```
**2. Abre la carpeta en VS Code.**

**3. Inicia un servidor local (ejemplo: con la extensión Live Server).**

**4. Accede a index.html desde tu navegador.**

---

## Notas

- Este proyecto es académico y simula operaciones financieras, **no maneja dinero real**.
- Los datos se almacenan en el navegador mediante localStorage.

## Autora

- María Victoria Bruna Cáceres.
Proyecto desarrollado como parte del curso **DESARROLLO DE APLICACIONES FULL STACK JAVA TRAINEE**.





