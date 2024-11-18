// Variables globales
let preguntaActual = 0;
let puntuacion = 0;
let tiempoRestante;
let temporizador;
let nombreJugador = '';
let dificultadSeleccionada = '';
let preguntasJuego = [];
let estadisticasJuego = {
    preguntasCorrectas: 0,
    pistasUsadas: 0,
    preguntasSaltadas: 0,
    tiempoTotal: 0
};

// Elementos del DOM
const pantallaBienvenida = document.getElementById('pantallaBienvenida');
const pantallaJuego = document.getElementById('pantallaJuego');
const pantallaResultados = document.getElementById('pantallaResultados');
const nombreInput = document.getElementById('nombreInput');
const preguntaTexto = document.getElementById('pregunta');
const opcionesContainer = document.getElementById('opciones');
const tiempoDisplay = document.getElementById('tiempo');
const puntuacionDisplay = document.getElementById('puntuacion');
const resultadoFinal = document.getElementById('resultadoFinal');
const barraProgreso = document.querySelector('.progress-bar');

// Inicialización del juego
function iniciarJuego() {
    nombreJugador = nombreInput.value.trim();
    if (!nombreJugador) {
        alert('Por favor, introduce tu nombre');
        return;
    }
    dificultadSeleccionada = document.querySelector('input[name="dificultad"]:checked').value;
    
    // Filtrar preguntas según dificultad
    preguntasJuego = preguntas.filter(p => p.dificultad === dificultadSeleccionada);
    if (preguntasJuego.length < 10) {
        // Si no hay suficientes preguntas de la dificultad seleccionada, añadir de otras dificultades
        const preguntasAdicionales = preguntas
            .filter(p => p.dificultad !== dificultadSeleccionada)
            .sort(() => Math.random() - 0.5)
            .slice(0, 10 - preguntasJuego.length);
        preguntasJuego = [...preguntasJuego, ...preguntasAdicionales];
    }
    
    // Mezclar preguntas
    preguntasJuego = preguntasJuego.sort(() => Math.random() - 0.5).slice(0, 10);
    
    pantallaBienvenida.style.display = 'none';
    pantallaJuego.style.display = 'block';
    mostrarPregunta();
}

function mostrarPregunta() {
    if (preguntaActual >= preguntasJuego.length) {
        finalizarJuego();
        return;
    }

    const pregunta = preguntasJuego[preguntaActual];
    preguntaTexto.textContent = pregunta.pregunta;
    opcionesContainer.innerHTML = '';
    
    // Mostrar imagen si existe
    const imagenPregunta = document.getElementById('imagenPregunta');
    if (pregunta.imagen) {
        imagenPregunta.src = pregunta.imagen;
        imagenPregunta.style.display = 'block';
    } else {
        imagenPregunta.style.display = 'none';
    }

    // Crear botones de opciones
    pregunta.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.textContent = opcion;
        boton.className = 'opcion';
        boton.onclick = () => verificarRespuesta(index);
        opcionesContainer.appendChild(boton);
    });

    // Actualizar progreso
    actualizarProgreso();
    
    // Iniciar temporizador
    iniciarTemporizador();
}

function iniciarTemporizador() {
    if (temporizador) clearInterval(temporizador);
    tiempoRestante = configuracionDificultad[dificultadSeleccionada].tiempo;
    actualizarTiempoDisplay();

    temporizador = setInterval(() => {
        tiempoRestante--;
        actualizarTiempoDisplay();
        
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            tiempoAgotado();
        }
    }, 1000);
}

function actualizarTiempoDisplay() {
    tiempoDisplay.textContent = tiempoRestante;
    const porcentaje = (tiempoRestante / configuracionDificultad[dificultadSeleccionada].tiempo) * 100;
    barraProgreso.style.width = `${porcentaje}%`;
    
    // Cambiar color según tiempo restante
    if (porcentaje > 60) barraProgreso.style.backgroundColor = '#28a745';
    else if (porcentaje > 30) barraProgreso.style.backgroundColor = '#ffc107';
    else barraProgreso.style.backgroundColor = '#dc3545';
}

