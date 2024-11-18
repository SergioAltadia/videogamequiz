const preguntas = [
    {
        pregunta: "¿Cuál es el personaje principal de The Legend of Zelda?",
        opciones: ["Link", "Zelda", "Ganon", "Mario"],
        respuestaCorrecta: 0,
        explicacion: "Link es el protagonista de la saga The Legend of Zelda, aunque muchos confunden a Zelda como el personaje principal.",
        imagen: "imagenes/zelda.jpg",
        pista: "Su nombre a menudo se confunde con el título del juego",
        dificultad: "facil"
    },
    {
        pregunta: "¿En qué año se lanzó el primer Super Mario Bros?",
        opciones: ["1983", "1985", "1987", "1989"],
        respuestaCorrecta: 1,
        explicacion: "Super Mario Bros fue lanzado en 1985 para el Nintendo Entertainment System (NES).",
        imagen: "imagenes/mario.jpg",
        pista: "Fue lanzado el mismo año que el NES en América",
        dificultad: "medio"
    },
    {
        pregunta: "¿Cuál es el nombre del erizo mascota de SEGA?",
        opciones: ["Knuckles", "Tails", "Shadow", "Sonic"],
        respuestaCorrecta: 3,
        explicacion: "Sonic the Hedgehog es la mascota oficial de SEGA desde su debut en 1991.",
        imagen: "imagenes/sonic.jpg",
        pista: "Es conocido por su velocidad y color azul",
        dificultad: "facil"
    },
    {
        pregunta: "¿Qué juego popularizó el género Battle Royale?",
        opciones: ["Fortnite", "PUBG", "Apex Legends", "H1Z1"],
        respuestaCorrecta: 1,
        explicacion: "PlayerUnknown's Battlegrounds (PUBG) fue el juego que popularizó el género Battle Royale en 2017.",
        imagen: "imagenes/pubg.jpg",
        pista: "Comenzó como un mod de ARMA 2",
        dificultad: "medio"
    },
    {
        pregunta: "¿Cuál es el videojuego más vendido de la historia?",
        opciones: ["Minecraft", "Tetris", "GTA V", "Wii Sports"],
        respuestaCorrecta: 0,
        explicacion: "Minecraft es el videojuego más vendido de la historia con más de 200 millones de copias vendidas.",
        imagen: "imagenes/minecraft.jpg",
        pista: "Es un juego de construcción con bloques",
        dificultad: "facil"
    },
    {
        pregunta: "¿Qué compañía desarrolló el juego Pokemon?",
        opciones: ["Sony", "Nintendo", "Game Freak", "Square Enix"],
        respuestaCorrecta: 2,
        explicacion: "Game Freak es la compañía desarrolladora de la serie principal de Pokemon, en colaboración con Nintendo.",
        imagen: "imagenes/pokemon.jpg",
        pista: "Nintendo solo publica los juegos, no los desarrolla",
        dificultad: "dificil"
    },
    {
        pregunta: "¿En qué año se lanzó la primera PlayStation?",
        opciones: ["1993", "1994", "1995", "1996"],
        respuestaCorrecta: 1,
        explicacion: "La PlayStation original fue lanzada el 3 de diciembre de 1994 en Japón.",
        imagen: "imagenes/playstation.jpg",
        pista: "Fue lanzada primero en Japón, un año antes que en occidente",
        dificultad: "medio"
    },
    {
        pregunta: "¿Cuál es el nombre del protagonista de God of War?",
        opciones: ["Zeus", "Ares", "Kratos", "Atlas"],
        respuestaCorrecta: 2,
        explicacion: "Kratos es el protagonista de la saga God of War, un semidiós espartano en busca de venganza.",
        imagen: "imagenes/god-of-war.jpg",
        pista: "Es un ex-general espartano",
        dificultad: "facil"
    },
    {
        pregunta: "¿Qué empresa desarrolló el juego Pac-Man?",
        opciones: ["Namco", "Atari", "Nintendo", "Sega"],
        respuestaCorrecta: 0,
        explicacion: "Pac-Man fue desarrollado por Namco y lanzado en Japón el 22 de mayo de 1980.",
        imagen: "imagenes/pacman.jpg",
        pista: "Es una compañía japonesa que más tarde se fusionó con Bandai",
        dificultad: "medio"
    },
    {
        pregunta: "¿Cuál fue la primera consola de videojuegos?",
        opciones: ["Atari 2600", "Magnavox Odyssey", "Nintendo NES", "Coleco Telstar"],
        respuestaCorrecta: 1,
        explicacion: "La Magnavox Odyssey, lanzada en 1972, fue la primera consola de videojuegos comercial de la historia.",
        imagen: "imagenes/magnavox.jpg",
        pista: "Fue lanzada incluso antes que el Atari Pong",
        dificultad: "dificil"
    }
];

// Configuración de dificultad
const configuracionDificultad = {
    facil: {
        tiempo: 30,
        puntosPregunta: 100,
        penalizacionTiempo: 0,
        penalizacionPista: 25,
        penalizacionSaltar: 10
    },
    medio: {
        tiempo: 20,
        puntosPregunta: 200,
        penalizacionTiempo: 50,
        penalizacionPista: 50,
        penalizacionSaltar: 25
    },
    dificil: {
        tiempo: 10,
        puntosPregunta: 300,
        penalizacionTiempo: 100,
        penalizacionPista: 75,
        penalizacionSaltar: 50
    }
};

// Mensajes de finalización según el rendimiento
const mensajesFinales = {
    excelente: [
        "¡Increíble! ¡Eres un verdadero maestro de los videojuegos!",
        "¡Perfección pura! Tu conocimiento de los videojuegos es asombroso.",
        "¡Extraordinario! Deberías considerar participar en torneos de trivia."
    ],
    bueno: [
        "¡Muy bien! Tienes un gran conocimiento sobre videojuegos.",
        "¡Buen trabajo! Estás en camino de convertirte en un experto.",
        "¡Excelente esfuerzo! Sigue así y serás imparable."
    ],
    regular: [
        "¡No está mal! Hay espacio para mejorar, pero vas por buen camino.",
        "¡Buen intento! Con un poco más de práctica serás un experto.",
        "¡Sigue intentándolo! Cada vez aprenderás más sobre videojuegos."
    ],
    mejorable: [
        "¡Hey, todos empezamos por algún lado! Sigue jugando y aprendiendo.",
        "¡No te desanimes! La próxima vez lo harás mejor.",
        "¡Ánimo! Con práctica y dedicación mejorarás tus resultados."
    ]
};
