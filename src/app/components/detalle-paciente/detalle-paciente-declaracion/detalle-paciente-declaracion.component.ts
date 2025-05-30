import { Component, input } from '@angular/core';
import { Paciente } from '../../../models/paciente';

@Component({
  selector: 'app-detalle-paciente-declaracion',
  imports: [],
  templateUrl: './detalle-paciente-declaracion.component.html',
  styleUrl: './detalle-paciente-declaracion.component.css'
})
export class DetallePacienteDeclaracionComponent {
paciente = input <Paciente>();

alergicoDrogas(){
  if(!this.paciente()?.declaracionJurada.alergicoDroga){
    return 'NO'
  }

  let alergias: string[] = []
  if(this.paciente()?.declaracionJurada.alergicoAnestecia) alergias.push('Anestecia')
  if(this.paciente()?.declaracionJurada.alergicoPenicilina) alergias.push('Penicilina')
  if(this.paciente()?.declaracionJurada.drogaCual) alergias.push(this.paciente()?.declaracionJurada.drogaCual??'')

  return 'SI' + '(' +alergias +')';
}
}
