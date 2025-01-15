export default class DecimalsUtils {


    public static CURRENCY_DECIMALS = 2;


    public static ROUND_TO_2_DECIMALS(value: number): number {
        return this.ROUND_TO_N_DECIMALS(value, 2);
    }

    private static ROUND_TO_N_DECIMALS(value: number, n: number): number {


        let numbStr = "1";
        for (let index = 0; index < n; index++) {
            numbStr = numbStr.concat("0");
        }
    
        const numbParsed = parseInt(numbStr);
    
        return Math.round(value * numbParsed) / numbParsed;
    }
}