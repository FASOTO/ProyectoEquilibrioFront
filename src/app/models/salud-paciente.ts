export interface SaludPaciente {
    porqueAsistioConsulta:string;
    consultoConOtroProfesional:boolean;

    tomoAlgunMedicamento:boolean;
    nombreMedicamentos:string;
    desdeCuando:string;
    obtuvoResultados:boolean;

    haTenidoDolor:boolean;
    queTipo:string;

    localizado:boolean;
    localizadoDonde:string;

    irradiado:boolean;
    irradiadoHaciaDonde:string;
    
    puedeCalmarlo:string;

    sufrioGolpeDientes:boolean;
    cuando:string;
    comoSeProdujo:string;

    fracturoDiente:boolean;
    fracturaDienteCual:string;
    recibioTratamiento:string;

    dificultadHablar:string;
    masticar:string;
    abrirBoca:string;
    tragarAlimentos:string;

    observadoAnormalLabios:string;
    observadoAnormalLengua:string;
    observadoAnormalPaladar:string;
    observadoAnormalPisoBoca:string;
    observadoAnormalCarrillos:string;
    observadoAnormalRebordes:string;
    observadoAnormalTrigonos:string;
    observadoAnormalRetromolar:string;

    lesionManchas:boolean;
    lesionAbultamientoTejidos:boolean;
    lesionUlceraciones:boolean;
    lesionAmpollar:boolean;
    lesionOtros:string;

    sangranEncias:boolean;
    sangranEnciasCuando:string;

    pusBoca:boolean;
    pusBocaDonde:string;

    movilidadDientes:boolean;
    morderSienteAltoDientes:string;

    caraHinchada:boolean;
    caraHinchadaHielo:string;
    caraHinchadaCalor:string;
    caraHinchadaOtros:string;
    
    azucarDiarios:string;
    indicePlaca:string;

    higieneBucal:string;
}
