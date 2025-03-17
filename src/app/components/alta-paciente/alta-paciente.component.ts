import { Component, inject, signal } from '@angular/core';
import { DeclaracionJuradaComponent } from "./declaracion-jurada/declaracion-jurada.component";
import { OdontogramaComponent } from "./odontograma/odontograma.component";
import { DatosPersonalesComponent } from "./datos-personales/datos-personales.component";
import { FormBuilder } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente';

@Component({
  selector: 'app-alta-paciente',
  imports: [DeclaracionJuradaComponent, OdontogramaComponent, DatosPersonalesComponent],
  templateUrl: './alta-paciente.component.html',
  styleUrl: './alta-paciente.component.css'
})
export class AltaPacienteComponent {
  activeTab: string = 'datosPersonales';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  fb = inject(FormBuilder)
  servicio = inject(PacienteService);

  formAlta = this.fb.group({
    datosPersonales: this.fb.group({
      nombre: '',
      apellido: '',
      dni: 0,
      telefono: 0,
      nacionalidad: '',
      fechaNacimiento: ''
    })
  })

  altaPaciente() {
    console.log(this.formAlta.controls.datosPersonales.value.apellido)
    console.log(this.formAlta.controls.datosPersonales.value.nombre)
    console.log(this.formAlta.controls.datosPersonales.value.dni)
    console.log(this.formAlta.controls.datosPersonales.value.telefono)
    console.log(this.formAlta.controls.datosPersonales.value.nacionalidad)
    console.log(this.formAlta.controls.datosPersonales.value.fechaNacimiento)

    let pac: Paciente = new Paciente();
    pac.apellido = this.formAlta.controls.datosPersonales.value.apellido as string;
    pac.nombre = this.formAlta.controls.datosPersonales.value.nombre as string;
    pac.dni = Number(this.formAlta.controls.datosPersonales.value.dni);
    // pac.telefono = this.formAlta.controls.datosPersonales.value.telefono as string;
    pac.nacionalidad = this.formAlta.controls.datosPersonales.value.nacionalidad as string;
    // pac.fechaNacimiento = Date(this.formAlta.controls.datosPersonales.value.fechaNacimiento);

    // this.servicio.crearPaciente(pac);
    // if (this.servicio.crearPaciente(pac)) {
    //   alert('se guardo')
    // }
    // this.servicio.crearPaciente(pac).subscribe(p => {
    //   console.log(p.id)
    // });
  }

  // variable de prubea luego borrar
  lista = signal([
    {
      numeroDiente: 15,
      caraDiente: 4,
      color: '#0073BB',
      tipoProcedimiento: 'pintarRelleno'
    },
    {
      numeroDiente: 47,
      caraDiente: 6,
      color: '#F50B0B',
      tipoProcedimiento: 'pintarX'
    },
    {
      numeroDiente: 55,
      caraDiente: 5,
      color: '#F50B0B',
      tipoProcedimiento: 'pintarRelleno'
    },
    {
      numeroDiente: 83,
      caraDiente: 6,
      color: '#F50B0B',
      tipoProcedimiento: 'pintarX'
    }
  ])
}
