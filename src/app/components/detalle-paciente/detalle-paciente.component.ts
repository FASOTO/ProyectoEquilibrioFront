import { Component, inject, signal } from '@angular/core';
import { DetalleDatosComponent } from "./detalle-paciente-datos/detalle-datos.component";
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente';
import { DetallePacienteDeclaracionComponent } from "./detalle-paciente-declaracion/detalle-paciente-declaracion.component";
import { Procedimiento } from '../../models/procedimiento';
import { OdontogramaComponent } from '../alta-paciente/odontograma/odontograma.component';
import { DetallePacienteFotosComponent } from "./detalle-paciente-fotos/detalle-paciente-fotos.component";
import { DetallePacienteSaludComponent } from "./detalle-paciente-salud/detalle-paciente-salud.component";

@Component({
  selector: 'app-detalle-paciente',
  imports: [DetalleDatosComponent, DetallePacienteDeclaracionComponent, OdontogramaComponent, DetallePacienteFotosComponent, DetallePacienteSaludComponent],
  templateUrl: './detalle-paciente.component.html',
  styleUrl: './detalle-paciente.component.css'
})
export class DetallePacienteComponent {
  activeTab: string = 'datosPersonales';
  pacienteService = inject(PacienteService)
  paciente:Paciente;

  listaProcedimientos = signal<Procedimiento[]>([]);
  route : ActivatedRoute = inject(ActivatedRoute)

  constructor(){
    this.paciente = this.pacienteService.getPacienteByID(Number(this.route.snapshot.params['id'])) as Paciente
    this.listaProcedimientos.set(this.paciente.procedimientos);
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
