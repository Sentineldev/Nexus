import { Component, input } from '@angular/core';
@Component({
  selector: 'app-success-alert',
  imports: [],
  template: `
  <div class="bg-green-500 p-2 rounded-lg">
    <p class="font-sans text-black">{{message()}}</p>
  </div>
  `,
})
export class SuccessAlert {


    public message = input<string>("");

}
