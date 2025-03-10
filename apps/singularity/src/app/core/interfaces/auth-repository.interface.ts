import { Observable } from "rxjs";
import { LogInDto } from "../../components/dto/auth";
import { Result } from "../types/result";

export default interface AuthRepository {

    logIn(body: LogInDto): Observable<Result<string>>

}