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

  onContainerClick(event: MouseEvent) {
    const dialog = (event.target as HTMLDivElement).parentElement as HTMLDialogElement;

    if (!dialog) {
      return;
    }
    if (!(dialog.tagName === "DIALOG")) {
      return;
    }
    dialog.close();

  }

  onClickHandler(event: MouseEvent) {


    const dialog = event.target as HTMLDialogElement;


    if (!(dialog.tagName === "DIALOG")) {
      return;
    }

    dialog.close();
  }

}
