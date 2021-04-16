let inicio = document.getElementById('inicio');
let animacion = document.getElementById('animacion');
let resultados = document.getElementById('resultados');
let vista = document.getElementById('vista');
let carga = document.getElementById('carga');
let pantallaInicio = document.getElementById('pantallaInicio');
let pantallaCarga = document.getElementById('pantallaCarga');
let carta1 = document.getElementById('carta1');
let carta2 = document.getElementById('carta2');
let carta3 = document.getElementById('carta3');
let carta4 = document.getElementById('carta4');
let carta5 = document.getElementById('carta5');
let carta6 = document.getElementById('carta6');
let jugador1 = document.getElementById('jugador1');
let jugador2 = document.getElementById('jugador2');
let botonCarga = document.getElementById('botonCarga');
let cerrarResultados = document.getElementById('cerrarResultados');
let botonR = document.getElementById('botonR');
let botonNT = document.getElementById('botonNT');
let noGuardar = document.getElementById('noGuardar');
let guardar = document.getElementById('guardar');
let cont = 0;
let info = document.getElementsByClassName('info');
let cargaCartas = new Array(5);
let partidaGuardada = new Array(2000);
let cartasPlayer1 = [],
    cartasPlayer2 = [];
for (let j = 0; j < partidaGuardada.length; j++) {
    partidaGuardada[j] = new Array(7);
}
 //Array que uso para la animación
let imagenes = [
    'images/c0.jpg',
    'images/c1.jpg',
    'images/c2.jpg',
    'images/c3.jpg',
    'images/c4.jpg',
    'images/c5.jpg',
    'images/c6.jpg',
    'images/c7.jpg',
    'images/c8.jpg',
    'images/c9.jpg',
    'images/c10.jpg',
    'images/c11.jpg',
    'images/c12.jpg',
    'images/c13.jpg',
    'images/c14.jpg',
    'images/c15.jpg',
    'images/c16.jpg',
    'images/c17.jpg',
    'images/c18.jpg',
    'images/c19.jpg',
    'images/c20.jpg',
   'images/c21.jpg'
];

//Pantalla de inicio, empezando el juego
pantallaInicio.addEventListener('click', vuelvePantallaCarga);

function vuelvePantallaCarga(e) {
    if (e.target.getAttribute('class') == 'info') {
        i = e.target.getAttribute('id');
        pantallaCarga.innerHTML = ``;
        testeoInformacion(
            e.target.getAttribute('data-player1'),
            e.target.getAttribute('data-player2'),
            e.target.getAttribute('cartas-player1'),
            e.target.getAttribute('cartas-player2')
        );
        resultados.style.display = 'none';
        inicio.style.display = 'none';
        vista.style.display = 'none';
        carga.style.display = 'block';
    }
    if (e.target.getAttribute('class') == 'eliminar') {
        i = 'pEliminar' + e.target.getAttribute('id');
        let elimiar = document.getElementById('pEliminar' + e.target.getAttribute('id'));
        pantallaInicio.removeChild(elimiar);
    }
}

function irInicio() {
    let j1 = document.getElementById('jugador1').value;
    let j2 = document.getElementById('jugador2').value;
    if(j1=="" || j2==""){
        alert('Debes ingresar el nombre de ambos jugadores.');
        return false;
    }else if(j1.length<3 || j2.length<3){
        alert('El nombre debe contener mas de 3 letras.');
        return false;
    }else if(j1.length>15 || j2.length>15){
        alert('El nombre no puede contener mas de 15 letras.');
        return false;
    }else if (/^([0-9])*$/.test(j1)){
        alert("El valor debe ser una letra");
        document.getElementById("jugador1").focus();
        document.getElementById("jugador1").style.borderColor="red";
        return false; 
    }else if (/^([0-9])*$/.test(j2)){
        alert("El valor debe ser una letra");
        document.getElementById("jugador2").focus();
        document.getElementById("jugador2").style.borderColor="red";
        return false; 
    } else {
        inicio.style.display = 'none';
        resultados.style.display = 'none';
        vista.style.display = 'none';
        carga.style.display = 'none';
        macheando();
        //Vamos a animación
        animacion.style.display = 'block';
        let i=0;
        document.getElementById('imCar').src = imagenes[i];
        let interval=setInterval(() => rotarImagenes(++i), 136.4);
        //Aquí rotamos las imagenes 136.4ms parra llega a un total de 3000.8s que era lo pedido, me pase un chiquitín. 
        function rotarImagenes(i) {
            if (i==imagenes.length) {
                clearInterval(interval);
                animacion.style.display = 'none';
                resultados.style.display = 'block';
                return;
                
            }
            document.getElementById('imCar').src = imagenes[i];
        }
       
 
    }
}

