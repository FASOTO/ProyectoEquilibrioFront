import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-datos-personales',
  imports: [ReactiveFormsModule],
  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.css'
})
export class DatosPersonalesComponent {

  formDatosPersonales = input.required<FormGroup>();

  calcularEdad() {
    const hoy = new Date();
    const fechaNacimiento:Date = new Date (this.formDatosPersonales().controls['fechaNacimiento'].value)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
      edad--;
    }
    this.formDatosPersonales().controls['edad'].setValue(edad)
  }
}
