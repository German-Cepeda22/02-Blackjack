/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */


(() => {
    'use strict'

    // Variables de barajas
    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    //referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas'),
          puntosHTML = document.querySelectorAll('small');

    // Esta función inicializa el juego
    const inicializarJuego = () => {
        deck = crearDeck();
    }

    // Esta función crea una nueva baraja de cartas
    const crearDeck = () => {

        deck = [];
        for ( let i = 2; i <= 10; i++) {
            for ( let tipo of tipos )  {
                deck.push(i + tipo);
            }    
        }

        for ( let tipo of tipos) {
            for ( let esp of especiales) {
                deck.push (esp + tipo)
            }
        }
        return _.shuffle(deck);
    }

    
    // Esta función me permite tomar una carta
    const pedirCarta = () => {
        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    //Pedir una carta
    const valorCarta = ( carta ) => {
        
        const valor = carta.substring(0, carta.length - 1); // Elimina el último caracter de la carta
        return ( isNaN( valor)) ?
                ( valor === 'A') ? 11 : 10
                : valor * 1; // Convierte el valor de la carta a un número
    }

    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append( imgCarta );

            if ( puntosMinimos > 21 ) {
                break;
            }

        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

        setTimeout(() => {
            if ( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana');
            } else if ( puntosComputadora > 21 ) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 100);

    }


    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);

        puntosHTML[0].innerText = puntosJugador;

        // <img class="carta" src="assets/cartas/2C.png"></img>
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append( imgCarta );

        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            turnoComputadora( puntosJugador );

        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial');
            btnPedir.disabled = true;
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    });

    btnNuevo.addEventListener('click', () => {
        console.clear();
        inicializarJuego();
        // deck = [];
        // deck = crearDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    });


})();




