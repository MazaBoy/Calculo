// Variables globales
let aciertos = 0;
let fallos = 0;
let currentMode = 'derivada'; // 'derivada' o 'integral'
let currentQuestion = null;

// Ejercicios para derivadas
const derivadas = [
  {
    pregunta: "¿Cuál es la derivada de x²?",
    opciones: ["2x", "x", "2", "x²"],
    correcta: "2x"
  },
  {
    pregunta: "¿Cuál es la derivada de 3x³?",
    opciones: ["9x²", "3x²", "x²", "6x"],
    correcta: "9x²"
  },
  {
    pregunta: "¿Cuál es la derivada de sin(x)?",
    opciones: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
    correcta: "cos(x)"
  },
  {
    pregunta: "¿Cuál es la derivada de cos(x)?",
    opciones: ["-sin(x)", "sin(x)", "-cos(x)", "cos(x)"],
    correcta: "-sin(x)"
  },
  {
    pregunta: "¿Cuál es la derivada de eˣ?",
    opciones: ["eˣ", "xe^(x-1)", "ln(eˣ)", "1/eˣ"],
    correcta: "eˣ"
  },
  {
    pregunta: "¿Cuál es la derivada de ln(x)?",
    opciones: ["1/x", "x", "ln(x)/x", "x ln(x)"],
    correcta: "1/x"
  }
];

// Ejercicios para integrales (opción múltiple)
const integrales = [
  {
    pregunta: "¿Cuál es la integral de x dx?",
    opciones: ["x²/2", "x", "2x", "2/x"],
    correcta: "x²/2"
  },
  {
    pregunta: "¿Cuál es la integral de 2x dx?",
    opciones: ["x²", "2x²", "x", "2/x"],
    correcta: "x²"
  },
  {
    pregunta: "¿Cuál es la integral de cos(x) dx?",
    opciones: ["sin(x)", "-sin(x)", "cos(x)", "-cos(x)"],
    correcta: "sin(x)"
  },
  {
    pregunta: "¿Cuál es la integral de sin(x) dx?",
    opciones: ["-cos(x)", "cos(x)", "-sin(x)", "sin(x)"],
    correcta: "-cos(x)"
  },
  {
    pregunta: "¿Cuál es la integral de eˣ dx?",
    opciones: ["eˣ", "xe^(x-1)", "eˣ+1", "ln(eˣ)"],
    correcta: "eˣ"
  }
];

// Pregunta final de 8 incisos
const finalQuestion = {
  pregunta: "¿Cuál es la integral de 3x² + 2x + 1 dx?",
  opciones: [
    "x³ + x² + x + C",  // Correcta
    "x³ + x² + C",
    "x³ + x + C",
    "x³ + 2x² + x + C",
    "x³ + x² + 2x + C",
    "x³ + x²/2 + x + C",
    "3x³ + 2x² + x + C",
    "x³ + 2x + C"
  ],
  correcta: "x³ + x² + x + C"
};

// Función para barajar un array (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Mostrar una nueva pregunta según el modo
function nuevaPregunta() {
  // Ocultar la sección de integral abierta (si estuviera visible)
  document.getElementById("openIntegral").classList.add("hidden");
  let ejercicio;
  if (currentMode === 'derivada') {
    ejercicio = derivadas[Math.floor(Math.random() * derivadas.length)];
  } else {
    ejercicio = integrales[Math.floor(Math.random() * integrales.length)];
  }
  currentQuestion = ejercicio;
  mostrarEjercicio(ejercicio);
}

// Mostrar el ejercicio y sus opciones
function mostrarEjercicio(ejercicio) {
  document.getElementById("exercise").textContent = ejercicio.pregunta;
  const answersDiv = document.querySelector(".answers");
  answersDiv.innerHTML = "";
  let opciones = shuffle([...ejercicio.opciones]);
  opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.onclick = () => verificarRespuesta(opcion);
    answersDiv.appendChild(btn);
  });
}

// Verificar respuesta y actualizar contadores
function verificarRespuesta(seleccion) {
  if (seleccion === currentQuestion.correcta) {
    aciertos++;
  } else {
    fallos++;
  }
  actualizarContadores();
  if (aciertos >= 5) {
    mostrarVictoria();
  } else if (fallos >= 5) {
    mostrarDerrota();
  } else {
    nuevaPregunta();
  }
}

