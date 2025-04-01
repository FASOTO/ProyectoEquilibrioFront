import { ElementRef } from "@angular/core";
import { Procedimiento } from "./procedimiento";

export abstract class Odontograma {
    private lienzoEstructura: HTMLCanvasElement;
    private lienzoSombreado: HTMLCanvasElement;
    private lienzoPinta: HTMLCanvasElement;

    private contextoEstructura: CanvasRenderingContext2D;
    private contextoSombreado: CanvasRenderingContext2D
    private contextoPinta: CanvasRenderingContext2D

    private contenedor: HTMLDivElement;
    protected numerosPrimeros: number[] = []
    protected numerosSegundo: number[] = []

    private posEstandar = {
        margenXEntreDientes: 0,
        posicionYDienteInicial: 0,
        margenYEntreDientes: 0
    }
    private anchoColumna: number = 0
    private anchoDiente: number = 0

    private dimensionesTrapecio = {
        baseMayor: 0,
        lateral: 0,
        baseMenor: 0
    }
    private listaProcedimientos: Procedimiento[] = []

    private procSel = {
        numeroDiente: 0,
        caraDiente: 0,
        color: '',
        tipoProcedimiento: '',
        indice: 0,
        posX: 0,
        posY: 0
    }
    private colorRojo: string = '#F50B0B'
    private colorAzul: string = '#0073BB'

    private imagen = new Image();

    constructor(estructura: ElementRef, sombreado: ElementRef, pinta: ElementRef, contenedor: ElementRef) {
        this.lienzoEstructura = estructura.nativeElement;
        this.lienzoSombreado = sombreado.nativeElement;
        this.lienzoPinta = pinta.nativeElement;
        this.contenedor = contenedor.nativeElement
        this.contextoEstructura = this.lienzoEstructura.getContext('2d') as CanvasRenderingContext2D
        this.contextoSombreado = this.lienzoSombreado.getContext('2d') as CanvasRenderingContext2D
        this.contextoPinta = this.lienzoPinta.getContext('2d') as CanvasRenderingContext2D
        this.imagen.src = 'icon/18.png';
    }

    private limpiarDienteSeleccionado() {
        this.procSel.numeroDiente = 0;
        this.procSel.caraDiente = -1;
        this.procSel.color = '';
        this.procSel.tipoProcedimiento = '';
        this.procSel.indice = -1;
        this.procSel.posX = 0;
        this.procSel.posY = 0;
    }

    dibujarEstructura = (medida: number) => {
        this.lienzoEstructura.width = this.lienzoSombreado.width = this.lienzoPinta.width = this.contenedor.clientWidth - 20
        this.lienzoEstructura.height = this.lienzoSombreado.height = this.lienzoPinta.height = this.contenedor.clientHeight

        this.posEstandar.margenXEntreDientes = (medida * 8) / 1895
        this.posEstandar.posicionYDienteInicial = this.contenedor.clientHeight / 8
        this.posEstandar.margenYEntreDientes = (medida * 200) / 1900

        this.anchoColumna = medida / 16
        this.anchoDiente = this.anchoColumna - (2 * this.posEstandar.margenXEntreDientes)

        this.dimensionesTrapecio.baseMayor = this.anchoDiente
        this.dimensionesTrapecio.lateral = this.anchoDiente / 4
        this.dimensionesTrapecio.baseMenor = (this.anchoDiente / 4) * 3

        let posX;
        for (let index = 0; index < this.numerosPrimeros.length; index++) {
            if (index === 0) posX = this.posEstandar.margenXEntreDientes;
            else posX = (index * this.anchoDiente) + (2 * this.posEstandar.margenXEntreDientes * index) + this.posEstandar.margenXEntreDientes;
            this.dibujarDiente(posX, this.posEstandar.posicionYDienteInicial)
            this.dibujarDiente(posX, this.posEstandar.posicionYDienteInicial + this.posEstandar.margenYEntreDientes + this.anchoDiente)
        }

        let posYLetras1 = (this.posEstandar.margenYEntreDientes / 4) + this.anchoDiente + this.posEstandar.posicionYDienteInicial
        let posYLetras2 = posYLetras1 + (this.anchoDiente / 2)

        this.dibujarNumeros(this.numerosPrimeros, posYLetras1)
        this.dibujarNumeros(this.numerosSegundo, posYLetras2)

        this.dibujarProcedimientosExistentes();
    }

