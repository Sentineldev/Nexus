import { Component, Inject, signal } from "@angular/core";
import { SuccessAlert } from "../../../../components/alerts/success-alert";
import { ErrorAlert } from "../../../../components/alerts/error-alert";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Loader } from "../../../../components/loader/loader";
import ReactiveFormPasswordInput from "../../../../components/forms/reactive-password-input";
import ReactiveFormInput from "../../../../components/forms/reactive-input";
import ReactiveFormDateInput from "../../../../components/forms/reactive-date-input";
import UserRepository, { SaveUserDto } from "../../../../core/interfaces/user-repository";
import ApiUserRepository from "../../../../core/api/api-user-repository";
import ApiEmployeeRepository from "../../../../core/api/api-employee-repository";
import EmployeeRepository, { EMPLOYEE_EXISTS_ERROR_MESSAGE, SaveEmployeeDto } from "../../../../core/interfaces/employee-repository.interface";
import UsersPageService from "../users-page-service";

@Component({
    selector: `app-create-user-form`,
    template: `
    @if (errorMessage().length > 0 || successMessage().length > 0) {
        @if (errorMessage().length > 0) {
            <app-error-alert [message]="errorMessage()"/>
        }
        @if (successMessage().length > 0) {
            <app-success-alert [message]="successMessage()"/>
        }
    }
    <form [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()" class="w-full flex flex-col gap-6 py-2">
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
                <app-reactive-form-input
                label="Nombre de usuario"
                [id]="'username'"
                [control]="formGroup.controls.username"
                [errors]="{ required: 'No puedes dejar este campo vacio' }"
                />
                <app-reactive-form-input
                label="Nombre corto"
                [control]="formGroup.controls.shortName"
                [id]="'shortName'"
                [errors]="{ required: 'No puedes dejar este campo vacio' }"
                />
            </div>
            <div class="grid grid-cols-2 gap-4">
                <app-reactive-form-password-input
                label="Clave"
                [control]="formGroup.controls.password"
                [id]="'password'"
                [errors]="{ required: 'No puedes dejar este campo vacio' }"
                />
                <app-reactive-form-input
                label="Identificacion"
                [id]="'identification'"
                [control]="formGroup.controls.identification"
                [errors]="{ required: 'No puedes dejar este campo vacio' }"
                />   
            </div> 
            <div class="grid grid-cols-2 gap-4">
                <app-reactive-form-input
                label="Nombres"
                [id]="'firstNames'"
                [control]="formGroup.controls.firstNames"
                [errors]="{ required: 'No puedes dejar este campo vacio' }"
                />
                <app-reactive-form-input
                label="Apellidos"
                [control]="formGroup.controls.lastNames"
                [id]="'lastNames'"
                [errors]="{ required: 'No puedes dejar este campo vacio' }"
                />
            </div>
            <div class="grid grid-cols-2 gap-4">
                <app-reactive-form-input
                label="Correo Personal"
                [control]="formGroup.controls.personalEmail"
                [id]="'personalEmail'"
                [errors]="{ required: 'No puedes dejar este campo vacio', email: 'Ingrese un correo valido' }"
                />
                <app-reactive-form-input
                label="Correo Corporativo"
                [control]="formGroup.controls.corporativeEmail"
                [id]="'corporativeEmail'"
                [errors]="{ required: 'No puedes dejar este campo vacio', email: 'Ingrese un correo valido' }"
                />
            </div>
            <div class="grid grid-cols-2 gap-4">
                <app-reactive-form-input
                label="Departamento"
                [control]="formGroup.controls.department"
                [id]="'department'"
                [errors]="{ required: 'No puedes dejar este campo vacio' }"
                />
                <app-reactive-form-input
                label="Cargo"
                [control]="formGroup.controls.position"
                [id]="'position'"
                [errors]="{ required: 'No puedes dejar este campo vacio' }"
                />
            </div>
            <app-reactive-form-date-input
            label="Fecha de Ingreso"
            [control]="formGroup.controls.jobEntryDate"
            [id]="'position'"
            [errors]="{ required: 'No puedes dejar este campo vacio' }"
            />
        </div>
        <div>
            <button [disabled]="loading()" class="btn w-full" type="submit">
                @if (loading()) {
                    <app-loader/>
                } @else {
                    Crear
                }
            </button>
        </div>
    </form>
    `,
    imports: [SuccessAlert, ErrorAlert, ReactiveFormsModule, Loader, ReactiveFormPasswordInput, ReactiveFormInput, ReactiveFormDateInput]
})
export default class CreateUserForm {

    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");


    public formGroup = new FormGroup({
        username: new FormControl("", [Validators.required]),
        shortName: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
        firstNames: new FormControl<string>("",[Validators.required]),
        lastNames: new FormControl<string>("",[Validators.required]),
        identification: new FormControl<string>("",[Validators.required]),
        personalEmail: new FormControl<string>("",[Validators.required, Validators.email]),
        corporativeEmail: new FormControl<string>("",[Validators.required, Validators.email]),
        department: new FormControl<string>("",[Validators.required]),
        position: new FormControl<string>("",[Validators.required]),
        jobEntryDate: new FormControl<string>("",[Validators.required]),
    }); 


    constructor(
        @Inject(ApiUserRepository)
        private readonly userRepository: UserRepository,
        @Inject(ApiEmployeeRepository)
        private readonly employeeRepository: EmployeeRepository,
        private readonly usersPageService: UsersPageService,
    ) {}


    onSubmitHandler() {

        if (this.formGroup.valid) {

            this.errorMessage.set("");
            this.successMessage.set("");
            const value = this.formGroup.value;

            const employeeBody: SaveEmployeeDto = {
                firstNames: value.firstNames!,
                lastNames: value.lastNames!,
                corporativeEmail: value.corporativeEmail!,
                personalEmail: value.personalEmail!,
                department: value.department!,
                identification: value.identification!,
                jobDepartureDate: value.jobEntryDate!,
                jobEntryDate: value.jobEntryDate!,
                position: value.position!,
            };
            const userBody: SaveUserDto = {
                username: value.username!,
                shortName: value.shortName!,
                password: value.password!,
                employeeIdentification: value.identification!,
            };
            this.loading.set(true);
            this.employeeRepository.save(employeeBody).subscribe((employeeResult) => {

               setTimeout(() => {
                    if (employeeResult.length > 0 && employeeResult !== EMPLOYEE_EXISTS_ERROR_MESSAGE) {
                        this.loading.set(false);
                        this.errorMessage.set(employeeResult);
                        return;
                    }

                    this.userRepository.save(userBody).subscribe((userResult) => {
                        this.loading.set(false);
                        if (userResult.length > 0) {
                            this.errorMessage.set(userResult);
                            return;
                        }
                        this.formGroup.reset();
                        this.usersPageService.getUsers();
                        this.successMessage.set("Creado exitosamente");
                    });
               }, 1000);
            });

        }
    }

}   