// Axel Cotón Gutiérrez Copyright 2023

// Variables globales para las unidades y el número máximo de ceros
let units = ["unidades", "decenas", "centenas", "unidades de millar"]; // Valor por defecto
let maxZeros = 3;
let currentQuestion = null;

// Función para generar una pregunta aleatoria
function generateRandomQuestion() {
    // Genera un número aleatorio entre 1 y 10^maxZeros
    const maxNumber = Math.pow(10, maxZeros) - 1;
    const number = Math.floor(Math.random() * maxNumber) + 1;

    // Convierte el número en una cadena para trabajar con las cifras
    const numberStr = number.toString();

    // Elige aleatoriamente una posición de cifra en el número
    const digitPosition = Math.floor(Math.random() * units.length);

    // Verifica si la posición de la cifra es válida para el número generado
    if (digitPosition >= numberStr.length) {
        return generateRandomQuestion(); // Vuelve a generar la pregunta si es inválida
    }

    // Obtiene el exponente (posición de cifra) en la posición seleccionada
    const exponent = digitPosition + 1;

    // Obtiene la cifra en la posición seleccionada
    const digit = parseInt(numberStr.charAt(numberStr.length - exponent));

    // Construye la pregunta basada en la posición de la cifra
    const unit = units[digitPosition];
    const question = `Observa el número ${formatNumberWithSpaces(number)}. ¿Cuál es la cifra de las ${unit}?`;

    return { question, answer: digit };
}

// Función para dar formato al número con espacios de mil
function formatNumberWithSpaces(number) {
    // Convierte el número a una cadena
    const numberStr = number.toString();

    // Si el número tiene cuatro cifras, no separamos con espacios
    if (numberStr.length === 4) {
        return numberStr;
    }

    // Divide la cadena en grupos de tres cifras desde el final
    const groups = [];
    let i = numberStr.length;
    while (i > 0) {
        groups.push(numberStr.slice(Math.max(0, i - 3), i));
        i -= 3;
    }

    // Une los grupos con espacios y devuelve el resultado
    return groups.reverse().join(' ');
}

// Función para mostrar una nueva pregunta
function displayQuestion() {
    currentQuestion = generateRandomQuestion();
    questionText.textContent = currentQuestion.question;
    userAnswer.value = "";
    result.textContent = "";
    checkAnswerButton.disabled = false;
    nextQuestionButton.style.display = "none";
}

// Función para comprobar la respuesta del usuario
function checkAnswer() {
    const userResponse = parseInt(userAnswer.value.trim());
    const correctAnswer = currentQuestion.answer;

    if (userResponse === correctAnswer) {
        result.textContent = "¡Respuesta Correcta!";
        result.style.color = "green";
    } else {
        result.textContent = "Respuesta Incorrecta. La respuesta correcta es " + correctAnswer + ".";
        result.style.color = "red";
    }

    checkAnswerButton.disabled = true;
    nextQuestionButton.style.display = "block";
}

// Función para mostrar la siguiente pregunta
function nextQuestion() {
    displayQuestion();
}

// Escucha el evento de cambio en los radios de selección de ceros
const radioButtons = document.getElementsByName("maxZeros");
for (const radioButton of radioButtons) {
    radioButton.addEventListener("change", function () {
        maxZeros = parseInt(this.value);
        updateUnits();
        displayQuestion();
        checkAnswerButton.disabled = false; // Habilitar el botón "Comprobar" después de cambiar las unidades
    });
}

// Función para actualizar la matriz de unidades en función de maxZeros
function updateUnits() {
    units = ["unidades", "decenas", "centenas", "unidades de millar"];

    if (maxZeros >= 6) {
        units.push("decenas de millar", "centenas de millar", "unidades de millón");
    }
    if (maxZeros >= 9) {
        units.push("decenas de millón", "centenas de millón", "unidades de millardo");
    }
    if (maxZeros >= 12) {
        units.push("decenas de millardo", "centenas de millardo", "unidades de billón");
    }
}

// Elementos HTML
const questionText = document.getElementById("question-text");
const userAnswer = document.getElementById("user-answer");
const checkAnswerButton = document.getElementById("check-answer");
const result = document.getElementById("result");
const nextQuestionButton = document.getElementById("next-question");

// Mostrar la primera pregunta
displayQuestion();

// Eventos de los botones
checkAnswerButton.addEventListener("click", checkAnswer);
nextQuestionButton.addEventListener("click", nextQuestion);