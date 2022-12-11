import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/models/film';
import { TMDBService } from 'src/app/service/tmdb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchStr:String;
  films:Film[];

  constructor(private route: ActivatedRoute, private TMDB:TMDBService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe( params => {
      this.searchStr = params.str;
      this.init();
    });
  }

  init() {
    this.films = new Array<Film>();

    this.TMDB.searchMovie(this.searchStr)
    .subscribe(data => {
     this.films = data.filter(f => f.backdrop_path);
    });
    
  }

}
