import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.scss']
})
export class HeaderClientComponent implements OnInit {
user:any;
  constructor(    private router: Router,
    private gs: GlobalService,

    ) { 

    }

  ngOnInit(): void {
    this.user=this.gs.getUser();
  }
  logOut(){
    this.gs.logOut()
    this.router.navigate(['']);
    }
  profile(){
    this.router.navigate(['/profile/']);

  }
}
