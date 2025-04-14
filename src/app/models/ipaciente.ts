import { DeclaracionJurada } from "./declaracion-jurada";
import { Domicilio } from "./domicilio";
import { Imagen } from "./imagen";
import { Procedimiento } from "./procedimiento";
import { SaludPaciente } from "./salud-paciente";

export interface IPaciente {
    nombre: string;
    apellido: string;
    dni: number;
    fechaNacimiento: Date;
    telefono: string;
    nacionalidad: string;
    domicilio: Domicilio;
    procedimientos: Procedimiento[];
    estadoCivil:string;
    profesion:string;
    obraSocial:string;
    nroAfiliado:number;
    declaracionJurada:DeclaracionJurada;
    saludPaciente:SaludPaciente;
}
