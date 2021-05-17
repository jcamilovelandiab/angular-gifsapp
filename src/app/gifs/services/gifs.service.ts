import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'rdlF8gx4mvaypQ7AnLJkGDa9d37qVafw';
  private _history: string[] = [];

  public results: any[];

  constructor( private httpClient: HttpClient ) { }

  get history() {
    return [...this._history];
  }

  searchGifs( query: string ) {
    query = query.trim().toLocaleLowerCase();
    if(query.length === 0 || this._history.includes(query)) return;

    this._history.unshift(query);
    this._history = this._history.splice(0,10);
    
    this.httpClient.get(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10'`)
      .subscribe( (response: any) => {
        console.log(response.data);
        this.results = response.data;
      });

  }

}
