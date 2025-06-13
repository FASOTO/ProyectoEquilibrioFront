import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Paciente } from '../models/paciente';
import { IPaciente } from '../models/ipaciente';
import { ImagenService } from './imagen.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private url = 'http://localhost:8080/pacientes';
  private http = inject(HttpClient);
  private imagenService = inject(ImagenService);

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
      res.forEach(p => this.state().pacientes.set(p.id, new Paciente(p)));
      this.state.set({ pacientes: this.state().pacientes });
    })
  }
  private getDb(): Observable<Paciente[]> {
    return this.http.get(this.url).pipe(map((response: any) => response._embedded.pacientes as Paciente[]),);
  }

  crearPaciente(paciente: IPaciente): Observable<number> {
    return this.http.post<Paciente>(this.url, paciente).pipe(
      tap((p) => {
        this.state.update((state) => {
          state.pacientes.set(p.id, p);
          return { pacientes: state.pacientes };
        });
      }),
      map((p) => p.id) // devolvés el ID
    );
  }

  actualizarPaciente(paciente: Paciente) {
    this.update(paciente).subscribe((p) => {

      this.state.update((state) => {
        state.pacientes.set(p.id, p);

        return { pacientes: state.pacientes }
      })
    });
  }
  private update(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.url}/${paciente.id}`, paciente);
  }

}
// crearPaciente(paciente: IPaciente) {
//   this.create(paciente).subscribe((p) => {
//     this.state.update((state) => {
//       state.pacientes.set(p.id, p);
//       return { pacientes: state.pacientes };
//     });
//   });
// }