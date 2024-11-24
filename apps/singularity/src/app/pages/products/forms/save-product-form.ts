import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SaveProduct } from '../interfaces/product-service.interface';

@Component({
  selector: 'app-save-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './save-product-form.html',
})
export default class SaveProductForm {


    @Output() newProductEvent = new EventEmitter<SaveProduct>();    

    formGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
    });


    async onSubmitHandler() {
        const formFields = this.formGroup.value;

        if (this.formGroup.valid) {
            const data: SaveProduct = {
                name: formFields.name!, 
                description: formFields.description!, 
            }
            this.newProductEvent.emit(data)
            this.formGroup.reset();
        }
    }

}
