import { AbstractControl, ValidationErrors } from "@angular/forms";
import ValidationUtils from "./validation";

export default class ValidatorsUtils {


    static IsNumber(control: AbstractControl): ValidationErrors | null {


        const value = control.value;

        if (value.length === 0) {
            return null;
        }

        return ValidationUtils.IsStringNumber(value) ?  null : { isNumber: true };
    }

    static IsNumberInteger(control: AbstractControl): ValidationErrors | null {

        const value = control.value;

        if (value.length === 0) {
            return null;
        }

        return ValidationUtils.IsStringNumberInteger(value) ? null : { isNumberInteger: true };

    }
    static IsNumberAndTwoDecimals(control: AbstractControl): ValidationErrors | null {


        const value = control.value;

        if (value.length === 0) {
            return null;
        }

        return ValidationUtils.IsStringNumberAndTwoDecimals(value) ? null : { isNumberAndTwoDecimals: true };


    }
}

