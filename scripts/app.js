const dropZone = document.querySelector('.dropzone');
let tipeFilter = null;
let orderFilter = "normal";

let puntInteres = [];
let numId = 0;

const map = new Map();

// DROP ZONE LOGIC AND ANIMATIONS
dropZone.addEventListener('dragover', function(event){
    event.preventDefault();
    document.querySelector('.menu-wrapper').style.height = 'calc(100% - 30px)';
});

dropZone.addEventListener('dragleave', function(event){
    document.querySelector('.menu-wrapper').style.height = '20%';
});

dropZone.addEventListener('drop', function(event){
    event.preventDefault();
    files = event.dataTransfer.files;
    document.querySelector('.header').style.display = 'flex';
    document.querySelector('.footer').style.display = 'flex';
    document.querySelector('.content').style.display = 'flex';
    document.querySelector('.flags').style.display = 'flex';
    dropZone.style.maxHeight = '20%';
    loadFile(files);
});

//DELETE CSV LISTENER
reset.addEventListener('click', function(event){

    puntInteres = [];
    document.querySelector('.flags').style.display = 'none';
    document.querySelector('.header').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
    document.querySelector('.content').style.display = 'none';
    document.querySelector('.menu-wrapper').style.height = '20%';
    dropZone.style.maxHeight = '100%';

    resetItemsDisplayer();

});

const resetItemsDisplayer = function(){
    map.borrarPunts();

    document.querySelector('.content').innerHTML = '';
    document.querySelector('.country').innerHTML = '';
    document.querySelector('.city').innerHTML = '';
    document.querySelector('#total').innerHTML = '0';
}

// ON LOAD FILE
const loadFile = function(files){
    if (files && files.length > 0){
        const file = files[0];
        const extension = file.name.split('.');
        if (extension[extension.length - 1].toLowerCase() === FILE_EXTENSION){
            hasData = true;
            readCSV(file)
        } else {
            alert('Nomes accepta arxius CSV');
        }
    }
}

const readCSV = function(file){
    const reader = new FileReader();
    reader.onload = () => {
        fitxer = reader.result.trim().split('\n').slice(1);
        loadData(fitxer);
    }
    reader.onerror = function(event){
        showMesage('Error al llegir el fitxer:', event.target.error);
    }
    reader.readAsText(file, "UTF-8");
}

const loadData = function(fitxer){
    fitxer.forEach(lineaCSV => {

        const dades = lineaCSV.split(CHAR_CSV);
        numId ++;

        switch (dades[TIPUS].toLowerCase()){
            case 'espai':
                const espaiObj = new PuntInteres(numId, dades[PAIS], dades[CODI], dades[CIUTAT], dades[TIPUS], dades[NOM], dades[DIRECCIO], dades[LATITUD], dades[LONGITUD], dades[HORARIS], dades[PUNTUACIO]);
                puntInteres.push(espaiObj);
            break;
            case 'museu':
                const museuObj = new Museu(numId, dades[PAIS], dades[CODI], dades[CIUTAT], dades[TIPUS], dades[NOM], dades[DIRECCIO], dades[LATITUD], dades[LONGITUD], dades[HORARIS], dades[PREUS], dades[DESCRIPCIO], dades[PUNTUACIO], dades[MONEDA]);
                puntInteres.push(museuObj);
            break;
            case 'atraccio':
                const atraccioObj = new Atraccio(numId, dades[PAIS], dades[CODI], dades[CIUTAT], dades[TIPUS], dades[NOM], dades[DIRECCIO], dades[LATITUD], dades[LONGITUD], dades[HORARIS], dades[PREUS], dades[DESCRIPCIO], dades[PUNTUACIO], dades[MONEDA]);
                puntInteres.push(atraccioObj);
            break;
            default:
                throw new Error('Error en el tipus del/s punt/s d\'interes');
        }

    });
    
    puntInteres.sort((a, b) => a.nom.toLowerCase().localeCompare(b.nom.toLowerCase()));
    printItems();

    getInfoCountry();

}

const printItems = function(filter){
    const tipe = document.getElementById("tipe");

    let espai = false;
    let museu = false;
    let atraccio = false;

    if (filter == null){
        tipe.innerHTML = '<option value="all">Tots</option>';
    }

    puntInteres.forEach(punt => {

        switch (punt.tipus.toLowerCase()){
            case 'espai':
                if (filter == "espai" || filter == null) {
                    pintaEspai(punt);
                    // Nomes pinta el filtre si hi ha algun d'aquest tipus per filtrar
                    if (!espai && filter == null) {
                        tipe.innerHTML += '<option value="espai">Espai</option>';
                        espai = true;
                    }
                }
            break;
            case 'museu':
                if (filter == "museu" || filter == null) {
                    pintaMuseu(punt);
                    if (!museu && filter == null) {
                        tipe.innerHTML += '<option value="museu">Museu</option>';
                        museu = true;
                    }
                }
            break;
            case 'atraccio':
                if (filter == "atraccio" || filter == null) {
                    pintaAtraccio(punt);
                    if (!atraccio && filter == null) {
                        tipe.innerHTML += '<option value="atraccio">Atraccio</option>';
                        atraccio = true;
                    }
                }

            break;
            default:
                throw new Error('Error en el tipus del/s punt/s d\'interes');

        }

    });

}