function verificarRespuesta(respuestaUsuario) {
    clearInterval(temporizador);
    const pregunta = preguntasJuego[preguntaActual];
    const esCorrecta = respuestaUsuario === pregunta.respuestaCorrecta;
    
    if (esCorrecta) {
        estadisticasJuego.preguntasCorrectas++;
        const puntosPregunta = calcularPuntos();
        puntuacion += puntosPregunta;
        mostrarFeedback('¡Correcto! ' + pregunta.explicacion, true);
    } else {
        mostrarFeedback('Incorrecto. ' + pregunta.explicacion, false);
    }

    actualizarPuntuacion();
    setTimeout(() => {
        preguntaActual++;
        mostrarPregunta();
    }, 2000);
}

function calcularPuntos() {
    const config = configuracionDificultad[dificultadSeleccionada];
    let puntos = config.puntosPregunta;
    
    // Bonus por tiempo restante
    const bonusTiempo = Math.floor(tiempoRestante / config.tiempo * config.puntosPregunta * 0.5);
    puntos += bonusTiempo;
    
    return puntos;
}

function mostrarPista() {
    const pregunta = preguntasJuego[preguntaActual];
    const penalizacion = configuracionDificultad[dificultadSeleccionada].penalizacionPista;
    puntuacion = Math.max(0, puntuacion - penalizacion);
    estadisticasJuego.pistasUsadas++;
    actualizarPuntuacion();
    alert(`Pista: ${pregunta.pista}\n(Se han restado ${penalizacion} puntos)`);
}

function saltarPregunta() {
    const penalizacion = configuracionDificultad[dificultadSeleccionada].penalizacionSaltar;
    puntuacion = Math.max(0, puntuacion - penalizacion);
    estadisticasJuego.preguntasSaltadas++;
    actualizarPuntuacion();
    clearInterval(temporizador);
    preguntaActual++;
    mostrarPregunta();
}

function tiempoAgotado() {
    const penalizacion = configuracionDificultad[dificultadSeleccionada].penalizacionTiempo;
    puntuacion = Math.max(0, puntuacion - penalizacion);
    actualizarPuntuacion();
    mostrarFeedback('¡Tiempo agotado!', false);
    setTimeout(() => {
        preguntaActual++;
        mostrarPregunta();
    }, 1500);
}

function actualizarPuntuacion() {
    puntuacionDisplay.textContent = puntuacion;
}

function actualizarProgreso() {
    const progreso = document.getElementById('progreso');
    progreso.textContent = `Pregunta ${preguntaActual + 1} de ${preguntasJuego.length}`;
}

function mostrarFeedback(mensaje, esCorrecta) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = mensaje;
    feedback.className = esCorrecta ? 'feedback correcto' : 'feedback incorrecto';
    feedback.style.display = 'block';
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 2000);
}

function finalizarJuego() {
    pantallaJuego.style.display = 'none';
    pantallaResultados.style.display = 'block';
    
    // Calcular porcentaje de aciertos
    const porcentajeAciertos = (estadisticasJuego.preguntasCorrectas / preguntasJuego.length) * 100;
    
    // Determinar mensaje final
    let categoria;
    if (porcentajeAciertos >= 90) categoria = 'excelente';
    else if (porcentajeAciertos >= 70) categoria = 'bueno';
    else if (porcentajeAciertos >= 50) categoria = 'regular';
    else categoria = 'mejorable';
    
    const mensajes = mensajesFinales[categoria];
    const mensajeFinal = mensajes[Math.floor(Math.random() * mensajes.length)];
    
    // Mostrar resultados
    resultadoFinal.innerHTML = `
        <h2>¡Juego terminado, ${nombreJugador}!</h2>
        <p>${mensajeFinal}</p>
        <div class="estadisticas">
            <p>Puntuación final: ${puntuacion}</p>
            <p>Respuestas correctas: ${estadisticasJuego.preguntasCorrectas} de ${preguntasJuego.length}</p>
            <p>Pistas utilizadas: ${estadisticasJuego.pistasUsadas}</p>
            <p>Preguntas saltadas: ${estadisticasJuego.preguntasSaltadas}</p>
        </div>
    `;
}

function compartirResultado() {
    const mensaje = `¡He conseguido ${puntuacion} puntos en el Trivia de Videojuegos! 🎮\nAcerté ${estadisticasJuego.preguntasCorrectas} de ${preguntasJuego.length} preguntas en dificultad ${dificultadSeleccionada}. ¿Puedes superarme? 🏆`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mi resultado en Trivia de Videojuegos',
            text: mensaje,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const tempInput = document.createElement('textarea');
        tempInput.value = mensaje;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('¡Resultado copiado al portapapeles!');
    }
}
