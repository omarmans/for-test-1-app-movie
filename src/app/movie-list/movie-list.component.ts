import { Component, Input } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { RouterLink } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from '../search/search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    MovieCardComponent,
    RouterLink,
    NgbRatingModule,
    SearchComponent,
    CommonModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  starConfig: any;
  @Input() rating: number = 0;
 filteredMoviesList: any = []
  moviesList: any;
  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe((data: any) => {
      this.moviesList = data.results;
            this.filteredMoviesList = data.results; 

    });

  }

    filterMovies(searchValue: string) {
    this.filteredMoviesList = this.moviesList.filter((movie: any) =>
      movie.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  reciveFromChild(id: number) {
    console.log('FROM PARENT', id);
  }
}
