import { CommonModule } from "@angular/common";
import { Component, input, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import ReactiveSelectInput from "./reactive-select-input";

@Component({
    selector: 'app-reactive-form-input-toggable',
    imports: [ReactiveFormsModule, CommonModule],
    template: `
    <div class="flex items-end gap-4">
        <label [htmlFor]="id()" class="w-full">
            <p>{{label()}}</p>
            @if (toggle()) {
                <input
                autocomplete="on"
                class="border w-full border-neutral p-2 rounded outline-none" 
                type="text" 
                [formControl]="control()" 
                [name]="id()" 
                [id]="id()"/>
            } @else {
                <div class="w-full border border-neutral rounded p-2">
                    <select
                    [id]="id()"
                    [name]="id()"
                    [formControl]="control()"
                    autocomplete="on"
                    class="font-normal rounded outline-none w-full"
                    >
                        @for (record of data(); track $index) {
                            <option [value]="record.value">{{record.label}}</option>
                        }
                    </select>
                </div>
            }
        </label>
        <label [htmlFor]="'checkbox-'+id()" class="switch">
            <input (change)="onChangeHandler()" type="checkbox" [name]="'checkbox-'+id()" [id]="'checkbox-'+id()">
            <span class="slider round"></span>
        </label>
    </div>
    @if (control().invalid && control().touched)  {
        <div *ngFor="let error of control().errors | keyvalue">
            <p class="text-primary">{{errors()[error.key]}}</p>
        </div>
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