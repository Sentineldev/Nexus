import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AuthService from '../../shared/services/auth.service';
import AuthRepository from '../../shared/interfaces/auth-repository.interface';
import ApiAuthRepository from '../../shared/repositories/api-auth-repository';
import { LogInDto } from '../../shared/dto/auth';
import { Loader } from "../../shared/loader/loader";
import { ErrorAlert } from "../../shared/alerts/error-alert";
@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, Loader, ErrorAlert],
  templateUrl: './login-page.html',
})
export default class LoginPage implements OnInit {



  public errorMessage = signal("");
  public loading = signal(false);

  public formGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    @Inject(ApiAuthRepository)
    private readonly repository: AuthRepository
  ) {}
  ngOnInit(): void {

    if (this.authService.isLogIn()) {
      this.router.navigate(['/admin']);
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
          this.loading.set(false);
          if (!result.hasError) {
            this.formGroup.reset();

            this.authService.logIn({
              id: "",
              username: ""
            });
            this.router.navigate(['/admin'])
            return;
          }
          this.errorMessage.set(result.message)
        }, 1000);
      })
      

    }

  }

}
