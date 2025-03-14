import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { PacienteService } from './services/paciente.service';
import { Paciente } from './models/paciente';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PrincipalComponent } from './components/principal/principal.component';
// COMPONENTE DE PRUEBA
@Component({
  selector: 'app-root',
  imports: [SidebarComponent, PrincipalComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  
  // servicio = inject(PacienteService);

  // pacientes: Signal<Paciente[] | undefined> = computed(() => this.servicio.getListaPacientes(),)

  // guardar() {
  //   let pac: Paciente = new Paciente();
  //   pac.nombre = "Fernando";
  //   pac.apellido = "soto"
  //   pac.dni = 29274550
  //   pac.fechaNacimiento = new Date("2014/05/15")
  //   pac.telefono = "1158465"
  //   pac.nacionalidad = "argetnina",
  //     pac.domicilio = {
  //       calle: "sanmartin",
  //       numeracion: 1545,
  //       localidad: "yala",
  //       barrio: "san martin"
  //     },
  //     pac.procedimientos = [{
  //       numeroDiente: 15,
  //       caraDiente: 2,
  //       tipoProcedimiento: "rotura",
  //       color: "rojo"
  //     }],
  //     pac.imagenes = [{
  //       url: "g;//imagenes"
  //     }]
    
  //   this.servicio.crearPaciente(pac);
  //     // if (this.servicio.crearPaciente(pac)){
  //   //   alert('se guardo')
  //   // }
  //   // this.servicio.crearPaciente(pac).subscribe(p=>{
  //     // console.log(p.id)
  //   // });
  // }

  // actualizar(){
  //   let pacienteActualizado: Paciente | undefined  = this.servicio.getPacienteByID(1)
  //   if (pacienteActualizado != undefined){

  //     pacienteActualizado.domicilio.calle ='san martin'
  //     this.servicio.actualizarPaciente(pacienteActualizado)
  //   }
  // }
}
