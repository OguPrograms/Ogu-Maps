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

    afegirPunt(lat, lon, nom, direccio, puntuacio) {
        const marker = L.marker([lat, lon]).addTo(this.map);
        if (nom || direccio || puntuacio) {
            const popupContent = `
                <strong>${nom}</strong>
                <p>${direccio}</p>
                <p>Puntuación: ${puntuacio}</p>`;
            marker.bindPopup(popupContent);
        }
        this.markers.push(marker);
    }
}