import { Component, model } from '@angular/core';
import { Imagen } from '../../../models/imagen';

@Component({
  selector: 'app-fotos',
  imports: [],
  templateUrl: './fotos.component.html',
  styleUrl:'./fotos.component.css',
  
})
export class FotosComponent {

  listaArchivosImagen = model.required<Imagen[]>();
  
  cargarImagen(event: Event) {
    const input = event.target as HTMLInputElement

    if (input.files) {

      const file = input.files[0];
      this.listaArchivosImagen().push({
        url:URL.createObjectURL(file),
        archivo:file
      })
    }
    input.value =''
    
  }

  borrarFoto(item:Imagen){
    this.listaArchivosImagen.update(lista=> lista.filter((it:Imagen) =>{
      return it.archivo != item.archivo;
    }));
  }
}
