import { Component, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-declaracion-jurada',
  imports: [ReactiveFormsModule],
  templateUrl: './declaracion-jurada.component.html',
  styleUrl: './declaracion-jurada.component.css'
})
export class DeclaracionJuradaComponent {

  formDeclaracionJurada = input.required<FormGroup>();

  tipoHepatitis(event:any, sel:string){
    const hepa = this.formDeclaracionJurada().get('hepatitisTipo') as FormControl

    if(event.target.checked){
      hepa.setValue(hepa.value + sel)
    }
    else{
      let index = hepa.value.indexOf(sel)
      const valor = hepa.value as string
      hepa.setValue(valor.slice(0,index)  + valor.slice(index+1))
    }
  }
}
