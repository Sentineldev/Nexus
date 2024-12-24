import { Component,OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import AuthService from '../../shared/services/auth.service';
import LocalStorageUtils from '../../utils/local-storage';
import Topbar from "../../shared/topbar/topbar";

@Component({
  selector: 'app-index-page',
  imports: [RouterOutlet, Topbar],
  templateUrl: './index-page.html',
})
export default class IndexPage implements OnInit {



  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {

    const token = LocalStorageUtils.GetToken();
    if (token.length > 0) {
      this.authService.logIn(token);
      return;
    }
    this.router.navigate(['/']);
      
  }
}
