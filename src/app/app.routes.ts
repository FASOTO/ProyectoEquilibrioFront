import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { AltaPacienteComponent } from './components/alta-paciente/alta-paciente.component';

export const routes: Routes = [
    {path:'', component:PrincipalComponent, title:'Inicio'},
    {path:'altaPaciente', component:AltaPacienteComponent, title:'Alta de Paciente'}
];
