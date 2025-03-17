const mapCenter = [41.3851, 2.1734]; // Coordinates for Barcelona, Spain 
const zoomLevel = 13; 

const dropZone = document.querySelector('.dropzone');

let map = L.map('map').setView(mapCenter, zoomLevel); 

const tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: '&copy; OpenStreetMap contributors' }); tileLayer.addTo(map); 
tileLayer.addTo(map)

let numId = 0;

// const markerPosition = [41.388120917759146, 2.1148382385196327];
// const marker = L.marker(markerPosition).addTo(map);
// const popupText = "This is a marker in Barcelona!";
// marker.bindPopup(popupText).openPopup();

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
    console.log(files);
    document.querySelector('.header').style.display = 'flex';
    document.querySelector('.footer').style.display = 'flex';
    document.querySelector('.content').style.display = 'flex';
    dropZone.style.maxHeight = '20%';
    loadFile(files);
});

const loadFile = function(files){
    if (files && files.length > 0){
        const file = files[0];
        const extension = file.name.split('.');
        if (extension[extension.length - 1].toLowerCase() === FILE_EXTENSION){
            console.log('CSV');
            hasData = true;
        } else {
            alert('Nomes accepta arxius CSV');
        }
    }
}

const readCSV = function(file){
    const reader = new FileReader();
    reader.onload = () => {
        fitxer = reader.result.trim().split('\n').slice(1);
        console.log(fitxer)
        console.log("startFitxer")
        loadData(fitxer);
        getInfoCountry();
    }
    reader.onerror = function(event){
        showMesage('Error al llegir el fitxer:', event.target.error);
    }
    reader.readAsText(file, "UTF-8");
}

const loadData = function(fitxer){
    console.log(fitxer);
    fitxer.forEach(lineaCSV => {

        numId ++;
        const dades = lineaCSV.split(CHAR_CSV);
        console.log(dades[TIPUS]);

        switch (dades[TIPUS].toLowerCase()){
            case 'espai':
                const espaiObj = new puntInteres(numId, dades[PAIS], dades[CODI]);
                puntInteres.push(espaiObj);
                console.log("aaa")
            break;
            case 'museu':
                const museuObj = new puntInteres(numId, dades[PAIS], dades[CODI]);
                puntInteres.push(museuObj);
                console.log("bbb")
            break;
            case 'atraccio':
                const atraccioObj = new puntInteres(numId, dades[PAIS], dades[CODI]);
                puntInteres.push(atraccioObj);
                console.log("ccc")
                break;
            default:
                throw new Error('Error en el tipus del/s punt/s d\'interes');
        }

    });

    console.log(puntInteres);

}

const getInfoCountry = async function(){
    const resposta = await fetch(ENDPOINT);

}


const pintaEspai = function(){
    const element = document.createElement('div');
    element.classList.add('punt-interes');
    element.innerHTML = `hola`;
    document.querySelector('.content').appendChild(element);
}

const pintaMuseu = function(){
    const element = document.createElement('div');
    element.classList.add('punt-interes');
    element.innerHTML = `hola`;
    document.querySelector('.content').appendChild(element);
}

const pintaAtraccio = function(){
    const element = document.createElement('div');
    element.classList.add('punt-interes');
    element.innerHTML = `hola`;
    document.querySelector('.content').appendChild(element);
}

const renderitzarLlista = function(llista){
    fitxer.forEach(obj => {

        switch (obj.tipus.toLowerCase()){
            case 'espai':
                pintaEspai(obj);
                break;
            case 'museu':
                pintaMuseu(obj);
                break;
            case 'atraccio':
                pintaAtraccio(obj);
                break;
            default:
                throw new Error('Error en el tipus del/s punt/s d\'interes');
        }

    });
}





const crearPuntInteres = function (fila){
    if (fila){

    }
}




// // Verifica si la geolocalización está disponible en el navegador
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         var lat = position.coords.latitude;
//         var lng = position.coords.longitude;


//         // Coloca un marcador en la ubicación actual del usuario
//         L.marker([lat, lng]).addTo(map)
//             .bindPopup("Estás aquí").openPopup();


//         // Centra el mapa en la ubicación actual
//         map.setView([lat, lng], 13);
//     }, function (error) {
//         console.error("Error en la geolocalización:", error);
//     });
// } else {
//     console.error("La geolocalización no está disponible en este navegador.");
// }
