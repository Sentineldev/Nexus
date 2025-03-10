import { Component, input } from '@angular/core';
@Component({
  selector: 'app-error-alert',
  imports: [],
  template: `
  <div class="bg-red-500 p-2 rounded-lg">
    <p class="font-sans text-white">{{message()}}</p>
  </div>
  `,
})
export class ErrorAlert {
    public message = input<string>("");
}
