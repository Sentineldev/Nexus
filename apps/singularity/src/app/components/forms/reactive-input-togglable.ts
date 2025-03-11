import { CommonModule } from "@angular/common";
import { Component, input, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import ReactiveSelectInput from "./reactive-select-input";

@Component({
    selector: 'app-reactive-form-input-toggable',
    imports: [ReactiveFormsModule, CommonModule, ReactiveSelectInput],
    template: `
    <div class="flex items-end gap-4">
        <div class="flex items-end gap-4">
            @if(toggle())  {
                <app-reactive-select-input
                [control]="control()"
                [errors]="errors()"
                [id]="id()"
                [label]="label()"
                >
                @for (record of data(); track $index) {
                    <option [value]="record.value">{{record.label}}</option>
                }
                </app-reactive-select-input>
            }@else {
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
                
            }
            <input (change)="onChangeHandler()" type="checkbox" [name]="id()+'check-box'" [id]="id()+'check-box'">
        </div>
    </div>
    @if(!toggle()) {
        @if (control().invalid && control().touched)  {
            <div *ngFor="let error of control().errors | keyvalue">
                <p class="text-primary">{{errors()[error.key]}}</p>
            </div>
        }
    }
    `,
})
export default class ReactiveFormInputToggable {

    public data = input.required<{ label: string, value: string }[]>();
    public id = input.required<string>();
    public label = input.required<string>();
    public control = input.required<FormControl>();

    public toggle = signal<boolean>(false);


    public errors = input.required<Record<string, string>>();

    onChangeHandler() {
        this.toggle.update((current) => !current);
    }
}