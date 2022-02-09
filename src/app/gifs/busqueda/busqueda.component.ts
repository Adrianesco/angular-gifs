import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  //Si no se utiliza el operador ! angular marca error porque se esta trabajando de manera muy estricta 
  //porque indica que puede que no existe ese elemento  por lo tanto se utiliza el not null assertion operator ! (es propio de typescript)
  //de esa forma le decimos atypescript que siempre habra un valor
  //El ViewChild permite visualizar un elemento del dom 
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService){}
  
 buscar(){
  const valor:string = this.txtBuscar.nativeElement.value;
  if(valor.trim().length===0)
  {
    return;
  }
//  console.log(valor);
  this.gifsService.buscarGifs(valor);
  this.txtBuscar.nativeElement.value = '';
 }
}
