import { Component, ElementRef, HostListener, model, ViewChild } from '@angular/core';
import { OdontogramaLargo } from '../../../models/odontograma-largo';
import { OdontogramaChico } from '../../../models/odontograma-chico';
import { Procedimiento } from '../../../models/procedimiento';

@Component({
  selector: 'app-odontograma',
  imports: [],
  templateUrl: './odontograma.component.html',
  styleUrl: './odontograma.component.css'
})
export class OdontogramaComponent {

  @ViewChild('canvas1', { static: true }) miCanvas1!: ElementRef
  @ViewChild('canvas2', { static: true }) miCanvas2!: ElementRef
  @ViewChild('canvas3', { static: true }) miCanvas3!: ElementRef
  @ViewChild('canvas4', { static: true }) miCanvas4!: ElementRef
  @ViewChild('canvas5', { static: true }) miCanvas5!: ElementRef
  @ViewChild('canvas6', { static: true }) miCanvas6!: ElementRef
  @ViewChild('contenedor1', { static: true }) grupo1!: ElementRef
  @ViewChild('contenedor2', { static: true }) grupo2!: ElementRef
  @ViewChild('inputRojo', { static: true }) inputColorRojo!: ElementRef

  private odontoGrande!: OdontogramaLargo;
  private odontoChico!: OdontogramaChico;
  protected opciones: Map<string, string> = new Map()
    .set("pintarRelleno", "Pintar")
    .set("pintarX", "X")
    .set("pintarCirculo", "O (Circulo)")
    .set("pintarE", "Endodoncia")
    .set("pintarY", "Y")
    .set("pintarMedio", "- Desgaste")

  private seleccion: string = '';
  listaProcedimientos = model<Procedimiento[]>();

  ngOnInit(): void {
    this.odontoGrande = new OdontogramaLargo(this.miCanvas1, this.miCanvas2, this.miCanvas3, this.grupo1);
    this.odontoChico = new OdontogramaChico(this.miCanvas4, this.miCanvas5, this.miCanvas6, this.grupo2);
    this.establecerCuadro()
    this.odontoGrande.dibujarEstructura(this.grupo1.nativeElement.clientWidth - 20);
    this.odontoChico.dibujarEstructura(this.grupo1.nativeElement.clientWidth);

    this.odontoGrande.setListaProcedimientos(this.listaProcedimientos() as Procedimiento[])
    this.odontoChico.setListaProcedimientos(this.listaProcedimientos() as Procedimiento[])

  }
  private establecerCuadro() {
    const altura = Number(this.grupo1.nativeElement.clientWidth / 3.47)
    this.grupo2.nativeElement.style.height = altura.toString() + 'px'
    this.grupo1.nativeElement.style.height = altura.toString() + 'px'
  }

  mouseMovePrimero(event: MouseEvent) {
    this.odontoGrande.mouseMoveEvent(event);
  }
  mouseClickPrimero(event: MouseEvent) {
    if (this.seleccion != '')
      this.odontoGrande.mouseClick(event, this.seleccion, (this.inputColorRojo.nativeElement as HTMLInputElement).checked ? "rojo" : "azul");
  }
  mouseMoveSegundo(event: MouseEvent) {
    this.odontoChico.mouseMoveEvent(event);
  }
  mouseClickSegundo(event: MouseEvent) {
    if (this.seleccion != '')
      this.odontoChico.mouseClick(event, this.seleccion, (this.inputColorRojo.nativeElement as HTMLInputElement).checked ? "rojo" : "azul");
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.establecerCuadro();
    this.odontoGrande.dibujarEstructura(this.grupo1.nativeElement.clientWidth - 20);
    this.odontoChico.dibujarEstructura(this.grupo1.nativeElement.clientWidth);
  }

  opcionSeleccionada(seleccionado: string) {
    this.seleccion = seleccionado
  }
}
