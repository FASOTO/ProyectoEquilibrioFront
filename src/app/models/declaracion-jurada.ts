export interface DeclaracionJurada {

    padreVive: boolean;
    enfermedadPadre: string;
    madreVive: boolean;
    enfermedadMadre: string;

    tieneHermanos: boolean;
    hermanosSanos: string;

    sufreEnfermedad: boolean;
    enfermedadCual: string;

    tratamientoMedico: boolean;
    tratamientoMedicoCual: string;

    medicamentosConsumeHabitualmente:string;

    medicamentoUltimos5: string;

    realizaDeporte: boolean;
    malestarDeporte: boolean;

    alergicoDroga: boolean;
    alergicoAnestecia:boolean;
    alergicoPenicilina:boolean;
    drogaCual: string;

    cicatriza: boolean;
    sangraMucho: string;

    problemaColageno: boolean;

    fiebreReumatica: boolean;
    fiebreReumaticaMedicacion: string;

    diabetico: boolean;
    controladoDiabetico: string;
    conQueDiabetico: string;

    problemaCardiaco: boolean;
    problemaCardiacoCual: string;

    aspirinaAnticoagulante: boolean;
    aspirinaAnticoagulanteFrecuencia: string;

    presion: boolean;

    chagas: boolean;
    chagasTratamiento: string;

    problemasRenales: boolean;

    ulceraGastrica: boolean;

    hepatitis: boolean;
    hepatitisTipo: string;

    problemaHepatico: boolean;
    problemaHepaticoCual: string;

    convulsiones: boolean;

    epileptico: boolean;
    epilepticoMedicacion: string;

    sifilisGonorrea: boolean;
    otraEnfermedadInfectocontagiosa: boolean;

    transfusiones: boolean;

    operado: boolean;
    operadoDeQue: string;
    operadoCuando: string;

    problemaRespiratorio: boolean;
    problemaRespiratorioCual: string;

    fuma: boolean;

    embarazada: boolean;
    embarazadaMeses: string;

    algunaOtraEnfermedad: boolean;
    algunaOtraEnfermedadCual: string;

    tratamientoHomeopaticoAcupuntura: string;

    medicoClinico: string;

    clinicaHospital: string;
}
