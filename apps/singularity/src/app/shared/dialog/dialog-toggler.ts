import { Component, input } from '@angular/core';
@Component({
  selector: 'app-dialog-toggler',
  imports: [],
  template: `
    <button (click)="onClickHandler()" type="button">
        <ng-content></ng-content>
    </button>
  `,
})
export default class DialogToggler {



    public dialogId = input<string>("");
    constructor() {}


    onClickHandler() {

        const dialog = document.getElementById(this.dialogId()) as HTMLDialogElement;
        if (dialog) {
            dialog.showModal();
        }

    }

}
