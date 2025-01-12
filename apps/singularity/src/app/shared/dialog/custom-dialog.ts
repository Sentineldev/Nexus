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

  onClickHandler(event: MouseEvent) {




    const dialog = event.target as HTMLDialogElement;


    if (!(dialog.tagName === "DIALOG")) {
      return;
    }

    var rect = dialog.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      dialog.close();
    }
  }

}