    private dibujarDiente = (posicionX: number, posicionY: number) => {
        this.contextoEstructura.strokeStyle = 'black';

        this.contextoEstructura.beginPath();
        this.contextoEstructura.moveTo(posicionX, posicionY);
        this.contextoEstructura.lineTo(this.dimensionesTrapecio.baseMayor + posicionX, posicionY);
        this.contextoEstructura.lineTo(this.dimensionesTrapecio.baseMenor + posicionX, this.dimensionesTrapecio.lateral + posicionY);
        this.contextoEstructura.lineTo(this.dimensionesTrapecio.lateral + posicionX, this.dimensionesTrapecio.lateral + posicionY);
        this.contextoEstructura.closePath();
        this.contextoEstructura.stroke();

        this.contextoEstructura.beginPath();
        this.contextoEstructura.moveTo(this.dimensionesTrapecio.baseMenor + posicionX, this.dimensionesTrapecio.lateral + posicionY);
        this.contextoEstructura.lineTo(this.dimensionesTrapecio.baseMayor + posicionX, posicionY);
        this.contextoEstructura.lineTo(this.dimensionesTrapecio.baseMayor + posicionX, this.dimensionesTrapecio.baseMayor + posicionY);
        this.contextoEstructura.lineTo(this.dimensionesTrapecio.baseMenor + posicionX, this.dimensionesTrapecio.baseMenor + posicionY);
        this.contextoEstructura.closePath();
        this.contextoEstructura.stroke();

        this.contextoEstructura.beginPath();
        this.contextoEstructura.moveTo(this.dimensionesTrapecio.lateral + posicionX, this.dimensionesTrapecio.baseMenor + posicionY);
        this.contextoEstructura.lineTo(this.dimensionesTrapecio.baseMenor + posicionX, this.dimensionesTrapecio.baseMenor + posicionY);
        this.contextoEstructura.lineTo(this.dimensionesTrapecio.baseMayor + posicionX, this.dimensionesTrapecio.baseMayor + posicionY);
        this.contextoEstructura.lineTo(posicionX, this.dimensionesTrapecio.baseMayor + posicionY);
        this.contextoEstructura.closePath();
        this.contextoEstructura.stroke();

        this.contextoEstructura.beginPath();
        this.contextoEstructura.moveTo(posicionX, posicionY);
        this.contextoEstructura.lineTo(this.dimensionesTrapecio.lateral + posicionX, this.dimensionesTrapecio.lateral + posicionY);
        this.contextoEstructura.lineTo(this.dimensionesTrapecio.lateral + posicionX, this.dimensionesTrapecio.baseMenor + posicionY);
        this.contextoEstructura.lineTo(posicionX, this.dimensionesTrapecio.baseMayor + posicionY);
        this.contextoEstructura.closePath();
        this.contextoEstructura.stroke();
    }

    private dibujarNumeros = (numeros: number[], posY: number) => {
        let posX;
        let tamanoFuente;
        let alto = this.anchoDiente / 2;
        let largo!: number
        numeros.forEach((numero, index) => {
            if (index === 0) posX = (index * this.anchoDiente) + this.posEstandar.margenXEntreDientes;
            else posX = (index * this.anchoDiente) + (2 * index * this.posEstandar.margenXEntreDientes);

            largo = index === 0 || index === numeros.length - 1 ? this.anchoDiente + this.posEstandar.margenXEntreDientes : this.anchoDiente + 2 * this.posEstandar.margenXEntreDientes

            tamanoFuente = largo / 3
            this.contextoEstructura.font = `${tamanoFuente}px arial`
            this.contextoEstructura.strokeRect(posX, posY, largo, alto)
            this.contextoEstructura.fillText(numero.toString(), posX + this.anchoDiente / 2.8, posY + (this.anchoDiente / 2.5));
        })
    }

