import { ElementRef } from "@angular/core";
import { Odontograma } from "./odontograma";

export class OdontogramaLargo extends Odontograma {
    

    constructor(estructura: ElementRef, sombreado: ElementRef, pinta: ElementRef, contenedor:ElementRef) {
        super(estructura, sombreado, pinta, contenedor);

        this.numerosPrimeros = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
        this.numerosSegundo=[48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
    }
   
    override establecerConjunto(numero: number): boolean {
        return numero < 50
    }
}
