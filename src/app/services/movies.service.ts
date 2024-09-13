import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl =
    'https://api.themoviedb.org/3/movie/now_playing?api_key=b6d1b0c65bcc889f545646a926fb22b9';

  constructor(private http: HttpClient) {}
  getMovies() {
    return this.http.get(this.apiUrl);
  }
  private movie: any[] = [];

  addToWatchListArray(data: any) {
    this.movie.push(data);
  }
  serarchedMovie(searchValue: string) {
    // return this.http.get(`${this.apiUrl}&query={${searchValue}}`);
    return this.http.get(
      `${this.apiUrl}&query=${encodeURIComponent(searchValue)}`
    );
  }
  getMovie() {
    return this.movie;
  }
}
