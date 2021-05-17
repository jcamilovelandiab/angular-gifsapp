import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interfaces/gifs.interfaces';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent implements OnInit {

  constructor( private gifsService: GifsService ) { }

  get results () : Gif[] {
    return this.gifsService.results;
  }

  ngOnInit(): void {
  }

}