botonCarga.addEventListener('click', irInicio);

//Nos lleva al resutado
cerrarResultados.addEventListener('click', irResultados);
function irResultados() {
    resultados.style.display = 'none';
    vista.style.display = 'block';
}

//Cargando los datos
botonNT.addEventListener('click', irInicio);

botonR.addEventListener('click', irCarga);

function irCarga() {
    console.log('hola');
    inicio.style.display = 'none';
    vista.style.display = 'none';
    pantallaCarga.innerHTML = ``;
    crearPantallaCarga(jugador1.value, jugador2.value, cargaCartas, cartas, pantallaCarga);
    carga.style.display = 'block';
}

//Guardando los datos para casa jugador

guardar.addEventListener('click', function () {
    let partida = document.createElement('partida');
    partida.id = 'pEliminar' + cont;
    partida.classList.add('partidaJugadas');
    pantallaInicio.appendChild(partida);
    crearPantallaCarga(jugador1.value, jugador2.value, cargaCartas, cartas, partida);
    let info2 = document.createElement('button');
    info2.classList.add('info');
    info2.id = cont;
    info2.setAttribute('data-player1', jugador1.value);
    info2.setAttribute('data-player2', jugador2.value);
    info2.setAttribute('cartas-player1', cartasPlayer1);
    info2.setAttribute('cartas-player2', cartasPlayer2);
    info2.appendChild(document.createTextNode('Información'));
    let eliminar = document.createElement('button');
    eliminar.classList.add('eliminar');
    eliminar.id = cont;
    eliminar.appendChild(document.createTextNode('Eliminar'));
    partida.append(info2, eliminar);
    volverInicio();

    partidaGuardada[cont][0] = cargaCartas[0];
    partidaGuardada[cont][1] = cargaCartas[1];
    partidaGuardada[cont][2] = cargaCartas[2];
    partidaGuardada[cont][3] = cargaCartas[3];
    partidaGuardada[cont][4] = cargaCartas[4];
    partidaGuardada[cont][5] = cargaCartas[5];
    cont++;
});

noGuardar.addEventListener('click', volverInicio);
function volverInicio() {
    jugador1.value = '';
    jugador2.value = '';
    carga.style.display = 'none';
    inicio.style.display = 'block';

    if (info !== undefined) {
        console.log('es diferente');
    }
}

//Cago  información para dar un detalle del juego guardado.
function testeoInformacion(jugador1, jugador2, cartasJugador1, cartasJugador2) {
    pantallaCarga.innerHTML = "";
    console.log(cartasJugador1);
    let cartasArrayJugador1 = cartasJugador1.split(','),
    cartasArrayJugador2 = cartasJugador2.split(',');
    console.log(cartasArrayJugador1);
    console.log(cartasArrayJugador2);
    let html = `
    <h1>Pantalla de Información</h1>
        <ul class="list-group">
        <li class="list-group-item">
        <h2>${jugador1}</h2>
        <img src="${cartasArrayJugador1[0]}">
        <img src="${cartasArrayJugador1[1]}">
        <img src="${cartasArrayJugador1[2]}">
        </li>
        <li class="list-group-item">
        <h2>${jugador2}</h2>
        <img src="${cartasArrayJugador2[0]}">
        <img src="${cartasArrayJugador2[1]}">
        <img src="${cartasArrayJugador2[2]}">
        </li>
    </ul>`;
    pantallaCarga.innerHTML = html;
    guardar.setAttribute('class', 'd-none');
}