    public mouseMoveEvent(event: MouseEvent) {

        this.limpiarDienteSeleccionado();
        this.establecerDienteSeleccionado(event.x - this.lienzoEstructura.offsetLeft, event.y - this.lienzoEstructura.offsetTop)

        if (this.procSel.numeroDiente > 0) {
            this.establecerCaraDiente(event.x - this.lienzoEstructura.offsetLeft, event.y - this.lienzoEstructura.offsetTop)
            if (this.procSel.caraDiente > 0) {
                this.contextoSombreado.clearRect(0, 0, this.lienzoEstructura.width, this.lienzoEstructura.height)
                this.establecerPosiciones()
                this.contextoSombreado.lineWidth = 2
                this.contextoSombreado.fillStyle = '#fff'//relleno blanco
                // COLOR DE SOMBREADO
                this.contextoSombreado.strokeStyle = '#0B80CA';
                this.contextoSombreado.lineJoin = 'bevel'
                this.pintar(this.contextoSombreado)
            }//else this.contextoSombreado.clearRect(0, 0, this.lienzoEstructura.width, this.lienzoEstructura.height)
        } else this.contextoSombreado.clearRect(0, 0, this.lienzoEstructura.width, this.lienzoEstructura.height)
    }

    public mouseClick(event: MouseEvent, seleccion: string, color: string) {
        this.limpiarDienteSeleccionado();
        this.establecerDienteSeleccionado(event.x - this.lienzoEstructura.offsetLeft, event.y - this.lienzoEstructura.offsetTop)
        if (this.procSel.numeroDiente > 0) {
            seleccion == 'pintarRelleno' ? this.establecerCaraDiente(event.x - this.lienzoEstructura.offsetLeft, event.y - this.lienzoEstructura.offsetTop) : this.procSel.caraDiente = 6
            if (this.procSel.caraDiente > 0) {
                this.establecerPosiciones()
                color == 'rojo' ? this.procSel.color = this.colorRojo : this.procSel.color = this.colorAzul
                this.procSel.tipoProcedimiento = seleccion
                if (this.guardarDiente()) {
                    this.dibujarProcedimiento(seleccion)
                }
                else {
                    this.contextoPinta.clearRect(0, 0, this.lienzoEstructura.width, this.lienzoEstructura.height)
                    this.dibujarProcedimientosExistentes();
                }
            }
        }
    }

