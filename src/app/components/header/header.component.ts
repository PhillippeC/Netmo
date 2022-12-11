import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Genre } from 'src/app/models/genre';
import { TMDBService } from 'src/app/service/tmdb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private TMDB: TMDBService) { }

  searchStr: String;
  filmsByGenre: Genre[];

  ngOnInit(): void {
    this.searchStr = "";

    this.filmsByGenre = Array<Genre>();

    this.TMDB.getGenres().subscribe(genres => {
      genres.forEach(g => {
        this.filmsByGenre.push(g);
      });
    });
  }

  btnRechercher() {

  }

}
