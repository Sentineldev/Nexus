import { Component, computed, effect, OnInit } from '@angular/core';
import Sidebar from "../../shared/sidebar/sidebar";
import { Router, RouterOutlet } from '@angular/router';
import AuthService from '../../shared/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { JwtData } from '../../shared/types/jwt';
import JwtUtils from '../../utils/jwt';
import LocalStorageUtils from '../../utils/local-storage';
import Topbar from "../../shared/topbar/topbar";

@Component({
  selector: 'app-index-page',
  imports: [Sidebar, RouterOutlet, Topbar],
  templateUrl: './index-page.html',
})
export default class IndexPage implements OnInit {



  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {

    if (this.authService.isLogIn()) {
      this.router.navigate(['/admin']);
      return;
    }


    const token = LocalStorageUtils.GetToken();
    if (token.length > 0) {
      this.authService.logIn(token);
      if (this.authService.isLogIn()) {
        this.router.navigate(['/admin']);
      }
      return;
    }
   
    this.router.navigate(['/']);
      
  }
}
