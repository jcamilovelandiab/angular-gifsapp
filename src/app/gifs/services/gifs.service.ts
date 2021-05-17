import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'rdlF8gx4mvaypQ7AnLJkGDa9d37qVafw';
  private _history: string[] = [];

  public results: Gif[];

  constructor( private httpClient: HttpClient ) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  get history() {
    return [...this._history];
  }

  searchGifs( query: string ) {
    query = query.trim().toLocaleLowerCase();
    if(query.length === 0) return;

    if(!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0,10);
      localStorage.setItem('history', JSON.stringify(this._history));
    }
    
    this.httpClient.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10'`)
      .subscribe( (response: SearchGifsResponse) => {
        this.results = response.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }

}
