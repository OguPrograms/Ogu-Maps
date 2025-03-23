class Espais extends PuntInteres {
    constructor(pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, id, esManual, horaris, preu, moneda) {
        super(pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, id, esManual);
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
