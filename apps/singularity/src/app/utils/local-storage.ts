export default class LocalStorageUtils {

    private static tokenKey = "nexus-token";

    static SaveToken(token: string) {

        localStorage.setItem(this.tokenKey, token);
    }

    static GetToken(): string {

        const result = localStorage.getItem(this.tokenKey);
        return result ?? "";
    }

    static DeleteToken() {
        localStorage.removeItem(this.tokenKey);
    }
}