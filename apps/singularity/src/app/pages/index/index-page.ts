import { Component } from '@angular/core';
import Sidebar from "../../shared/sidebar/sidebar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-index-page',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './index-page.html',
})
export default class IndexPage {
}
