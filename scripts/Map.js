const xinxetaAtraccio = L.icon({
    iconUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FF0000AA">
        <path d="m233-80 54-122q-14-11-27-21.5T235-246q-8 3-15.5 4.5T203-240q-33 0-56.5-23.5T123-320q0-20 8.5-36.5T155-384q-8-23-11-46.5t-3-49.5q0-26 3-49.5t11-46.5q-15-11-23.5-27.5T123-640q0-33 23.5-56.5T203-720q9 0 16.5 1.5T235-714q33-36 75.5-60t90.5-36q5-30 27.5-50t52.5-20q30 0 52.5 20.5T561-810q48 12 90.5 35.5T727-716q8-3 15-4.5t15-1.5q33 0 56.5 23.5T837-642q0 20-8 35.5T807-580q8 24 11 49t3 51q0 26-3 50.5T807-382q14 11 22 26.5t8 35.5q0 33-23.5 56.5T757-240q-8 0-15-1.5t-15-4.5q-12 12-24.5 23.5T675-200l52 120h-74l-38-88q-14 6-27 10.5t-27 7.5q-5 29-27.5 49.5T481-80q-30 0-52.5-20T401-150q-15-3-28.5-7.5T345-168l-38 88h-74Zm76-174 62-140q-14-18-22-40t-8-46q0-57 41.5-98.5T481-620q57 0 98.5 41.5T621-480q0 24-8.5 47T589-392l62 138q9-8 17.5-14.5T685-284q-5-8-6.5-17.5T677-320q0-32 22-55t54-25q6-20 9-39.5t3-40.5q0-21-3-41.5t-9-40.5q-32-2-54-25t-22-55q0-9 2.5-17.5T685-676q-29-29-64-49t-74-31q-11 17-28 26.5t-38 9.5q-21 0-38-9.5T415-756q-41 11-76 31.5T275-674q3 8 5.5 16.5T283-640q0 32-21 54.5T209-560q-6 20-9 39.5t-3 40.5q0 21 3 40.5t9 39.5q32 2 53 25t21 55q0 9-1.5 17.5T275-286q8 9 16.5 16.5T309-254Zm60 34q11 5 22.5 9t23.5 7q11-17 28-26.5t38-9.5q21 0 38 9.5t28 26.5q12-3 22.5-7t21.5-9l-58-130q-12 5-25 7.5t-27 2.5q-15 0-28.5-3t-25.5-9l-58 132Zm112-200q24 0 42-17t18-43q0-24-18-42t-42-18q-26 0-43 18t-17 42q0 26 17 43t43 17Zm0-60Z"/>
    </svg>`),
    iconSize: [48, 48],
});

const xinxetaMuseu = L.icon({
    iconUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#3CFF00AA">
        <path d="M80-80v-80h80v-360H80v-80l400-280 400 280v80h-80v360h80v80H80Zm160-80h480-480Zm80-80h80v-160l80 120 80-120v160h80v-280h-80l-80 120-80-120h-80v280Zm400 80v-454L480-782 240-614v454h480Z"/>
    </svg>`),
    iconSize: [48, 48],
});

const xinxetaEspai = L.icon({
    iconUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFF00AA">
        <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
    </svg>`),
    iconSize: [48, 48],
});

class Map {
    constructor() {
        this.map = L.map('map').setView(mapCenter, zoomLevel); // Es crea el mapa centrat a BCN

        const tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { 
            attribution: '&copy; OpenStreetMap contributors' 
        });
        tileLayer.addTo(this.map);

        // GET ACTUAL POSITION BY IP
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                L.circle([lat, lng], {
                    color: '#9e9e9ebb',
                    fillColor: '#9e9e9e',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(this.map)
                    .bindPopup("Estás aquí").openPopup();

                this.map.setView([lat, lng], zoomLevel);
            }, (error) => {
                console.error("Error en la geolocalización:", error);
            });
        } else {
            console.error("La geolocalizació no está disponible en aquest navegador.");
        }

        this.markers = [];
    }

    borrarPunts() {
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
    }

    borrarPunt(marker) {
        this.map.removeLayer(marker);
        this.markers = this.markers.filter(m => m !== marker);
    }

    afegirPunt(lat, lon, nom, direccio, puntuacio) {
        const marker = L.marker([lat, lon], { icon: xinxetaEspai }).addTo(this.map);
        if (nom || direccio || puntuacio) {
            const popupContent = `
                <strong>${nom}</strong>
                <p>${direccio}</p>
                <p>Puntuación: ${puntuacio}</p>`;
            marker.bindPopup(popupContent);
        }
        this.markers.push(marker);
        return marker;
    }

    afegirAtracci(lat, lon, nom, direccio, puntuacio) {
        const marker = L.marker([lat, lon], { icon: xinxetaAtraccio }).addTo(this.map);
        if (nom || direccio || puntuacio) {
            const popupContent = `
                <strong>${nom}</strong>
                <p>${direccio}</p>
                <p>Puntuación: ${puntuacio}</p>`;
            marker.bindPopup(popupContent);
        }
        this.markers.push(marker);
        return marker;
    }

    afegirMuseu(lat, lon, nom, direccio, puntuacio) {
        const marker = L.marker([lat, lon], { icon: xinxetaMuseu }).addTo(this.map);
        if (nom || direccio || puntuacio) {
            const popupContent = `
                <strong>${nom}</strong>
                <p>${direccio}</p>
                <p>Puntuación: ${puntuacio}</p>`;
            marker.bindPopup(popupContent);
        }
        this.markers.push(marker);
        return marker;
    }
}