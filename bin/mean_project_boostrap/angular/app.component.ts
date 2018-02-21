import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Constructor reserved for dependency injection to help the component setup.
export class AppComponent implements OnInit {
  title = 'Restful Tasks API';
  constructor(private _httpService: HttpService) { }
  ngOnInit() { }

}