// Actualizar los contadores en pantalla
function actualizarContadores() {
  document.getElementById("aciertos").textContent = aciertos;
  document.getElementById("fallos").textContent = fallos;
}

// Mostrar pantalla de victoria
function mostrarVictoria() {
  document.getElementById("mainScreen").classList.add("hidden");
  const finalScreen = document.getElementById("finalScreen");
  finalScreen.classList.remove("hidden");
  finalScreen.style.backgroundColor = "green";
  finalScreen.innerHTML = `
    <div class="finalMessage" style="color:white;">You win</div>
    <button id="btnMemento" class="finalBtn">Memento mori</button>
  `;
  document.getElementById("btnMemento").onclick = mostrarFinalQuestion;
}

// Mostrar pantalla de derrota
function mostrarDerrota() {
  document.getElementById("mainScreen").classList.add("hidden");
  const finalScreen = document.getElementById("finalScreen");
  finalScreen.classList.remove("hidden");
  finalScreen.style.backgroundColor = "red";
  finalScreen.innerHTML = `
    <div class="finalMessage" style="color:black;">You lose</div>
    <button id="btnRenacer" class="finalBtn">renacer</button>
  `;
  document.getElementById("btnRenacer").onclick = reiniciar;
}

// Mostrar la pregunta final de 8 incisos
function mostrarFinalQuestion() {
  const finalScreen = document.getElementById("finalScreen");
  finalScreen.innerHTML = `
    <div id="finalQuestion">
      <h3>${finalQuestion.pregunta}</h3>
      <div class="options"></div>
    </div>
  `;
  const optionsDiv = document.querySelector("#finalQuestion .options");
  let opciones = shuffle([...finalQuestion.opciones]);
  opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.onclick = () => verificarFinal(opcion);
    optionsDiv.appendChild(btn);
  });
}

// Verificar respuesta de la pregunta final
function verificarFinal(seleccion) {
  if (seleccion === finalQuestion.correcta) {
    document.body.style.backgroundColor = "#f5e6a1"; // Dorado claro
    const finalScreen = document.getElementById("finalScreen");
    finalScreen.innerHTML = `<div class="finalMessage" style="color:white;">veni,vedi,venci</div>`;
    // Solicitar nombre para registrar en el top
    setTimeout(() => {
      const playerName = prompt("¡Felicidades! Ingresa tu nombre para registrarte en el top:");
      if (playerName) {
        finalScreen.innerHTML += `<div style="margin-top:20px; font-size:24px;">¡${playerName}, registrado en el top!</div>`;
      }
      // Botón para reiniciar el juego
      finalScreen.innerHTML += `<button id="btnReiniciarFinal" class="finalBtn" style="margin-top:30px;">Reiniciar</button>`;
      document.getElementById("btnReiniciarFinal").onclick = reiniciar;
    }, 100);
  } else {
    alert("Respuesta incorrecta. Inténtalo de nuevo.");
  }
}

// Reiniciar la aplicación
function reiniciar() {
  aciertos = 0;
  fallos = 0;
  actualizarContadores();
  document.getElementById("finalScreen").classList.add("hidden");
  document.getElementById("mainScreen").classList.remove("hidden");
  document.body.style.backgroundColor = "#1E3A5F";
  document.getElementById("exercise").classList.remove("hidden");
  document.querySelector(".answers").classList.remove("hidden");
  document.getElementById("openIntegral").classList.add("hidden");
  nuevaPregunta();
}

// Asignar eventos a los botones de modo
document.getElementById("btnDerivada").addEventListener("click", function() {
  currentMode = 'derivada';
  document.getElementById("openIntegral").classList.add("hidden");
  document.getElementById("exercise").classList.remove("hidden");
  document.querySelector(".answers").classList.remove("hidden");
  nuevaPregunta();
});
document.getElementById("btnIntegral").addEventListener("click", function() {
  currentMode = 'integral';
  document.getElementById("openIntegral").classList.add("hidden");
  document.getElementById("exercise").classList.remove("hidden");
  document.querySelector(".answers").classList.remove("hidden");
  nuevaPregunta();
});

// Inicializar con modo derivada
nuevaPregunta();
