import { Domicilio } from "./domicilio";
import { Imagen } from "./imagen";
import { Procedimiento } from "./procedimiento";

export interface IPaciente {
    nombre: string;
    apellido: string;
    dni: number;
    fechaNacimiento: Date;
    telefono: string;
    nacionalidad: string;
    domicilio: Domicilio;
    procedimientos: Procedimiento[];
    imagenes: Imagen[];
    estadoCivil:string;
    profesion:string;
    obraSocial:string;
    nroAfiliado:number;
}
