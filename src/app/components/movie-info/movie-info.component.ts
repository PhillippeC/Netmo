import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cast } from 'src/app/models/cast';
import { Film } from 'src/app/models/film';
import { TMDBService } from 'src/app/service/tmdb.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  film: Film;
  casts: Cast[];
  id: number;
  imageSrc: String;
  releaseDate: String;
  trailerVideoID:String;

  constructor(private route: ActivatedRoute, private TMDB: TMDBService) {
  }

  ngOnInit(): void {

    this.route.params
      .subscribe(params => {
        this.id = params.id;
        this.init();
      });
  }

  init() {
    this.film = new Film();
    this.casts = new Array<Cast>();

    this.TMDB.getFilmByName(this.id)
      .subscribe(data => {
        this.film = data;
        this.imageSrc = "https://image.tmdb.org/t/p/w500" + this.film.poster_path;
        if(typeof this.film.videos.results[0] != 'undefined') {
          this.trailerVideoID = "https://www.youtube.com/watch?v=" + this.film.videos.results[0].key;
        }
      });

    this.TMDB.getCastByMovie(this.id)
      .subscribe(data => {
        //Checks if the cast has a profile image
        this.casts = data.filter(c => c.profile_path).slice(0, 3);
      });

    this.TMDB.getFilmReleaseDatesByName(this.id)
      .subscribe(date => this.releaseDate = this.formatDate(date));
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

}
