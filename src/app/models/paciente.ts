import { DeclaracionJurada } from "./declaracion-jurada";
import { Domicilio } from "./domicilio";
import { Imagen } from "./imagen";
import { IPaciente } from "./ipaciente";
import { Procedimiento } from "./procedimiento";
import { SaludPaciente } from "./salud-paciente";

export class Paciente implements IPaciente {
    id: number;
    nombre: string;
    apellido: string;
    dni: number;
    fechaNacimiento : Date;
    telefono: string;
    nacionalidad: string;
    domicilio: Domicilio ;
    procedimientos: Procedimiento[];
    estadoCivil:string;
    profesion: string;
    obraSocial: string;
    nroAfiliado: number;
    imagenes: Imagen[];
    declaracionJurada:DeclaracionJurada;
    saludPaciente: SaludPaciente;

    constructor(newPaciente:Paciente){
        this.id = newPaciente.id;
        this.nombre = newPaciente.nombre;
        this.apellido = newPaciente.apellido;
        this.dni = newPaciente.dni;
        this.fechaNacimiento = new Date (newPaciente.fechaNacimiento);
        this.telefono = newPaciente.telefono;
        this.nacionalidad = newPaciente.nacionalidad;
        this.domicilio = newPaciente.domicilio;
        this.procedimientos = newPaciente.procedimientos;
        this.estadoCivil = newPaciente.estadoCivil;
        this.profesion=newPaciente.profesion;
        this.obraSocial=newPaciente.obraSocial;
        this.nroAfiliado = newPaciente.nroAfiliado;
        this.declaracionJurada = newPaciente.declaracionJurada;
        this.imagenes = newPaciente.imagenes;
        this.saludPaciente = newPaciente.saludPaciente;
    }
    
    get edad():number{
        const hoy = new Date();

        let edad = hoy.getFullYear() - this.fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - this.fechaNacimiento.getMonth();
        const dia = hoy.getDate() - this.fechaNacimiento.getDate();

        if (mes < 0 || (mes === 0 && dia < 0)) {
            edad--;
        }
        return edad;
    }
}