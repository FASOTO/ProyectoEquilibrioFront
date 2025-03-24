import { Component, inject, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { RouterModule } from '@angular/router';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-mostrar-pacientes',
  imports: [RouterModule],
  templateUrl: './mostrar-pacientes.component.html',
  styleUrl: './mostrar-pacientes.component.css'
})
export class MostrarPacientesComponent {

  servicePaciente = inject(PacienteService)
  
}
