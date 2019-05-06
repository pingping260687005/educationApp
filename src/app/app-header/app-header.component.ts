import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})

@Injectable()
export class AppHeaderComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
