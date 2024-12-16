import { Component, EventEmitter, input, Output } from '@angular/core';
@Component({
  selector: 'app-custom-dialog',
  imports: [],
  templateUrl: './custom-dialog.html',
})
export default class CustomDialog {


  @Output() onCloseEvent = new EventEmitter();

  public dialogId = input<string>("");

  constructor() {}


  onCloseHandler() {
    this.onCloseEvent.emit();
  }

}
