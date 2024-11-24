import { Component } from '@angular/core';
@Component({
  selector: 'app-loader',
  imports: [],
  styles: `
    .loader {
    width: 32px;
    height: 32px;
    border: 4px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
  `,
  template: `
      <span class="loader"></span>
  `,
})
export class Loader {
}