    private establecerDienteSeleccionado(x: number, y: number) {
        let ini, fin
        if (y >= this.posEstandar.posicionYDienteInicial && y <= this.posEstandar.posicionYDienteInicial + this.anchoDiente) {
            if (x >= this.posEstandar.margenXEntreDientes && x <= this.posEstandar.margenXEntreDientes + this.anchoDiente) {
                this.procSel.indice = 0;
                this.procSel.numeroDiente = this.numerosPrimeros.at(0) as number;
            }
            // cambie por 2, estaba por 3
            else if (x >= (this.anchoDiente + this.posEstandar.margenXEntreDientes * 2) && x <= (30 * this.posEstandar.margenXEntreDientes + 16 * this.anchoDiente)) {
                this.procSel.indice = Math.trunc(x / (this.anchoDiente + 2 * this.posEstandar.margenXEntreDientes));
                ini = (this.procSel.indice * this.anchoDiente) + (2 * this.posEstandar.margenXEntreDientes * this.procSel.indice) + this.posEstandar.margenXEntreDientes;
                fin = ini + this.anchoDiente;
                if (x >= ini && x <= fin) {
                    this.procSel.numeroDiente = this.numerosPrimeros.at(this.procSel.indice) as number;
                }
            }
        }
        else if (y >= (this.anchoDiente + this.posEstandar.margenYEntreDientes + this.posEstandar.posicionYDienteInicial) && y <= (2 * this.anchoDiente + this.posEstandar.margenYEntreDientes
            + this.posEstandar.posicionYDienteInicial)) {
            if (x >= this.posEstandar.margenXEntreDientes && x <= this.posEstandar.margenXEntreDientes + this.anchoDiente) {
                this.procSel.indice = 0;
                this.procSel.numeroDiente = this.numerosSegundo.at(0) as number;
            } else if (x >= (this.anchoDiente + this.posEstandar.margenXEntreDientes * 3) && x <= (30 * this.posEstandar.margenXEntreDientes + 16 * this.anchoDiente)) {
                this.procSel.indice = Math.trunc(x / (this.anchoDiente + 2 * this.posEstandar.margenXEntreDientes));
                ini = (this.procSel.indice * this.anchoDiente) + (2 * this.posEstandar.margenXEntreDientes * this.procSel.indice) + this.posEstandar.margenXEntreDientes;
                fin = ini + this.anchoDiente;
                if (x >= ini && x <= fin) {
                    this.procSel.numeroDiente = this.numerosSegundo.at(this.procSel.indice) as number;
                }
            }
        }
    }

    private establecerCaraDiente(x: number, y: number) {
        let px = x - ((this.procSel.indice * this.anchoDiente) + (2 * this.posEstandar.margenXEntreDientes * this.procSel.indice) + this.posEstandar.margenXEntreDientes)
        let py = y - this.posEstandar.posicionYDienteInicial

        if (this.numerosSegundo.indexOf(this.procSel.numeroDiente) >= 0)
            py -= (this.posEstandar.margenYEntreDientes + this.anchoDiente)

        if (py > 0 && py < (this.anchoDiente / 4) && px > py && py < this.anchoDiente - px) {
            this.procSel.caraDiente = 1;
        } else if (px > (this.anchoDiente / 4) * 3 && px < this.anchoDiente && py < px && this.anchoDiente - px < py) {
            this.procSel.caraDiente = 2;
        } else if (py > (this.anchoDiente / 4) * 3 && py < this.anchoDiente && px < py && px > this.anchoDiente - py) {
            this.procSel.caraDiente = 3;
        } else if (px > 0 && px < (this.anchoDiente / 4) && py > px && px < this.anchoDiente - py) {
            this.procSel.caraDiente = 4;
        } else if (px > (this.anchoDiente / 4) && px < (this.anchoDiente / 4) * 3 && py > (this.anchoDiente / 4) && py < (this.anchoDiente / 4) * 3) {
            this.procSel.caraDiente = 5;
        }
    }

    private establecerPosiciones() {
        this.procSel.posY = this.posEstandar.posicionYDienteInicial;

        if (this.numerosSegundo.indexOf(this.procSel.numeroDiente) >= 0)
            this.procSel.posY = this.anchoDiente + this.posEstandar.margenYEntreDientes + this.posEstandar.posicionYDienteInicial;

        this.procSel.posX = this.posEstandar.margenXEntreDientes
        if (this.procSel.indice != 0)
            this.procSel.posX = (this.procSel.indice * this.anchoDiente) + (2 * this.posEstandar.margenXEntreDientes * this.procSel.indice) + this.posEstandar.margenXEntreDientes;
    }

