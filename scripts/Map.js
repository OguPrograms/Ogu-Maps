class Map{
    constructor(){

        let map = L.map('map').setView(mapCenter, zoomLevel); // Es crea el mapa centrat a BCN, si troba on esta ubicat el usuari cambiara aquesta ubicació

        const tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: '&copy; OpenStreetMap contributors' }); tileLayer.addTo(map); 
        tileLayer.addTo(map)

        // GET ACTUAL POSITION BY IP
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;

                L.circle([lat, lng], {
                    color: '#9e9e9ebb',
                    fillColor: '#9e9e9e',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(map)
                    .bindPopup("Estás aquí").openPopup();

                map.setView([lat, lng], zoomLevel);
            }, function (error) {
                console.error("Error en la geolocalización:", error);
            });
        } else {
            console.error("La geolocalizació no está disponible en aquest navegador.");
        }

        this.markers = [];
    }

    borrarPunts(){
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
    }

    mostrarPunt(lat, lon, desc = "") {
        const marker = L.marker([lat, lon]).addTo(this.map);
        if (desc) {
            marker.bindPopup(desc);
        }
        this.markers.push(marker);
    }
}