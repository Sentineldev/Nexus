import { Component, computed, Inject, signal } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import ApiUserRepository from "../../../../core/api/api-user-repository";
import Employee from "../../../../core/classes/employee.class";
import UserRepository, { SaveUserDto } from "../../../../core/interfaces/user-repository";
import UsersPageService from "../users-page-service";
import EmployeesService from "./employees.service";
import { ErrorAlert } from "../../../../components/alerts/error-alert";
import { SuccessAlert } from "../../../../components/alerts/success-alert";
import ReactiveFormInput from "../../../../components/forms/reactive-input";
import ReactiveFormPasswordInput from "../../../../components/forms/reactive-password-input";
import { Loader } from "../../../../components/loader/loader";

@Component({
    selector: `app-assign-user-form`,
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
                label="Nombre Corto"
                [id]="'shortName'"
                [control]="formGroup.controls.shortName"
                [errors]="{ required: 'No puedes dejar este campo vacio' }"
                />
            </div>
            <app-reactive-form-password-input
            label="Clave"
            [control]="formGroup.controls.password"
            [id]="'password'"
            [errors]="{ required: 'No puedes dejar este campo vacio' }"
            />
        </div>

        <div class="w-full">
            <div class=" border-b-2 py-2 border-b-neutral w-full flex items-center gap-2">
                <img src="/svg/search-svgrepo-com.svg" alt="Search icon" width="24" height="24">
                <input (change)="onInputChangeHandler($event)" class="w-full outline-none" type="search" placeholder="Buscar empleado..." name="search-employee" id="search-employee">
            </div>
            @if (employeesState().loading) {
                <div class="pt-2">
                    <app-loader color="secondary"/>
                </div>
            }
            @if (employeesState().employees) {
                <div class="flex flex-col">
                    @for (employee of employeesState().employees!.data; track employee.id) {
                        @if (selectedEmployee() && selectedEmployee()!.id == employee.id) {
                            <div class="p-2 bg-neutral-300">
                                <h1>{{employee.firstNames}} {{employee.lastNames}}</h1>
                                <p class="text-primary">{{employee.identification}}</p>
                            </div>
                        } @else {
                            <div (click)="onSelectEmployeeHandler(employee)" class="p-2 cursor-pointer transition-all hover:bg-neutral-200">
                                <h1>{{employee.firstNames}} {{employee.lastNames}}</h1>
                                <p class="text-primary">{{employee.identification}}</p>
                            </div>
                        }
                    }
                </div>
            }
            
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
    imports: [ErrorAlert, SuccessAlert, ReactiveFormInput, ReactiveFormPasswordInput, Loader, ReactiveFormsModule]
})
export default class AssignUserForm {
    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");


    public selectedEmployee = signal<Employee | undefined>(undefined);

    public employeesState = computed(() => this.employeeService.getState());

    public formGroup = new FormGroup({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
        shortName: new FormControl("", [Validators.required]),
    });

    constructor(
        @Inject(ApiUserRepository)
        private readonly repository: UserRepository,
        private readonly pageService: UsersPageService,
        private readonly employeeService: EmployeesService,
    ) {}

    onInputChangeHandler(event: Event) {

        const target = event.target as HTMLInputElement;

        const value = target.value;

        this.employeeService.getPage({ ...this.employeesState().filter, filter: { search: value } });
    }


    onSelectEmployeeHandler(employee: Employee) {
        this.selectedEmployee.set(employee);
    }

    onSubmitHandler() {
        const employee = this.selectedEmployee();
        if (this.formGroup.valid && employee) {

            const data = this.formGroup.value;

            const body: SaveUserDto = {
                username: data.username!,
                password: data.password!,
                employeeIdentification: employee.identification,
                shortName: data.shortName!,
            };

            this.loading.set(true);
            this.errorMessage.set("");
            this.successMessage.set("");
            this.repository.save(body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.successMessage.set("Usuario creado correctamente");
                        this.pageService.getUsers();
                        this.formGroup.reset();
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            })
        }
    }
}