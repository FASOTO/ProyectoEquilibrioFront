import { Component, inject } from '@angular/core';
import { DetalleDatosComponent } from "./detalle-datos/detalle-datos.component";
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-detalle-paciente',
  imports: [DetalleDatosComponent],
  templateUrl: './detalle-paciente.component.html',
  styleUrl: './detalle-paciente.component.css'
})
export class DetallePacienteComponent {
  activeTab: string = 'datosPersonales';
  pacienteService = inject(PacienteService)
  paciente:Paciente;

  route : ActivatedRoute = inject(ActivatedRoute)

  constructor(){
    this.paciente = this.pacienteService.getPacienteByID(Number(this.route.snapshot.params['id'])) as Paciente
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