    private dibujarProcedimiento(seleccion: string) {
        switch (seleccion) {
            case 'pintarX':
                this.pintandoX()
                break;
            case 'pintarCirculo':
                this.pintandoCirculo()
                break;
            case 'pintarMedio':
                this.pintandoMedio()
                break;
            case 'pintarE':
                this.pintandoLetra('E', 'end')
                break;
            case 'pintarY':
                this.pintandoLetra('Y', 'start')
                break;
            case 'pintarRelleno':
                this.contextoPinta.fillStyle = this.procSel.color
                this.pintar(this.contextoPinta)
                break;
            case 'pintarDiente':
                if (this.numerosPrimeros.indexOf(this.procSel.numeroDiente) >= 0) this.pintandoImagen(this.procSel.posX + this.anchoDiente / 2.3, this.procSel.posY - this.anchoDiente / 1.5 - 1)
                else this.pintandoImagen(this.procSel.posX + this.anchoDiente / 2.3, this.procSel.posY + this.anchoDiente + 4)
                break;
        }
    }

    private pintar(contexto: CanvasRenderingContext2D) {
        this.contextoPinta.lineWidth = 1
        contexto.beginPath();

        switch (this.procSel.caraDiente) {
            case 1:
                contexto.moveTo(this.procSel.posX, this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.baseMayor + this.procSel.posX, this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.baseMenor + this.procSel.posX, this.dimensionesTrapecio.lateral + this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.lateral + this.procSel.posX, this.dimensionesTrapecio.lateral + this.procSel.posY);
                break;
            case 2:
                contexto.moveTo(this.dimensionesTrapecio.baseMenor + this.procSel.posX, this.dimensionesTrapecio.lateral + this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.baseMayor + this.procSel.posX, this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.baseMayor + this.procSel.posX, this.dimensionesTrapecio.baseMayor + this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.baseMenor + this.procSel.posX, this.dimensionesTrapecio.baseMenor + this.procSel.posY);
                break;
            case 3:
                contexto.moveTo(this.dimensionesTrapecio.lateral + this.procSel.posX, this.dimensionesTrapecio.baseMenor + this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.baseMenor + this.procSel.posX, this.dimensionesTrapecio.baseMenor + this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.baseMayor + this.procSel.posX, this.dimensionesTrapecio.baseMayor + this.procSel.posY);
                contexto.lineTo(this.procSel.posX, this.dimensionesTrapecio.baseMayor + this.procSel.posY);
                break;
            case 4:
                contexto.moveTo(this.procSel.posX, this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.lateral + this.procSel.posX, this.dimensionesTrapecio.lateral + this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.lateral + this.procSel.posX, this.dimensionesTrapecio.baseMenor + this.procSel.posY);
                contexto.lineTo(this.procSel.posX, this.dimensionesTrapecio.baseMayor + this.procSel.posY);
                break;
            case 5:
                contexto.moveTo(this.dimensionesTrapecio.lateral + this.procSel.posX, this.dimensionesTrapecio.lateral + this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.baseMenor + this.procSel.posX, this.dimensionesTrapecio.lateral + this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.baseMenor + this.procSel.posX, this.dimensionesTrapecio.baseMenor + this.procSel.posY);
                contexto.lineTo(this.dimensionesTrapecio.lateral + this.procSel.posX, this.dimensionesTrapecio.baseMenor + this.procSel.posY);
                break;
        }
        contexto.closePath();
        contexto.fill();
        contexto.stroke();
    }

    private pintandoX() {
        this.contextoPinta.lineWidth = 4;
        this.contextoPinta.strokeStyle = this.procSel.color

        this.contextoPinta.beginPath();
        this.contextoPinta.moveTo(this.procSel.posX, this.procSel.posY);
        this.contextoPinta.lineTo(this.dimensionesTrapecio.baseMayor + this.procSel.posX, this.dimensionesTrapecio.baseMayor + this.procSel.posY);
        this.contextoPinta.closePath();
        this.contextoPinta.stroke();

        this.contextoPinta.beginPath();
        this.contextoPinta.moveTo(this.dimensionesTrapecio.baseMayor + this.procSel.posX, this.procSel.posY);
        this.contextoPinta.lineTo(this.procSel.posX, this.dimensionesTrapecio.baseMayor + this.procSel.posY);
        this.contextoPinta.closePath();
        this.contextoPinta.stroke();
    }

