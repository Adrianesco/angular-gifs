import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
import { Gif } from '../../gifs/interface/gifs.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

 

  get historial():string[]{
    return this.gifsService.historial;
  }

  constructor(private gifsService:GifsService){}

  /**
   * Con este metodo podemos buscar las imagenes desde las opciones del sidebar
   * @param item 
   */
  buscar(item:string){
    console.log('item:',item);
    this.gifsService.buscarGifs(item);
  }

}
