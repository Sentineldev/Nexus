export default class JwtUtils {



    static IsJwtExpired(time: number): boolean {
        return (time) < Math.floor(Date.now() / 1000);

    }
}