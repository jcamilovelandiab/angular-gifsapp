import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _history: string[] = [];

  constructor() { }

  get history() {
    return [...this._history];
  }

  searchGifs( query: string ) {
    query = query.trim().toLocaleLowerCase();
    if(query.length === 0 || this._history.includes(query)) return;

    this._history.unshift(query);
    this._history = this._history.splice(0,10);
    console.log(this._history);
  }

}
