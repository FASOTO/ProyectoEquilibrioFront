import { Component, inject, input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-salud-paciente',
  imports: [ReactiveFormsModule],
  templateUrl: './salud-paciente.component.html',
  styleUrl: './salud-paciente.component.css'
})
export class SaludPacienteComponent {

  formSaludPaciente = input.required<FormGroup>();

  fb = inject(FormBuilder)
  
  tipoDolor(event: any, sel: string) {
    const tipoDolor = this.formSaludPaciente().get('queTipo') as FormArray

    if (event.target.checked) {
      tipoDolor.push(this.fb.control(sel))
    }
    else {
      let index = tipoDolor.value.indexOf(sel)
      tipoDolor.removeAt(index);
    }
    console.log(tipoDolor.value)
  }

}