//Creando la pantalla con los resultados
function crearPantallaCarga(jugador1, jugador2, cargaCartas, cartas, crearUl) {
    cartasPlayer1 = [];
    cartasPlayer2 = [];
    let ul = document.createElement('ul');
    ul.classList.add('list-group');
    let li1 = document.createElement('li');
    li1.classList.add('list-group-item');
    let h21 = document.createElement('h2');
    h21.appendChild(document.createTextNode(jugador1));
    let img1 = document.createElement('img');
    img1.src = cartas[cargaCartas[1]].imagen;
    let img2 = document.createElement('img');
    img2.src = cartas[cargaCartas[2]].imagen;
    let img3 = document.createElement('img');
    img3.src = cartas[cargaCartas[3]].imagen;
    li1.append(h21, img1, img2, img3);
    cartasPlayer1.push([
        cartas[cargaCartas[1]].imagen,
        cartas[cargaCartas[2]].imagen,
        cartas[cargaCartas[3]].imagen,
    ]);
    let li2 = document.createElement('li');
    li2.classList.add('list-group-item');
    let h22 = document.createElement('h2');
    h22.appendChild(document.createTextNode(jugador2));
    let img4 = document.createElement('img');
    img4.src = cartas[cargaCartas[4]].imagen;
    let img5 = document.createElement('img');
    img5.src = cartas[cargaCartas[5]].imagen;
    let img6 = document.createElement('img');
    img6.src = cartas[cargaCartas[6]].imagen;
    li2.append(h22, img4, img5, img6);
    cartasPlayer2.push([
        cartas[cargaCartas[4]].imagen,
        cartas[cargaCartas[5]].imagen,
        cartas[cargaCartas[6]].imagen,
    ]);

    ul.appendChild(li1);
    ul.appendChild(li2);

    let h11 = document.createElement('h1');
    let h12 = document.createElement('h1');
    h11.appendChild(document.createTextNode(jugador1 + ' y ' + jugador2));
    h12.appendChild(document.createTextNode(compatible(cargaCartas)));
    crearUl.append(ul, h11, h12);

    guardar.setAttribute('class', 'btn btn-secondary');
}

//Funcuón para ver la compatibilidad entre los jugadores
function compatible(cargaCartas) {
    let pJ = (cargaCartas[1] + cargaCartas[2] + cargaCartas[3]) % 2;
    let sJ = (cargaCartas[6] + cargaCartas[5] + cargaCartas[6]) % 2;
    if (pJ == 0 && sJ == 0) {
        return 'Son compatibles';
    } else {
        return ' No son compatibles';
    }
}

//Creando la clase y el array de las cartas
class Carta {
    constructor(nombre, imagen, descripcion, num) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.num = num;
        this.descripcion = descripcion;
    }

    get nombre() {
        return this._nombre;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    get imagen() {
        return this._imagen;
    }
    set imagen(imagen) {
        this._imagen = imagen;
    }
    get descripcion() {
        return this._descripcion;
    }
    set descripcion(descripcion) {
        this._descripcion = descripcion;
    }

    get num() {
        return this._num;
    }
    set num(num) {
        this._num = num;
    }
}

