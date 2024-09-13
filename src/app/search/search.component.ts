import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  // #1 get the searchBtn
  @ViewChild('search') search!: ElementRef;
  //to disable the button if the value is ''
  disabled = true;
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {}
  //#2  in ngAfterViewInit i used  nativeElement to do addEventListener to bring the value of searchInput
  ngAfterViewInit(): void {
    this.search.nativeElement.addEventListener('input', () => {
      const searchValue = this.search.nativeElement.value.trim();
      // console.log(searchValue)
      // disable the button if the value is ''
 if (searchValue) {
             this.searchEvent.emit(searchValue); 

    }else{
            this.searchEvent.emit('');

    }
      this.disabled = searchValue === '';
    });

   
  }
  //#3 i created a fn  which take a value the turns it to lowecase then i check if the searchValue is true , i will use the services to bring (serarchedMovie) and Pass the searchValue
  //as an argument then subscribe to get all movies then i created filteredMovies to filter movies by movie title which include searchValue

  // #4 i created (router:Router) to navigate to (SearchResult Component) and Pass the paramters
  //#5 i added   searchResults() on click on btn in templete
  searchResults() {
    const searchValue = this.search.nativeElement.value.toLowerCase();
    if (searchValue) {
      console.log(searchValue);

      //emit the value
       this.searchEvent.emit(searchValue); 
      this.moviesService
        .serarchedMovie(searchValue)
        .subscribe((movies: any) => {
          console.log(movies.results);
          const filteredMovies = movies.results.filter((movie: any) =>
            movie.title.toLowerCase().includes(searchValue)
          );
          console.log(filteredMovies);

        //check
      if (filteredMovies.length > 0) {
       
        this.router.navigate(['/searchResults'], {
          queryParams: {
            query: searchValue,
            results: JSON.stringify(filteredMovies),
          },
        });
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }
}}


