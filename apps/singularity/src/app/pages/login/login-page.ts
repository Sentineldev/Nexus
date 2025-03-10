import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AuthRepository from '../../core/interfaces/auth-repository.interface';
import ApiAuthRepository from '../../core/api/api-auth-repository';
import { LogInDto } from '../../components/dto/auth';
import { Loader } from "../../components/loader/loader";
import { ErrorAlert } from "../../components/alerts/error-alert";
import LocalStorageUtils from '../../utils/local-storage';
import ReactiveFormInput from "../../components/forms/reactive-input";
import ReactiveFormPasswordInput from "../../components/forms/reactive-password-input";
import JwtUtils from '../../utils/jwt';
import { JwtData } from '../../core/types/jwt';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, Loader, ErrorAlert, ReactiveFormInput, ReactiveFormPasswordInput],
  templateUrl: './login-page.html',
})
export default class LoginPage implements OnInit {


  public defaultNavigation = ["/admin/restaurants"];
  
  public errorMessage = signal("");
  public loading = signal(false);


  public formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(
    private readonly router: Router,
    @Inject(ApiAuthRepository)
    private readonly repository: AuthRepository
  ) {}
  ngOnInit(): void {


    const token = LocalStorageUtils.GetToken();
    try {
      const tokenData: JwtData = jwtDecode(token);
  
      if (!JwtUtils.IsJwtExpired(tokenData.exp)) {
        this.router.navigate(this.defaultNavigation);
        return;
      }
    } catch (error) {
      LocalStorageUtils.DeleteToken();
    }

  }


  onSubmitHandler() {
    if (this.formGroup.valid) {

      const data = this.formGroup.value;

      const body: LogInDto = {
        password: data.password!,
        username: data.username!
      };

      this.loading.set(true);
      this.errorMessage.set("");
      this.repository.logIn(body).subscribe((result) => {

        setTimeout(() => {
          if (result.status === 201) {
            const token = result.body;
            LocalStorageUtils.SaveToken(token);
            this.router.navigate(this.defaultNavigation);
            return;
          }
  
          this.loading.set(false);
          this.errorMessage.set(result.message);
        }, 1000);
      });
    }

  }

}