var cartas = new Array(22);
cartas[1] = new Carta(
    'El loco',
    'images/c0.jpg',
    'Carta muy poderosa de la baraja del Tarot que usualmente representa un nuevo comienzo.',
    '1'
);
cartas[2] = new Carta(
    'El mago',
    'images/c1.jpg',
    'Carta muy práctica, tu éxito en emprendimientos futuros en la política o los negocios dependerán de tu propia fuerza de voluntad y determinación.',
    '2'
);
cartas[3] = new Carta(
    'La Sacerdotisa',
    'images/c2.jpg',
    'Sugiere que posees buen juicio en la forma de una fuerte intuición. Puede estar indicando que tu cabeza debe confiar en la sabiduría de tu corazón.',
    '3'
);
cartas[4] = new Carta(
    'La Emperatriz',
    'images/c3.jpg',
    'Asociada con una fuerte influencia maternal, te trae excelentes noticias si estás buscando la armonía en tu matrimonio o esperar iniciar una familia.',
    '4'
);
cartas[5] = new Carta(
    'El Emperador',
    'images/c4.jpg',
    'Es la contraparte de la Emperatriz y simboliza una influencia poderosa, generalmente de naturaleza masculina. Puede incluir conceptos en tu vida como el liderazgo y autoridad, autodisciplina a través del poder de la acción.',
    '5'
);
cartas[6] = new Carta(
    'El papa',
    'images/c5.jpg',
    'Básicamente representa la doctrina, pero la doctrina puede venir en manera de enseñanza y guía o de una autoridad rígida. Dependiendo de tu propia naturaleza.',
    '6'
);
cartas[7] = new Carta(
    'Los Amantes',
    'images/c6.jpg',
    'Representante del amor, pero al igual que el amor ésta no posee una naturaleza simple. El amor no solo viene en formas diversas sino que los Amantes pueden indicar que se avecinan decisiones difíciles o importantes en tu vida.',
    '7'
);
cartas[8] = new Carta(
    'El carro de guerra',
    'images/c7.jpg',
    'Tienes trabajo arduo frente a ti. Se puede resolver rápidamente, pero El Carro es una carta fuerte y la labor a la que te estás comprometiendo probablemente sea larga y difícil.',
    '8'
);
cartas[9] = new Carta(
    'Justicia',
    'images/c8.jpg',
    'Es muy bueno encontrar esta carta en tu tirada si has actuado con bondad y equidad respecto a los demás, especialmente si has sido una víctima. Es un indicador importante de una resolución positiva,',
    '9'
);
cartas[10] = new Carta(
    'El Ermitaño',
    'images/c9.jpg',
    'Hay momentos en la vida en que uno debe dar un paso atrás y examinar cuidadosamente las situaciones y decisiones que toma. El encontrar al Ermitaño en tu turada sugiere que este momento ha llegado para ti.',
    '10'
);
cartas[11] = new Carta(
    'La rueda de la fortuna',
    'images/c10.jpg',
    'Simboliza los ciclos de la vida y habla de nuevos inicios. Es muy probable que encuentres que estos eventos sean positivos, pero al ser regidos por la suerte, puede que estén fuera de tu control e influencia.',
    '11'
);
cartas[12] = new Carta(
    'Fuerza',
    'images/c11.jpg',
    'Es la forma más básica de poder y tú la posees de alguna manera. Esta es una carta muy feliz si te encuentras luchando contra una enfermedad o recuperándote de alguna lesión.',
    '12'
);
cartas[13] = new Carta(
    'El colgado',
    'images/c12.jpg',
    'Todo cambio es a su vez una pequeña muerte, ya que lo viejo debe morir para crear lo nuevo. Puede indicar un cambio en tu futuro que tal vez esté más allá de tu control, y que será una decisión de la cual no podrás retractarte.',
    '13'
);
cartas[14] = new Carta(
    'Muerte',
    'images/c13.jpg',
    'Indica cambios en tu futuro. Este cambio se puede dar en casi cualquier aspecto de tu vida, pero de seguro será permanente, significativo y absoluto.',
    '14'
);
cartas[15] = new Carta(
    'Templanza',
    'images/c14.jpg',
    'Es una carta optimista que te anima a encontrar un equilibrio en tu vida y abordar los problemas con una actitud calmada.',
    '15'
);
cartas[16] = new Carta(
    'El diablo',
    'images/c15.jpg',
    'Está en el negocio de la trampa. Señala que hay una situación de la cual no hay escapatoria, o un camino que conduce a ésta. El aviso puede permitirte evitar la trampa, o tal vez no.',
    '16'
);
cartas[17] = new Carta(
    'La torre',
    'images/c16.jpg',
    'Oscura y amenazante, es la encarnación de la complicación y el conflicto. No solo el cambio, sino el movimiento brusco y desagradable causado por los acontecimientos imprevistos y traumáticos que forman parte de la vida.',
    '17'
);
cartas[18] = new Carta(
    'La estrella',
    'images/c17.jpg',
    'La presencia de la Estrella significa un periodo de descanso y renovación para ti. Esta renovación puede ser spiritual, física o ambas.',
    '18'
);
cartas[19] = new Carta(
    'La luna',
    'images/c18.jpg',
    'Algo en tu vida no es lo que parece. Tal vez hay algo que no has comprendido bien o hay una verdad que te rehúsas a aceptar.',
    '19'
);
cartas[20] = new Carta(
    'El sol',
    'images/c19.jpg',
    'Representa un desarrollo positivo y tiene una Buena influencia inherente. Sugiere ganancia personal y alegría, y que las metas personales están al alcance de tus manos si estás dispuesto a esforzarte por ellas.',
    '20'
);
cartas[21] = new Carta(
    'Juicio',
    'images/c20.jpg',
    'Habla sobre una transición, pero a diferencia de la Muerte o la Torre, el cambio no es súbito, ni procede de la suerte o la intuición, sino que es un cambio que proviene de la razón.',
    '21'
);
cartas[22] = new Carta(
    'El mundo',
    'images/c21.jpg',
    'Indicador de un cambio importante e inexorable, de amplitud tectónica. Este cambio representa una oportunidad para tu para terminar con lo Viejo y darle un buen inicio a lo Nuevo. ',
    '22'
);

