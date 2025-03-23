class PuntInteres {
    static totalTasques = 0;

    #id;
    #esManual;

    pais;
    codi;
    ciutat;
    nom;
    direccio;
    tipus;
    latitud;
    longitud;
    puntuacio;
    constructor(id, pais, codi, ciutat, tipus, nom, direccio, latitud, longitud, puntuacio, esManual) {
        this.#id = id;
        this.pais = pais;
        this.codi = codi;
        this.ciutat = ciutat;
        this.tipus = tipus;
        this.nom = nom;
        this.direccio = direccio;
        this.latitud = latitud;
        this.longitud = longitud;
        this.puntuacio = puntuacio;
        this.#esManual = esManual;
        PuntInteres.totalTasques++;
    }

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get esManual() {
        return this.#esManual;
    }
    set esManual(value) {
        this.#esManual = value;
    }

    static obtenirTotalElements() {
        return PuntInteres.totalTasques;
    }
}