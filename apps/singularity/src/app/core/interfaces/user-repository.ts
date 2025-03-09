import { Observable } from "rxjs";
import User from "../classes/user.class";
export type SaveUserDto = {
    username: string;
    password: string;
};

export type UpdateUserDto = {
    username: string;
};

export type UpdateUserPasswordDto = {
    password: string;
};

export default interface UserRepository {


    save(body: SaveUserDto): Observable<string>;
    update(id: string, body: UpdateUserDto): Observable<string>;
    changePassword(id: string, body: UpdateUserPasswordDto): Observable<string>;
    delete(id: string): Observable<string>;
    getAll(): Observable<User[]>
}