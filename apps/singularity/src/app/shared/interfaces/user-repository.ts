import { Observable } from "rxjs";
import { SaveUserDto, UpdateUserDto, UpdateUserPasswordDto } from "../../pages/users/user.dto";
import User from "../../pages/users/user.class";

export default interface UserRepository {


    save(body: SaveUserDto): Observable<string>;
    update(id: string, body: UpdateUserDto): Observable<string>;
    changePassword(id: string, body: UpdateUserPasswordDto): Observable<string>;
    delete(id: string): Observable<string>;
    getAll(): Observable<User[]>
}