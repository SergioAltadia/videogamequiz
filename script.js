// Variables globales
let preguntaActual = 0;
let puntaje = 0;
let tiempoRestante = 30;
let temporizador;

// Elementos del DOM
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaJuego = document.getElementById('pantalla-juego');
const pantallaResultados = document.getElementById('pantalla-resultados');
const btnComenzar = document.getElementById('btn-comenzar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const contenedorOpciones = document.getElementById('opciones');
const elementoPregunta = document.getElementById('pregunta');
const elementoPreguntaActual = document.getElementById('pregunta-actual');
const elementoPuntaje = document.getElementById('puntaje');
const elementoTiempo = document.getElementById('tiempo');
const elementoPuntajeFinal = document.getElementById('puntaje-final');
const elementoCorrectas = document.getElementById('correctas');
const elementoExplicacion = document.getElementById('explicacion');
const elementoImagen = document.getElementById('imagen-actual');

// Event Listeners
btnComenzar.addEventListener('click', iniciarJuego);
btnReiniciar.addEventListener('click', reiniciarJuego);

// Funciones principales
function iniciarJuego() {
    preguntaActual = 0;
    puntaje = 0;
    pantallaInicio.style.display = 'none';
    pantallaJuego.style.display = 'block';
    pantallaResultados.style.display = 'none';
    elementoExplicacion.style.display = 'none';
    mostrarPregunta();
    iniciarTemporizador();
}

function mostrarPregunta() {
    if (preguntaActual >= preguntas.length) {
        mostrarResultados();
        return;
    }

    const pregunta = preguntas[preguntaActual];
    elementoPregunta.textContent = pregunta.pregunta;
    elementoPreguntaActual.textContent = preguntaActual + 1;
    elementoPuntaje.textContent = puntaje;
    elementoExplicacion.style.display = 'none';
    elementoExplicacion.classList.remove('mostrar');

    // Actualizar imagen
    elementoImagen.style.display = 'none';
    elementoImagen.classList.remove('mostrar');
    elementoImagen.src = pregunta.imagen;
    elementoImagen.onload = () => {
        elementoImagen.style.display = 'block';
        setTimeout(() => {
            elementoImagen.classList.add('mostrar');
        }, 10);
    };

    // Limpiar opciones anteriores
    contenedorOpciones.innerHTML = '';

    // Crear nuevas opciones
    pregunta.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.className = 'opcion';
        boton.textContent = opcion;
        boton.onclick = () => verificarRespuesta(index);
        contenedorOpciones.appendChild(boton);
    });

    // Reiniciar temporizador
    reiniciarTemporizador();
}

function verificarRespuesta(respuestaSeleccionada) {
    clearInterval(temporizador);
    const pregunta = preguntas[preguntaActual];
    const botones = contenedorOpciones.getElementsByClassName('opcion');

    // Deshabilitar todos los botones
    Array.from(botones).forEach(boton => boton.onclick = null);

    // Mostrar respuesta correcta e incorrecta
    botones[pregunta.respuestaCorrecta].classList.add('correcta');
    if (respuestaSeleccionada !== pregunta.respuestaCorrecta) {
        botones[respuestaSeleccionada].classList.add('incorrecta');
    }

    // Actualizar puntaje
    if (respuestaSeleccionada === pregunta.respuestaCorrecta) {
        puntaje += 100;
        elementoPuntaje.textContent = puntaje;
    }

    // Mostrar explicación
    elementoExplicacion.textContent = pregunta.explicacion;
    elementoExplicacion.style.display = 'block';
    setTimeout(() => {
        elementoExplicacion.classList.add('mostrar');
    }, 10);

    // Continuar después de 3 segundos
    setTimeout(() => {
        preguntaActual++;
        mostrarPregunta();
    }, 3000);
}

function mostrarResultados() {
    clearInterval(temporizador);
    pantallaJuego.style.display = 'none';
    pantallaResultados.style.display = 'block';
    elementoPuntajeFinal.textContent = puntaje;
    elementoCorrectas.textContent = Math.floor(puntaje / 100);
}

function reiniciarJuego() {
    preguntaActual = 0;
    puntaje = 0;
    pantallaResultados.style.display = 'none';
    iniciarJuego();
}

function iniciarTemporizador() {
    tiempoRestante = 30;
    elementoTiempo.textContent = tiempoRestante;
    temporizador = setInterval(() => {
        tiempoRestante--;
        elementoTiempo.textContent = tiempoRestante;
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            verificarRespuesta(-1); // Pasar una respuesta inválida
        }
    }, 1000);
}

function reiniciarTemporizador() {
    clearInterval(temporizador);
    iniciarTemporizador();
}
