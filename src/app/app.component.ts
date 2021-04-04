import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MakeApp';

  constructor(private router: Router) {
    router.events.subscribe((val) => {console.log('VAl: ',val)}/*whatever*/)
  }
}
