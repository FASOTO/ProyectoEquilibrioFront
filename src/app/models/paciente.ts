import { Domicilio } from "./domicilio";
import { Imagen } from "./imagen";
import { Procedimiento } from "./procedimiento";

export class Paciente {
    id!: 0;
    nombre: string ='';
    apellido: string =''
    dni:number= 0;
    fechaNacimiento= new Date;
    telefono: string ='';
    nacionalidad: string ='';
    domicilio: Domicilio = {
        calle:'',
        numeracion:0,
        localidad:'',
        barrio:'',
    };
    procedimientos: Procedimiento[] =[];
    imagenes : Imagen[] =[];

      
}