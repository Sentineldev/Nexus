import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import AuthService from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
})
export default class Sidebar {



  constructor(
    private readonly authService: AuthService
  ) {}

  onClickHandler() {
    this.authService.logOut();

    window.location.reload();
  }
}
