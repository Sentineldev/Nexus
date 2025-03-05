import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-reactive-form-textarea',
    imports: [ReactiveFormsModule, CommonModule],
    template: `
    <label [htmlFor]="id()" class="w-full">
        <p>{{label()}}</p>
        <textarea 
        class="w-full border-neutral outline-none resize-none border rounded p-2"
        [name]="id()" 
        [id]="id()" 
        [formControl]="control()" 
        [rows]="rows()"
        >
        </textarea>
    </label>
    @if (control().invalid && control().touched)  {
        <div *ngFor="let error of control().errors | keyvalue">
            <p class="text-primary">{{errors()[error.key]}}</p>
        </div>
    }
    `,
})
export default class ReactiveFormTextArea {

    public id = input.required<string>();
    public label = input.required<string>();
    public rows = input.required<number>();
    public control = input.required<FormControl>();

    public errors = input.required<Record<string, string>>();
}