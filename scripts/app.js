const dropZone = document.querySelector('.dropzone');

let puntInteres = [];
let numId = 0;

// const markerPosition = [41.388120917759146, 2.1148382385196327];
// const marker = L.marker(markerPosition).addTo(map);
// const popupText = "This is a marker in Barcelona!";
// marker.bindPopup(popupText).openPopup();

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
    dropZone.style.maxHeight = '20%';
    loadFile(files);
});

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
        getInfoCountry();
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
                const espaiObj = new PuntInteres(numId, dades[PAIS], dades[CODI], );
                puntInteres.push(espaiObj);
                pintaEspai(espaiObj);
            break;
            case 'museu':
                const museuObj = new Museu(numId, dades[PAIS], dades[CODI]);
                puntInteres.push(museuObj);
                pintaMuseu(museuObj);
            break;
            case 'atraccio':
                console.log(dades)
                console.log(dades[LATITUD])
                const atraccioObj = new Atraccio(numId, dades[PAIS], dades[CODI], dades[CIUTAT], dades[TIPUS], dades[NOM], dades[DIRECCIO], dades[LATITUD], dades[LONGITUD], dades[HORARIS], dades[PREUS], dades[DESCRIPCIO], dades[PUNTUACIO], dades[MONEDA]);
                puntInteres.push(atraccioObj);
                pintaAtraccio(atraccioObj)
            break;
            default:
                throw new Error('Error en el tipus del/s punt/s d\'interes');
        }

    });

    getInfoCountry();
    console.log(puntInteres);

}

const getInfoCountry = async function(){

    codi = puntInteres[1].codi
    ciutat = puntInteres[1].ciutat

    console.log(puntInteres)

    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${codi}`);

        const data = await response.json();

        console.log(data)
        const bandera = data[0].flags.svg;

        console.log(bandera)

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


const pintaEspai = function(espai){
    const element = document.createElement('div');
    element.classList.add('punt-interes');
    element.innerHTML = `${espai.nom}`;
    document.querySelector('.content').appendChild(element);
    // map.afegirPunt(espai.latitud, espai.longitud, espai.nom, espai.direccio, espai.puntuacio)
}

const pintaMuseu = function(museu){
    const element = document.createElement('div');
    element.classList.add('punt-interes');
    element.innerHTML = `${museu.nom}`;
    document.querySelector('.content').appendChild(element);
    // map.afegirPunt(museu.latitud, museu.longitud, museu.nom, museu.direccio, museu.puntuacio)
}

const pintaAtraccio = function(atraccio){
    console.log(atraccio)
    const element = document.createElement('div');
    element.classList.add('punt-interes');
    element.innerHTML = `${atraccio.nom}`;
    document.querySelector('.content').appendChild(element);
    // map.afegirPunt(atraccio.latitud, atraccio.longitud, atraccio.nom, atraccio.direccio, atraccio.puntuacio)
}

const crearPuntInteres = function (fila){
    if (fila){

    }
}