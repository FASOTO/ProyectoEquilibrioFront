import { Component, inject, signal } from '@angular/core';
import { DeclaracionJuradaComponent } from "./declaracion-jurada/declaracion-jurada.component";
import { OdontogramaComponent } from "./odontograma/odontograma.component";
import { DatosPersonalesComponent } from "./datos-personales/datos-personales.component";
import { FormBuilder } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import { IPaciente } from '../../models/ipaciente';

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

  formDatosPersonales = this.fb.group({
    nombre: '',
    apellido: '',
    dni: 0,
    telefono: '',
    nacionalidad: '',
    fechaNacimiento: new Date(),
    edad: [{ value: 0, disabled: true }],
    estadoCivil: '',
    profesion: '',
    calle: '',
    numeroCalle: 0,
    localidad: '',
    obraSocial: '',
    nroAfiliado: 0
  })

  altaPaciente() {
    let pac: IPaciente = {
      nombre: this.formDatosPersonales.value.nombre as string,
      apellido: this.formDatosPersonales.value.apellido as string,
      dni: Number(this.formDatosPersonales.value.dni),
      telefono: this.formDatosPersonales.value.telefono as string,
      nacionalidad: this.formDatosPersonales.value.nacionalidad as string,
      fechaNacimiento: this.formDatosPersonales.value.fechaNacimiento as Date,
      estadoCivil: this.formDatosPersonales.value.estadoCivil as string,
      profesion: this.formDatosPersonales.value.profesion as string,
      obraSocial: this.formDatosPersonales.value.obraSocial as string,
      nroAfiliado: Number(this.formDatosPersonales.value.nroAfiliado),
      domicilio: {
        calle: '',
        numeracion: 0,
        localidad: ''
      },
      procedimientos: [{
        numeroDiente: 0,
        caraDiente: 0,
        tipoProcedimiento: '',
        color: ''
      }],
      imagenes: [{
        url: ''
      }]
    }
    this.servicio.crearPaciente(pac)

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
