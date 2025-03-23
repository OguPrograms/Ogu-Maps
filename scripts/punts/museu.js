class Museu extends PuntInteres {
    constructor(id, pais, codi, ciutat, tipus, nom, direccio, latitud, longitud, puntuacio, esManual, horaris, preu, moneda) {

        super(id, pais, codi, ciutat, tipus, nom, direccio, latitud, longitud, puntuacio, esManual);

        this.horaris = horaris;
        this.preu = preu;
        this.moneda = moneda;
    }

    get preuIva() {
        if (this.preu === 0) {
            return "Entrada gratuïta";
        }
        const iva = IVA[this.pais] || 1;
        const preuFinal = this.preu * iva;
        return `${preuFinal.toFixed(2)}${this.moneda} ${iva > 1 ? "(IVA)" : "(no IVA)"}`;
    }
}
