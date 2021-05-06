// variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

evenListeners();
function evenListeners(){
    // cuando el usuario agrega un nuevo tweets
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    });
};

//funciones
function agregarTweet(e){
    e.preventDefault();

    const item = document.querySelector('#texArea').value;
    //validacion
    if (item === '') {
        mostrarError('Un mensaje no puede estar vacio');

        return;
    }
    const itemObj = {
        id: Date.now(),
        item
    };

    tweets = [...tweets,  itemObj];

    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contendio = document.querySelector('#contenido');
    contendio.appendChild(mensajeError);

    setTimeout(() =>{
        mensajeError.remove();
    }, 3000);
}

function crearHTML() {

    limpiarHTMl();

    if (tweets.length > 0) {
        tweets.forEach( item => {

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X';
        
            btnEliminar.onclick= () =>{
                borrarTweet();

            }


            // crear el HTML
            const li = document.createElement('li');
            li.innerHTML = item.item;

            li.appendChild(btnEliminar);
            

            // insertalos en el HTML
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
};

// Agrega los Tweets actuales a LocaleStorage

function sincronizarStorage () {
    localStorage.setItem('tweets' , JSON.stringify(tweets))
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

//limpiar HTML
function limpiarHTMl() {
    while ( listaTweets.firstChild ) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}