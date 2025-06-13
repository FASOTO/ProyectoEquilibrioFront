import { Component, input } from '@angular/core';
import { Paciente } from '../../../models/paciente';

@Component({
  selector: 'app-detalle-paciente-salud',
  imports: [],
  templateUrl: './detalle-paciente-salud.component.html',
  styleUrl: './detalle-paciente-salud.component.css'
})
export class DetallePacienteSaludComponent {

  paciente = input<Paciente>();
}
