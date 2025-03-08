import { Observable } from "rxjs";
import User from "../../pages/user-management/users/user.class";
import { SaveUserDto, UpdateUserDto, UpdateUserPasswordDto } from "../../pages/user-management/users/user.dto";

export default interface UserRepository {


    save(body: SaveUserDto): Observable<string>;
    update(id: string, body: UpdateUserDto): Observable<string>;
    changePassword(id: string, body: UpdateUserPasswordDto): Observable<string>;
    delete(id: string): Observable<string>;
    getAll(): Observable<User[]>
}