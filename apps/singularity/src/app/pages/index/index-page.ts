import { Component, OnInit } from '@angular/core';
import Sidebar from "../../shared/sidebar/sidebar";
import { Router, RouterOutlet } from '@angular/router';
import AuthService from '../../shared/services/auth.service';

@Component({
  selector: 'app-index-page',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './index-page.html',
})
export default class IndexPage implements OnInit {



  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {


    if(this.authService.isLogIn()) {
      this.router.navigate(['/admin']);
      return;
    }

    this.router.navigate(['/'])
  }
}
