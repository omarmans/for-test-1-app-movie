import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {

  //#1 i created an array to hold all movies
  results: any[] = [];
  //#2 i created  an string value ,it will be the value of searchinput
  query: string = '';
  //#3 i created ACT_ROUTE to get query form url
  constructor(private route: ActivatedRoute) {}
  //#4 in ngOnInit  i subcribed  to get query and passes it to query_variable
  // #5 then i checked if there results in url convert it an array or return an empty array
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'] || '';
      this.results = params['results'] ? JSON.parse(params['results']) : [];
      console.log(this.query, this.results);
    });
  }
}





