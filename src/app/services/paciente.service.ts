import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Paciente } from '../models/paciente';
import { IPaciente } from '../models/ipaciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  
  private url = 'http://localhost:8080/pacientes';
  private http = inject(HttpClient);
  private state = signal({
    pacientes: new Map<number, Paciente>()
  })

  constructor() {
    this.getPacientes();
  }
  getListaPacientes() {
    return Array.from(this.state().pacientes.values());
  }

  getPacienteByID(id: number) {
    return this.state().pacientes.get(id);
  }

  private getPacientes(): void {
    this.getDb().subscribe(res => {
      res.forEach(p => this.state().pacientes.set(p.id, 
        new Paciente(p.id, p.nombre,p.apellido,p.dni,new Date (p.fechaNacimiento),p.telefono,p.nacionalidad,p.domicilio,
        p.procedimientos,p.imagenes,p.estadoCivil, p.profesion,p.obraSocial,p.nroAfiliado)
      ));
      this.state.set({ pacientes: this.state().pacientes });
    })
  }
  private getDb(): Observable<Paciente[]> {
    return this.http.get(this.url).pipe(map((response: any) => response._embedded.pacientes as Paciente[]),);
  }
  crearPaciente(paciente: IPaciente){
    
    this.create(paciente).subscribe((p)=>{
      this.state.update((state) => {
        state.pacientes.set(p.id, p);
        return { pacientes: state.pacientes }})
      }
    );
  }

  private create(paciente: IPaciente):Observable<Paciente>{
    return this.http.post<Paciente>(this.url, paciente);
  }

  actualizarPaciente(paciente: Paciente){
    this.update(paciente).subscribe((p)=>{

      this.state.update((state) => {
        state.pacientes.set(p.id, p);
        
        return { pacientes: state.pacientes }})
    });
  }
  private update(paciente: Paciente):Observable<Paciente>{
    return this.http.put<Paciente>(`${this.url}/${ paciente.id}`,paciente);
  }
  
}