//Creando el detalle de los resultados
function aCarta(num, cartaN, jugador, imagenCarta) {
    let titulo = document.createElement('h2');
    titulo.appendChild(document.createTextNode(jugador.value + ' ' + imagenCarta + '/3'));
    cartaN.appendChild(titulo);
    let divCard = document.createElement('div');
    divCard.classList.add('divCard');
    let imagen = document.createElement('img');
    imagen.src = cartas[num].imagen;
    divCard.appendChild(imagen);
    let nom = document.createElement('h3');
    nom.appendChild(document.createTextNode(cartas[num].nombre));
    divCard.appendChild(nom);
    let descripcion = document.createElement('p');
    descripcion.appendChild(document.createTextNode(cartas[num].descripcion));
    divCard.appendChild(descripcion);
    cartaN.appendChild(divCard);
}

//Asignando cartas a cada jugador
function macheando() {
    carta1.innerHTML = ``;
    carta2.innerHTML = ``;
    carta3.innerHTML = ``;
    carta4.innerHTML = ``;
    carta5.innerHTML = ``;
    carta6.innerHTML = ``;
    cargaCartas[1] = cargaCartas[2];
    while (
        cargaCartas[1] == cargaCartas[2] ||
        cargaCartas[2] == cargaCartas[3] ||
        cargaCartas[1] == cargaCartas[3]
    ) {
        cargaCartas[1] = Math.floor(Math.random() * (22 - 1)) + 1;
        cargaCartas[2] = Math.floor(Math.random() * (22 - 1)) + 1;
        cargaCartas[3] = Math.floor(Math.random() * (22 - 1)) + 1;
    }
    cargaCartas[4] = cargaCartas[5];
    while (
        cargaCartas[4] == cargaCartas[5] ||
        cargaCartas[5] == cargaCartas[6] ||
        cargaCartas[4] == cargaCartas[6]
    ) {
        cargaCartas[4] = Math.floor(Math.random() * (22 - 1)) + 1;
        cargaCartas[5] = Math.floor(Math.random() * (22 - 1)) + 1;
        cargaCartas[6] = Math.floor(Math.random() * (22 - 1)) + 1;
    }
    aCarta(cargaCartas[1], carta1, jugador1, 1);
    aCarta(cargaCartas[2], carta2, jugador1, 2);
    aCarta(cargaCartas[3], carta3, jugador1, 3);

    aCarta(cargaCartas[4], carta4, jugador2, 1);
    aCarta(cargaCartas[5], carta5, jugador2, 2);
    aCarta(cargaCartas[6], carta6, jugador2, 3);
}
