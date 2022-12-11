import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/models/film';
import { Genre } from 'src/app/models/genre';
import { TMDBService } from 'src/app/service/tmdb.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  constructor(private route: ActivatedRoute, private TMDB: TMDBService) { }

  id:number;
  films:Film[]
  genre:Genre;

  ngOnInit(): void {

    this.route.params
    .subscribe(params => {
      this.id = params.id;
      this.init();
    });
  }

  init() {
    this.films = Array<Film>();

    this.TMDB.getGenreById(this.id).subscribe(genre => this.genre = genre);

    this.TMDB.getFilmByGenre(this.id).subscribe(f => {
      this.films = f.filter(f => f.backdrop_path);
    });
    
  }

}
