import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-reactive-form-input',
    imports: [ReactiveFormsModule, CommonModule],
    template: `
    <label [htmlFor]="id()" class="w-full">
        <p>{{label()}}</p>
        <input
        autocomplete="on"
        class="border w-full border-neutral p-2 rounded outline-none" 
        type="text" 
        [formControl]="control()" 
        [name]="id()" 
        [id]="id()"/>
    </label>
    @if (control().invalid && control().touched)  {
        <div *ngFor="let error of control().errors | keyvalue">
            <p class="text-primary">{{errors()[error.key]}}</p>
        </div>
    }
    `,
})
export default class ReactiveFormInput {

    public id = input.required<string>();
    public label = input.required<string>();
    public control = input.required<FormControl>();

    public errors = input.required<Record<string, string>>();
}