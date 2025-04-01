import { Component, inject, signal } from '@angular/core';
import { DeclaracionJuradaComponent } from "./declaracion-jurada/declaracion-jurada.component";
import { OdontogramaComponent } from "./odontograma/odontograma.component";
import { DatosPersonalesComponent } from "./datos-personales/datos-personales.component";
import { FormBuilder } from '@angular/forms';
import { PacienteService } from '../../services/paciente.service';
import { IPaciente } from '../../models/ipaciente';
import { Procedimiento } from '../../models/procedimiento';
import { SaludPacienteComponent } from "./salud-paciente/salud-paciente.component";

@Component({
  selector: 'app-alta-paciente',
  imports: [DeclaracionJuradaComponent, OdontogramaComponent, DatosPersonalesComponent, SaludPacienteComponent],
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

  formDeclaracionJurada = this.fb.group({
    padreVive: false,
    enfermedadPadre: '',
    madreVive: false,
    enfermedadMadre: '',
    tieneHermanos: false,
    hermanosSanos: '',
    sufreEnfermedad: false,
    enfermedadCual: '',

    tratamientoMedico: false,
    tratamientoMedicoCual: '',

    medicamentosConsumeHabitualmente: '',

    medicamentoUltimos5: '',

    realizaDeporte: false,
    malestarDeporte: false,

    alergicoDroga: false,
    alergicoAnestecia: false,
    alergicoPenicilina: false,
    drogaCual: '',

    cicatriza: false,
    sangraMucho: '',

    problemaColageno: false,

    fiebreReumatica: false,
    fiebreReumaticaMedicacion: '',

    diabetico: false,
    controladoDiabetico: '',
    conQueDiabetico: '',

    problemaCardiaco: false,
    problemaCardiacoCual: '',

    aspirinaAnticoagulante: false,
    aspirinaAnticoagulanteFrecuencia: '',

    presion: false,

    chagas: false,
    chagasTratamiento: '',

    problemasRenales: false,

    ulceraGastrica: false,

    hepatitis: false,
    hepatitisTipo: '',

    problemaHepatico: false,
    problemaHepaticoCual: '',

    convulsiones: false,

    epileptico: false,
    epilepticoMedicacion: '',

    sifilisGonorrea: false,
    otraEnfermedadInfectocontagiosa: false,

    transfusiones: false,

    operado: false,
    operadoDeQue: '',
    operadoCuando: '',

    problemaRespiratorio: false,
    problemaRespiratorioCual: '',

    fuma: false,

    embarazada: false,
    embarazadaMeses: '',

    algunaOtraEnfermedad: false,
    algunaOtraEnfermedadCual: '',

    tratamientoHomeopaticoAcupuntura: '',

    medicoClinico: '',

    clinicaHospital: '',
  })

  formSaludPaciente = this.fb.group({
    porqueAsistioConsulta: '',
    consultoConOtroProfesional: false,

    tomoAlgunMedicamento: false,
    nombreMedicamentos: '',
    desdeCuando: '',
    obtuvoResultados: false,

    haTenidoDolor: false,
    queTipo: this.fb.array([]),
    localizadoDonde: '',
    irradiadoHaciaDonde: '',
    puedeCalmarlo: '',

    sufrioGolpeDientes: false,
    cuando: '',
    comoSeProdujo: '',

    fracturoDiente: false,
    fracturaDienteCual: '',
    recibioTratamiento: '',

    dificultadHablar: '',
    masticar: '',
    abrirBoca: '',
    tragarAlimentos: '',

    observadoAnormalLabios: '',
    observadoAnormalLengua: '',
    observadoAnormalPaladar: '',
    observadoAnormalPisoBoca: '',
    observadoAnormalCarrillos: '',
    observadoAnormalRebordes: '',
    observadoAnormalTrigonos: '',
    observadoAnormalRetromolar: '',

    lesionManchas: false,
    lesionAbultamientoTejidos: false,
    lesionUlceraciones: false,
    lesionAmpollar: false,
    lesionOtros: '',

    sangranEncias: false,
    sangranEnciasCuando: '',

    pusBoca: false,
    pusBocaDonde: '',

    movilidadDientes: false,
    morderSienteAltoDientes: '',

    caraHinchada: false,
    caraHinchadaHielo: '',
    caraHinchadaCalor: '',
    caraHinchadaOtros: '',

    azucarDiarios: '',
    indicePlaca: '',

    higieneBucal: '',

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
        calle: this.formDatosPersonales.value.calle as string,
        numeracion: Number(this.formDatosPersonales.value.numeroCalle),
        localidad: this.formDatosPersonales.value.localidad as string
      },
      procedimientos: this.lista(),
      imagenes: [{
        url: ''
      }],
      declaracionJurada: {
        padreVive: this.formDeclaracionJurada.value.padreVive as boolean,
        enfermedadPadre: this.formDeclaracionJurada.value.enfermedadPadre ?? '',
        madreVive: this.formDeclaracionJurada.value.madreVive as boolean,
        enfermedadMadre: this.formDeclaracionJurada.value.enfermedadMadre ?? '',

        tieneHermanos: this.formDeclaracionJurada.value.tieneHermanos as boolean,
        hermanosSanos: this.formDeclaracionJurada.value.hermanosSanos ?? '',

        sufreEnfermedad: this.formDeclaracionJurada.value.sufreEnfermedad as boolean,
        enfermedadCual: this.formDeclaracionJurada.value.enfermedadCual ?? '',

        tratamientoMedico: this.formDeclaracionJurada.value.tratamientoMedico as boolean,
        tratamientoMedicoCual: this.formDeclaracionJurada.value.tratamientoMedicoCual ?? '',

        medicamentosConsumeHabitualmente: this.formDeclaracionJurada.value.medicamentosConsumeHabitualmente ?? '',
        medicamentoUltimos5: this.formDeclaracionJurada.value.medicamentoUltimos5 ?? '',

        realizaDeporte: this.formDeclaracionJurada.value.realizaDeporte as boolean,
        malestarDeporte: this.formDeclaracionJurada.value.malestarDeporte as boolean,

        alergicoDroga: this.formDeclaracionJurada.value.alergicoDroga as boolean,
        alergicoAnestecia: this.formDeclaracionJurada.value.alergicoAnestecia as boolean,
        alergicoPenicilina: this.formDeclaracionJurada.value.alergicoPenicilina as boolean,
        drogaCual: this.formDeclaracionJurada.value.drogaCual ?? '',

        cicatriza: this.formDeclaracionJurada.value.cicatriza as boolean,
        sangraMucho: this.formDeclaracionJurada.value.sangraMucho ?? '',

        problemaColageno: this.formDeclaracionJurada.value.problemaColageno as boolean,

        fiebreReumatica: this.formDeclaracionJurada.value.fiebreReumatica as boolean,
        fiebreReumaticaMedicacion: this.formDeclaracionJurada.value.fiebreReumaticaMedicacion ?? '',

        diabetico: this.formDeclaracionJurada.value.diabetico as boolean,
        controladoDiabetico: this.formDeclaracionJurada.value.controladoDiabetico ?? '',
        conQueDiabetico: this.formDeclaracionJurada.value.conQueDiabetico ?? '',

        problemaCardiaco: this.formDeclaracionJurada.value.problemaCardiaco as boolean,
        problemaCardiacoCual: this.formDeclaracionJurada.value.problemaCardiacoCual ?? '',

        aspirinaAnticoagulante: this.formDeclaracionJurada.value.aspirinaAnticoagulante as boolean,
        aspirinaAnticoagulanteFrecuencia: this.formDeclaracionJurada.value.aspirinaAnticoagulanteFrecuencia ?? '',

        presion: this.formDeclaracionJurada.value.presion as boolean,

        chagas: this.formDeclaracionJurada.value.chagas as boolean,
        chagasTratamiento: this.formDeclaracionJurada.value.chagasTratamiento ?? '',

        problemasRenales: this.formDeclaracionJurada.value.problemasRenales as boolean,

        ulceraGastrica: this.formDeclaracionJurada.value.ulceraGastrica as boolean,

        hepatitis: this.formDeclaracionJurada.value.hepatitis as boolean,
        hepatitisTipo: this.formDeclaracionJurada.value.hepatitisTipo ?? '',

        problemaHepatico: this.formDeclaracionJurada.value.problemaHepatico as boolean,
        problemaHepaticoCual: this.formDeclaracionJurada.value.problemaHepaticoCual ?? '',

        convulsiones: this.formDeclaracionJurada.value.convulsiones as boolean,

        epileptico: this.formDeclaracionJurada.value.epileptico as boolean,
        epilepticoMedicacion: this.formDeclaracionJurada.value.epilepticoMedicacion ?? '',

        sifilisGonorrea: this.formDeclaracionJurada.value.sifilisGonorrea as boolean,
        otraEnfermedadInfectocontagiosa: this.formDeclaracionJurada.value.otraEnfermedadInfectocontagiosa as boolean,

        transfusiones: this.formDeclaracionJurada.value.transfusiones as boolean,

        operado: this.formDeclaracionJurada.value.operado as boolean,
        operadoDeQue: this.formDeclaracionJurada.value.operadoDeQue ?? '',
        operadoCuando: this.formDeclaracionJurada.value.operadoCuando ?? '',

        problemaRespiratorio: this.formDeclaracionJurada.value.problemaRespiratorio as boolean,
        problemaRespiratorioCual: this.formDeclaracionJurada.value.problemaRespiratorioCual ?? '',

        fuma: this.formDeclaracionJurada.value.fuma as boolean,

        embarazada: this.formDeclaracionJurada.value.embarazada as boolean,
        embarazadaMeses: this.formDeclaracionJurada.value.embarazadaMeses ?? '',

        algunaOtraEnfermedad: this.formDeclaracionJurada.value.algunaOtraEnfermedad as boolean,
        algunaOtraEnfermedadCual: this.formDeclaracionJurada.value.algunaOtraEnfermedadCual ?? '',

        tratamientoHomeopaticoAcupuntura: this.formDeclaracionJurada.value.tratamientoHomeopaticoAcupuntura ?? '',

        medicoClinico: this.formDeclaracionJurada.value.medicoClinico ?? '',

        clinicaHospital: this.formDeclaracionJurada.value.clinicaHospital ?? '',
      },
      saludPaciente: {
        porqueAsistioConsulta: this.formSaludPaciente.value.porqueAsistioConsulta ?? '',
        consultoConOtroProfesional: this.formSaludPaciente.value.consultoConOtroProfesional as boolean,

        tomoAlgunMedicamento: this.formSaludPaciente.value.tomoAlgunMedicamento as boolean,
        nombreMedicamentos: this.formSaludPaciente.value.nombreMedicamentos ?? '',
        desdeCuando: this.formSaludPaciente.value.desdeCuando ?? '',
        obtuvoResultados: this.formSaludPaciente.value.obtuvoResultados as boolean,

        haTenidoDolor: this.formSaludPaciente.value.haTenidoDolor as boolean,
        queTipo: this.formSaludPaciente.value.queTipo?.join(' ') ?? '',
        localizadoDonde: this.formSaludPaciente.value.localizadoDonde ?? '',
        irradiadoHaciaDonde: this.formSaludPaciente.value.irradiadoHaciaDonde ?? '',
        puedeCalmarlo: this.formSaludPaciente.value.puedeCalmarlo ?? '',

        sufrioGolpeDientes: this.formSaludPaciente.value.sufrioGolpeDientes as boolean,
        cuando: this.formSaludPaciente.value.cuando ?? '',
        comoSeProdujo: this.formSaludPaciente.value.comoSeProdujo ?? '',

        fracturoDiente: this.formSaludPaciente.value.fracturoDiente as boolean,
        fracturaDienteCual: this.formSaludPaciente.value.fracturaDienteCual ?? '',
        recibioTratamiento: this.formSaludPaciente.value.recibioTratamiento ?? '',

        dificultadHablar: this.formSaludPaciente.value.dificultadHablar ?? '',
        masticar: this.formSaludPaciente.value.masticar ?? '',
        abrirBoca: this.formSaludPaciente.value.abrirBoca ?? '',
        tragarAlimentos: this.formSaludPaciente.value.tragarAlimentos ?? '',

        observadoAnormalLabios: this.formSaludPaciente.value.observadoAnormalLabios ?? '',
        observadoAnormalLengua: this.formSaludPaciente.value.observadoAnormalLengua ?? '',
        observadoAnormalPaladar: this.formSaludPaciente.value.observadoAnormalPaladar?? '',
        observadoAnormalPisoBoca: this.formSaludPaciente.value.observadoAnormalPisoBoca ?? '',
        observadoAnormalCarrillos: this.formSaludPaciente.value.observadoAnormalCarrillos ?? '',
        observadoAnormalRebordes: this.formSaludPaciente.value.observadoAnormalRebordes ?? '',
        observadoAnormalTrigonos: this.formSaludPaciente.value.observadoAnormalTrigonos?? '',
        observadoAnormalRetromolar: this.formSaludPaciente.value.observadoAnormalRetromolar ?? '',

        lesionManchas: this.formSaludPaciente.value.lesionManchas as boolean,
        lesionAbultamientoTejidos: this.formSaludPaciente.value.lesionAbultamientoTejidos as boolean,
        lesionUlceraciones: this.formSaludPaciente.value.lesionUlceraciones as boolean,
        lesionAmpollar: this.formSaludPaciente.value.lesionAmpollar as boolean,
        lesionOtros: this.formSaludPaciente.value.lesionOtros ?? '',

        sangranEncias: this.formSaludPaciente.value.sangranEncias as boolean,
        sangranEnciasCuando: this.formSaludPaciente.value.sangranEnciasCuando ?? '',

        pusBoca: this.formSaludPaciente.value.pusBoca as boolean,
        pusBocaDonde: this.formSaludPaciente.value.pusBocaDonde ?? '',

        movilidadDientes: this.formSaludPaciente.value.movilidadDientes as boolean,
        morderSienteAltoDientes: this.formSaludPaciente.value.morderSienteAltoDientes ?? '',

        caraHinchada: this.formSaludPaciente.value.caraHinchada as boolean,
        caraHinchadaHielo: this.formSaludPaciente.value.caraHinchadaHielo ?? '',
        caraHinchadaCalor: this.formSaludPaciente.value.caraHinchadaCalor ?? '',
        caraHinchadaOtros: this.formSaludPaciente.value.caraHinchadaOtros ?? '',

        azucarDiarios: this.formSaludPaciente.value.azucarDiarios ?? '',
        indicePlaca: this.formSaludPaciente.value.indicePlaca ?? '',

        higieneBucal: this.formSaludPaciente.value.higieneBucal ?? '',
      }
    }
    this.servicio.crearPaciente(pac)

  }

  lista = signal([])

  // variable de prubea luego borrar
  // lista = signal([
  //   {
  //     numeroDiente: 15,
  //     caraDiente: 4,
  //     color: '#0073BB',
  //     tipoProcedimiento: 'pintarRelleno'
  //   },
  //   {
  //     numeroDiente: 47,
  //     caraDiente: 6,
  //     color: '#F50B0B',
  //     tipoProcedimiento: 'pintarX'
  //   },
  //   {
  //     numeroDiente: 55,
  //     caraDiente: 5,
  //     color: '#F50B0B',
  //     tipoProcedimiento: 'pintarRelleno'
  //   },
  //   {
  //     numeroDiente: 83,
  //     caraDiente: 6,
  //     color: '#F50B0B',
  //     tipoProcedimiento: 'pintarX'
  //   }
  // ])
}
