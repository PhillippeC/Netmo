import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from 'src/app/models/film';
import { Person } from 'src/app/models/person';
import { NavigationService } from 'src/app/navigation-service';
import { TMDBService } from 'src/app/service/tmdb.service';

@Component({
  selector: 'app-actor-info',
  templateUrl: './actor-info.component.html',
  styleUrls: ['./actor-info.component.css']
})
export class ActorInfoComponent implements OnInit {

  credit_id: number;
  person: Person;
  imageSrc: string;

  constructor(private route: ActivatedRoute, private navigation: NavigationService, private TMDB: TMDBService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.credit_id = params.credit_id;
        this.init();
      });
  }

  init() {
    this.person = new Person();
    this.person.known_for = new Array<Film>();

    this.TMDB.getPersonByCredit(this.credit_id)
      .subscribe(data => {
        this.person = data;
        this.imageSrc = "https://image.tmdb.org/t/p/w500" + this.person.profile_path;

        //Get extra data from the API;
        this.TMDB.getPersonInfoById(this.person.id)
          .subscribe(data => {
            this.person.biography = data.biography;
            this.person.birthday = data.birthday;
          });
        this.TMDB.getMovieCreditsByPersonId(this.person.id)
        .subscribe(data => {
          this.person.known_for = data.filter(k => k.poster_path).sort((o1,o2) => o2.popularity - o1.popularity).slice(0,3);
        });
      });
  }

  back(): void {
    this.navigation.back()
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
