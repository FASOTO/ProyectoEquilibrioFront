import { ElementRef } from "@angular/core";
import { Odontograma } from "./odontograma";

export class OdontogramaChico extends Odontograma {

    constructor(estructura: ElementRef, sombreado: ElementRef, pinta: ElementRef, contenedor:ElementRef) {
        super(estructura, sombreado, pinta, contenedor);

        this.numerosPrimeros = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
        this.numerosSegundo=[85, 84, 83, 82, 81, 71, 72, 73, 74, 75];
    }

    override establecerConjunto(numero: number): boolean {
        return numero > 50
    }
}
