class puntInteres{
    static totalElements = 0;
    #id
    #esManual;

    constructor(id, pais, ciutat, nom, ){
        this.#id = puntInteres.totalElements++;
        this.pais = pais;
        this.ciutat = ciutat;
        this.nom = nom;
    }
}

class atraccio extends puntInteres{
    horaris;
    preus;
    constructor(id, pais, codi){
        super(id, pais, codi);
        this.horaris = [];
        this.preus = [];
    }
}