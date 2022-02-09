import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private urlServicio   :string   = 'https://api.giphy.com/v1/gifs';
  private apiKey        :string   = '0SVsjvw8PLQ2qHr0gcauzQhECEciK92t';
  private _historial    :string[] = [];

  //ToDo cambiar any oir su tipo correspondiente
  /* public resultados:any[]=[]; */

  //Ahora que tenemos el tipado podemos definirlo
  public resultados:Gif[]=[];
  
  get historial():string[]{
    return [...this._historial];
  }

  /**
   * Para poder utilizar el modulo http se debe de importar 
   * el módulo HttpClientModule en en app.nodule.ts del @angular/common/http y colocarlo en los imports
   */
  constructor(private http:HttpClient){
    //Una forma de hacerlo, es la primera pero en una sola linea
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    //Obtenidno los resultados
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    //Segunda forma de hacerlo
  /*   if( localStorage.getItem('historial') )
    {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    } */
  }

  buscarGifs(query:string=''){

    query = query.trim().toLowerCase();

    if( !this._historial.includes(query) )
    {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      /**
       * Para no perder el historial cada vez que se recarga la pagina 
       * se utilizara el localstorage que viene por default en javascript
       */
       localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    //console.log(this._historial);

    /**
     * Vamos a darle orden a la búsqueda
     * 
     */
    const params = new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit','10')
          .set('q',query);
    
    this.http.get<SearchGifsResponse>(`${this.urlServicio}/search`,{params})
          .subscribe( resp => {
            //console.log(resp.data);
            this.resultados = resp.data;
            localStorage.setItem('resultados',JSON.stringify(this.resultados));
          });

    /**
     * Para poder dar un tipado a las peticiones nos puede ayudar mucho la pagina 
     * https://app.quicktype.io/ la cual nos ayuda a generar las interfaces para typescript a partir del 
     * la cadena Json.
     * En el get se indica con el generico el tipado
     */
  /*   this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=0SVsjvw8PLQ2qHr0gcauzQhECEciK92t&q=${query}&limit=10`)
        .subscribe( resp => {
          console.log(resp.data);
          this.resultados = resp.data;
          localStorage.setItem('resultados',JSON.stringify(this.resultados));
        }); */
  }
}
