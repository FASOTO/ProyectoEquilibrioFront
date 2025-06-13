import { Component, input } from '@angular/core';
import { Paciente } from '../../../models/paciente';

@Component({
  selector: 'app-detalle-paciente-fotos',
  imports: [],
  templateUrl: './detalle-paciente-fotos.component.html',
  styleUrl: './detalle-paciente-fotos.component.css'
})
export class DetallePacienteFotosComponent {
paciente = input <Paciente>();

}
