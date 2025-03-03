import { CommonModule } from "@angular/common";
import { Component, input, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-reactive-form-password-input',
    imports: [ReactiveFormsModule, CommonModule],
    template: `
    <label [htmlFor]="id()" class="w-full">
        <p>{{label()}}</p>
        <div class="flex border w-full border-neutral p-2 rounded">
            <input
            class="outline-none w-full flex-1" 
            [type]="inputType()"
            [formControl]="control()" 
            [name]="id()" 
            [id]="id()"/>
            <button (click)="onButtonClickHandler()" type="button">
                @if (inputType() === "text") {
                    <img src="/svg/eye-svgrepo-com.svg" alt="show password icon" width="24" height="24">
                } @else {
                    <img src="/svg/eye-slash-svgrepo-com.svg" alt="show password icon" width="24" height="24">
                }
            </button>
        </div>
    </label>
    @if (control().invalid && control().touched)  {
        <div *ngFor="let error of control().errors | keyvalue">
            <p class="text-primary">{{errors()[error.key]}}</p>
        </div>
    }
    `,
})
export default class ReactiveFormPasswordInput {

    public id = input.required<string>();
    public label = input.required<string>();
    public control = input.required<FormControl>();

    public inputType = signal<"password" | "text">("password");

    public errors = input.required<Record<string, string>>();


    onButtonClickHandler() {

        if (this.inputType() === "text") {
            this.inputType.set("password");
            return;
        }
        this.inputType.set("text");
    }
}