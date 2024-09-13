import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RateComponent } from "../rate/rate.component";
import { WatchListService } from '../services/watch-list.service';
import { CounterService } from '../services/counter.service';
import { SharedModule } from '../shared.module';
@Component({
  selector: 'app-watch-list-card',
  standalone: true,
  imports: [FontAwesomeModule, RateComponent ,SharedModule],
  templateUrl: './watch-list-card.component.html',
  styleUrl: './watch-list-card.component.css'
})
export class WatchListCardComponent {
  @Input() movie: any;
  counter: number = 0;
  isFavorite: boolean = true;
  constructor(private watchListService: WatchListService,private counterService: CounterService) { }
  

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.watchListService.removeFromWatchList(this.movie);
    
  }
  parseflout = (num: number) => {
    num=num/2;
    return num.toFixed(1);
  }
}
