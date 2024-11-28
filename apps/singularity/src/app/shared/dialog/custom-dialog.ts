import { Component, input } from '@angular/core';
@Component({
  selector: 'app-custom-dialog',
  imports: [],
  templateUrl: './custom-dialog.html',
})
export default class CustomDialog {


  public dialogId = input<string>("");

  constructor() {}

}
