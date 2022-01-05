import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import * as moment from 'moment';
import {AuthenticationService} from 'src/app/_service/admin/authentication.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  today!:string
  constructor(
    public router: Router,
    private authenService : AuthenticationService
  ) { }

  ngOnInit(): void {
    const now = moment();
    this.today = now.format('ddd, LL');
  }
  showFiller = false;

  logout(){
    this.authenService.doLogoutUser();
    this.router.navigate(['/login']);
  }
}
