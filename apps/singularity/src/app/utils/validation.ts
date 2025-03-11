export default class ValidationUtils {


    static IsStringEmpty(str: string): boolean {
        return str.length === 0;
    }

    static IsStringNumber(str: string): boolean {

        if (this.IsStringEmpty(str)) {
            return false;
        }


        return !isNaN(Number(str));
    }

    static IsStringNumberInteger(str: string): boolean {

        if (this.IsStringEmpty(str)) {
            return false;
        }

        if (!(this.IsStringNumber(str))) {
            return false;
        }

        const splited = str.split(".");

        if (splited.length !== 1) {
            return false;
        }

        return true;
        
    }   

    static IsSingleStringNoSpaces(str: string) {

        if (this.IsStringEmpty(str)) {
            return false;
        }

        const splited = str.split(" ");


        return splited.length === 1;
    }

    static IsStringNumberAndTwoDecimals(str: string): boolean {

        if (this.IsStringEmpty(str)) {
            return false;
        }

        if (!(this.IsStringNumber(str))) {
            return false;
        }

        const splited = str.split(".");
        if (splited.length === 0 || splited.length > 2) {
            return false;
        }
        if (splited.length === 1) {
            return true;
        }
        const decimals = splited[1];
        if (decimals.length === 0) {
            return false
        }
        return decimals.length <= 2;
    }
}