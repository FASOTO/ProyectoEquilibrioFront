import { Domicilio } from "./domicilio";
import { Imagen } from "./imagen";
import { IPaciente } from "./ipaciente";
import { Procedimiento } from "./procedimiento";

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
    imagenes: Imagen[];
    estadoCivil:string;
    profesion: string;
    obraSocial: string;
    nroAfiliado: number;

    constructor(id:number,nom:string, ape:string, dni:number,fecha:Date, telefono:string, nacio:string, domi:Domicilio, 
        proc:Procedimiento[], img:Imagen[], estadoCivil:string, profesion:string, obraSocial:string, nroAfiliado:number){
        this.id = id;
        this.nombre = nom;
        this.apellido = ape;
        this.dni = dni;
        this.fechaNacimiento = fecha;
        this.telefono = telefono;
        this.nacionalidad = nacio;
        this.domicilio = domi;
        this.procedimientos = proc;
        this.imagenes = img;
        this.estadoCivil = estadoCivil;
        this.profesion=profesion;
        this.obraSocial=obraSocial;
        this.nroAfiliado = nroAfiliado;
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