const getInfoCountry = async function(){

    codi = puntInteres[1].codi;
    ciutat = puntInteres[1].ciutat;

    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${codi}`);

        const data = await response.json();

        const bandera = data[0].flags.svg;

        document.querySelector('.country').innerHTML = '';
        document.querySelector('.city').innerHTML = '';

        countTotalItems();

        const country = document.createElement('div');
        country.innerHTML = `Pais: <img src="${bandera}">`;
        document.querySelector('.country').appendChild(country);

        const city = document.createElement('div');
        city.innerHTML = `Ciutat: ${ciutat}`;
        document.querySelector('.city').appendChild(city);

    } catch (error) {
        console.error("Error en la consulta de la bandera:", error);
        return null;
    }

}

const countTotalItems = function() {
    total = puntInteres.length;
    document.querySelector('#total').innerHTML = total;
}

const pintaEspai = function(espai){
    const element = document.createElement('div');
    element.classList.add('espai');
    element.classList.add('punt-interes');
    element.innerHTML = `<div class="header-element">
                            <h1>${espai.nom}</h1>
                            <button class="button">
                                X
                            </button>
                        </div>
                        <p>${espai.ciutat} | Tipus: ${espai.tipus}`;
    document.querySelector('.content').appendChild(element);

    const button = element.querySelector('.button');
    const marker = map.afegirPunt(espai.latitud, espai.longitud, espai.nom, espai.direccio, espai.puntuacio);

    button.addEventListener('click', function() {
        map.borrarPunt(marker);
        element.remove();
        puntInteres.splice(puntInteres.indexOf(espai), 1);
        countTotalItems();
    });
}

const pintaMuseu = function(museu){
    const element = document.createElement('div');
    element.classList.add('museu');
    element.classList.add('punt-interes');
    element.innerHTML = `<div class="header-element">
                            <h1>${museu.nom}</h1>
                            <button class="button">
                                X
                            </button>
                        </div>
                        <p>${museu.ciutat} | Tipus: ${museu.tipus} | Horari: ${museu.horaris} | Preu: ${museu.preus}${museu.moneda} (IVA)`;
    document.querySelector('.content').appendChild(element);

    const button = element.querySelector('.button');
    const marker = map.afegirMuseu(museu.latitud, museu.longitud, museu.nom, museu.direccio, museu.puntuacio);

    button.addEventListener('click', function() {
        map.borrarPunt(marker);
        element.remove();
        puntInteres.splice(puntInteres.indexOf(museu), 1);
        countTotalItems();
    });
}

const pintaAtraccio = function(atraccio){
    const element = document.createElement('div');
    element.classList.add('atraccio');
    element.classList.add('punt-interes');
    element.innerHTML = `<div class="header-element">
                            <h1>${atraccio.nom}</h1>
                            <button class="button">
                                X
                            </button>
                        </div>
                        <p>${atraccio.ciutat} | Tipus: ${atraccio.tipus} | Horari: ${atraccio.horaris} | Preu: ${atraccio.preus}${atraccio.moneda} (IVA) | Dirreccio: ${atraccio.direccio}`;
    document.querySelector('.content').appendChild(element);

    const button = element.querySelector('.button');
    const marker = map.afegirAtracci(atraccio.latitud, atraccio.longitud, atraccio.nom, atraccio.direccio, atraccio.puntuacio);

    button.addEventListener('click', function() {
        map.borrarPunt(marker);
        element.remove();
        puntInteres.splice(puntInteres.indexOf(atraccio), 1);
        countTotalItems();
    });
}

// ORDER ITEMS
document.getElementById("order").addEventListener('change', function() {
    resetItemsDisplayer();

    const orden = this.value;

    if (orden === 'normal') {
        puntInteres.sort((a, b) => a.nom.toLowerCase().localeCompare(b.nom.toLowerCase()));
    } else if (orden === 'reverse') {
        puntInteres.sort((a, b) => b.nom.toLowerCase().localeCompare(a.nom.toLowerCase()));
    }

    printItems(tipeFilter);
    console.log(puntInteres)

});

// FILTER ITEMS PER TIPE
document.getElementById("tipe").addEventListener('change', function() {

    const tipe = this.value;
    resetItemsDisplayer();
    if (tipe == "all"){
        printItems();
    } else {
        printItems(tipe);
    }

    countTotalItems();

});

// FILTER ITEMS BY NAME
document.getElementById("filtre").addEventListener('input', function() {
    const filtro = this.value.toLowerCase();
    resetItemsDisplayer();

    const elementosFiltrados = puntInteres.filter(punt => punt.nom.toLowerCase().includes(filtro));

    elementosFiltrados.forEach(punt => {
        switch (punt.tipus.toLowerCase()) {
            case 'espai':
                pintaEspai(punt);
                break;
            case 'museu':
                pintaMuseu(punt);
                break;
            case 'atraccio':
                pintaAtraccio(punt);
                break;
        }
    });

    document.querySelector('#total').innerHTML = elementosFiltrados.length;
});