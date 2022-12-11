import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/models/film';
import { TMDBService } from 'src/app/service/tmdb.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  public id:String;
  public films:Film[];

  constructor(private route: ActivatedRoute, private TMDB:TMDBService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe( params => {
      this.id = params.id;
      this.init();
    });
  }

  init() {
    this.films = new Array<Film>();

    this.TMDB.getRecommendationsByMovie(this.id)
    .subscribe(data => {
     this.films = data.filter(f => f.backdrop_path).slice(0,6);
    });
  }

}
