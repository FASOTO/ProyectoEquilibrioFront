import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagen } from '../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  
  private url = 'http://localhost:8080/pacientes/imagen/guardar';
  private http = inject(HttpClient);

  createImagen(id:number, imagenes:Imagen[]):Observable<any>{
    const formData = new FormData();
    imagenes.forEach(img=>{
      formData.append('imagen', img.archivo);
    })
    return this.http.post(`${this.url}/${id}`, formData);
  }
}
