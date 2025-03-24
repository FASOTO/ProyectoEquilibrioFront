import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { AltaPacienteComponent } from './components/alta-paciente/alta-paciente.component';
import { MostrarPacientesComponent } from './components/mostrar-pacientes/mostrar-pacientes.component';
import { DetallePacienteComponent } from './components/detalle-paciente/detalle-paciente.component';

export const routes: Routes = [
    {path:'', component:PrincipalComponent, title:'Inicio'},
    {path:'altaPaciente', component:AltaPacienteComponent, title:'Alta de Paciente'},
    {path:'mostrarPaciente', component:MostrarPacientesComponent, title:'Pacientes'},
    {path:'detallePaciente/:id', component:DetallePacienteComponent, title:'Detalle Paciente'}
];
