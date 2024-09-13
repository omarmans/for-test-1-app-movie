import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Router, RouterLink } from '@angular/router';
import { WatchListService } from '../services/watch-list.service';
import { RateComponent } from "../rate/rate.component";

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink, RateComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
    movieService= inject(MoviesService);
    watchListArray:any[]=[];
    watchListservice= inject(WatchListService);
  isHoverd: boolean = false;


@Input() movieData:any;
@Output() sendToParent = new EventEmitter<number>();
constructor(private router:Router){}
ngOnInit() {
  this.watchListArray = this.watchListservice.getWatchList();
}
  navigateToDetails(id: number) {
    this.sendToParent.emit(id);
    this.router.navigate([`/movie-details/${id}`]);
}
  hoverd() {
    this.isHoverd = !this.isHoverd;
    if (this.isHoverd) {
      this.watchListservice.addToWatchList(this.movieData);
    }else{
      this.watchListservice.removeFromWatchList(this.movieData);
    }
  }
}