    private pintandoCirculo() {
        this.contextoPinta.lineWidth = 4;
        this.contextoPinta.strokeStyle = this.procSel.color
        this.contextoPinta.beginPath();
        this.contextoPinta.arc(this.procSel.posX + this.anchoDiente / 2, this.procSel.posY + this.anchoDiente / 2, this.anchoDiente / 2, 0, Math.PI * 2)
        this.contextoPinta.closePath();
        this.contextoPinta.stroke();
    }

    private pintandoLetra(letra: string, alinear: string) {
        let posY = this.procSel.posY
        this.numerosPrimeros.indexOf(this.procSel.numeroDiente) >= 0 ? posY += this.anchoDiente + this.anchoDiente / 2.7 : posY -= this.posEstandar.margenXEntreDientes
        let tamanoFuente = this.anchoDiente / 2.5
        this.contextoPinta.font = `${tamanoFuente}px arial`
        this.contextoPinta.textAlign = alinear as CanvasTextAlign
        this.contextoPinta.fillStyle = this.procSel.color
        this.contextoPinta.fillText(letra, this.procSel.posX + this.anchoDiente / 2.5, posY);
    }

    private pintandoMedio() {
        this.contextoPinta.lineWidth = 4;
        this.contextoPinta.strokeStyle = this.procSel.color
        this.contextoPinta.beginPath();
        this.contextoPinta.moveTo(this.procSel.posX + this.dimensionesTrapecio.lateral, this.procSel.posY + this.anchoDiente / 2);
        this.contextoPinta.lineTo(this.anchoDiente + this.procSel.posX - this.dimensionesTrapecio.lateral, this.procSel.posY + this.anchoDiente / 2);
        this.contextoPinta.closePath();
        this.contextoPinta.stroke();
    }

    private pintandoImagen(posX: number, posY: number) {
        this.contextoPinta.drawImage(this.imagen, posX, posY, this.anchoDiente / 3, this.anchoDiente / 1.5)
    }

    private guardarDiente() {
        if ((this.procSel.numeroDiente != null || this.procSel.numeroDiente > 0 || this.procSel.numeroDiente != undefined)) {

            let p: Procedimiento = this.listaProcedimientos.find(pr => pr.numeroDiente === this.procSel.numeroDiente && pr.caraDiente === this.procSel.caraDiente
                && pr.tipoProcedimiento === this.procSel.tipoProcedimiento) as Procedimiento
            if (p === undefined)
                return this.listaProcedimientos.push(new Procedimiento(this.procSel.numeroDiente, this.procSel.caraDiente, this.procSel.tipoProcedimiento, this.procSel.color))
            else
                return !this.listaProcedimientos.splice(this.listaProcedimientos.indexOf(p), 1)
        }
        return false;
    }

    abstract establecerConjunto(numero: number): boolean;

    private dibujarProcedimientosExistentes() {
        this.listaProcedimientos.filter((element: Procedimiento) => {
            if (this.establecerConjunto(element.numeroDiente)) {
                this.procSel.caraDiente = element.caraDiente
                this.procSel.numeroDiente = element.numeroDiente
                this.procSel.tipoProcedimiento = element.tipoProcedimiento
                this.procSel.color = this.contextoPinta.fillStyle = element.color
                this.procSel.indice = this.numerosPrimeros.indexOf(element.numeroDiente)
                if (this.procSel.indice < 0) this.procSel.indice = this.numerosSegundo.indexOf(element.numeroDiente);
                this.establecerPosiciones();
                this.dibujarProcedimiento(this.procSel.tipoProcedimiento)
            }
        })

        this.limpiarDienteSeleccionado
    }

    public setListaProcedimientos(lista: Procedimiento[]) {
        this.listaProcedimientos = lista;
        if (this.listaProcedimientos.length > 0) this.dibujarProcedimientosExistentes();
    }
}
