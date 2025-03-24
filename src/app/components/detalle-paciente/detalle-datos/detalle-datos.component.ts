import { Component, input } from '@angular/core';
import { Paciente } from '../../../models/paciente';

@Component({
  selector: 'app-detalle-datos',
  imports: [],
  templateUrl: './detalle-datos.component.html',
  styleUrl: './detalle-datos.component.css'
})
export class DetalleDatosComponent {

  paciente = input <Paciente>();
}
