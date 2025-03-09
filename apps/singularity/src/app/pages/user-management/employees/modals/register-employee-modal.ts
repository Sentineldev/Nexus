import { Component, Inject, input, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Loader } from "../../../../components/loader/loader";
import ReactiveFormInput from "../../../../components/forms/reactive-input";
import { SuccessAlert } from "../../../../components/alerts/success-alert";
import { ErrorAlert } from "../../../../components/alerts/error-alert";
import CustomDialog from "../../../../components/dialog/custom-dialog";
import EmployeeRepository, { SaveEmployeeDto } from "../../../../core/interfaces/employee-repository.interface";
import ApiEmployeeRepository from "../../../../core/api/api-employee-repository";
import EmployeesPageService from "../employees-page.service";
import ReactiveFormDateInput from "../../../../components/forms/reactive-date-input";

@Component({
    selector: `app-register-employee-modal`,
    template: `
    <app-custom-dialog [dialogId]="dialogId()">
        <div class="p-6 bg-white m-auto lg:w-[600px] rounded-xl flex flex-col gap-4">
            <h1 class="text-center font-sans text-xl font-medium text-primary">Registrar Empleado</h1>

            @if (errorMessage().length > 0 || successMessage().length > 0) {

                @if (errorMessage().length > 0) {
                    <app-error-alert [message]="errorMessage()"/>
                }
                @if (successMessage().length > 0) {
                    <app-success-alert [message]="successMessage()"/>
                }
            }
            <form [formGroup]="formGroup" (ngSubmit)="onSubmitHandler()" class="w-full flex flex-col gap-6">
                <div class="flex flex-col gap-4">
                    <app-reactive-form-input
                    label="Identificacion"
                    [id]="'identification'"
                    [control]="formGroup.controls.identification"
                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                    />    
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
                    <app-reactive-form-date-input
                    label="Fecha de Ingreso"
                    [control]="formGroup.controls.jobEntryDate"
                    [id]="'position'"
                    [errors]="{ required: 'No puedes dejar este campo vacio' }"
                    />
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
                <div>
                    <button [disabled]="loading()" class="btn w-full" type="submit">
                        @if (loading()) {
                            <app-loader/>
                        } @else {
                            Registrar
                        }
                    </button>
                </div>
            </form>
        </div>
    </app-custom-dialog>
   
    `,
    imports: [ReactiveFormsModule, Loader, ReactiveFormInput, SuccessAlert, ErrorAlert, CustomDialog, ReactiveFormDateInput]
})
export default class SaveUserModal {

    public dialogId = input.required<string>();

    public loading = signal(false);
    public errorMessage = signal("");
    public successMessage = signal("");

    public formGroup = new FormGroup({
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
        @Inject(ApiEmployeeRepository)
        private readonly repository: EmployeeRepository,
        private readonly pageService: EmployeesPageService,
    ) {}


    onSubmitHandler() {
        if (this.formGroup.valid) {

            const data = this.formGroup.value;

            const body: SaveEmployeeDto = {
                firstNames: data.firstNames!,
                lastNames: data.lastNames!,
                personalEmail: data.personalEmail!,
                corporativeEmail: data.corporativeEmail!,
                department: data.department!,
                position: data.position!,
                identification: data.identification!,
                jobEntryDate: data.jobEntryDate!,
                jobDepartureDate: data.jobEntryDate!,
            };

            this.loading.set(true);
            this.errorMessage.set("");
            this.successMessage.set("");
            this.repository.save(body).subscribe((result) => {
                setTimeout(() => {
                    this.loading.set(false);
                    if (result.length === 0) {
                        this.successMessage.set("Empleado registrado correctamente");
                        this.pageService.fetch();
                        this.formGroup.reset();
                        return;
                    }
                    this.errorMessage.set(result);
                }, 1000);
            })
        }
    }
}