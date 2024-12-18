import { Component, computed, input } from '@angular/core';
@Component({
  selector: 'app-loader',
  imports: [],
  styles: `
    .loader {
    width: 20px;
    height: 20px;
    // border: 4px solid #FFF;
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
      <span [className]="className()"></span>
  `,
})
export class Loader {


  public color = input<"primary" | "secondary">("primary");

  public className = computed(() => {
    return `loader border-[4px] ${this.color() === "primary" ? "border-white" : "border-black"}`;
  })
}
