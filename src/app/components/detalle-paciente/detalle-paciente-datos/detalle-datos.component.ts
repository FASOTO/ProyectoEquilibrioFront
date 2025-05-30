import { Component, input } from '@angular/core';
import { Paciente } from '../../../models/paciente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-datos',
  imports: [CommonModule],
  templateUrl: './detalle-datos.component.html',
  styleUrl: './detalle-datos.component.css'
})
export class DetalleDatosComponent {

  paciente = input <Paciente>();
}
