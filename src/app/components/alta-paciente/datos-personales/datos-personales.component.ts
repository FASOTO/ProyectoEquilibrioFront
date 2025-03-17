import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-datos-personales',
  imports: [ReactiveFormsModule],
  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.css'
})
export class DatosPersonalesComponent {

  formDatosPersonales = input.required<FormGroup>();

  // formDatosPersonales = new FormGroup({
  //   nombre: new FormControl(''),
  //   apellido: new FormControl(''),
  //   dni: new FormControl (''),
  //   telefono: new FormControl(''),
  //   nacionalidad: new FormControl(''),
  //   fechaNacimiento: new FormControl(''),
  //   calle: new FormControl(''),
  //   numeroCalle: new FormControl(''),
  //   localidad: new FormControl(''),
  //   obraSocial: new FormControl('')
  // })
  
 
}
