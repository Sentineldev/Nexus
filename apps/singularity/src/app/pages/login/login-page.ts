import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import AuthService from '../../shared/services/auth.service';
import AuthRepository from '../../shared/interfaces/auth-repository.interface';
import ApiAuthRepository from '../../shared/repositories/api/api-auth-repository';
import { LogInDto } from '../../shared/dto/auth';
import { Loader } from "../../shared/loader/loader";
import { ErrorAlert } from "../../shared/alerts/error-alert";
import { catchError, finalize, map, of } from 'rxjs';
import { Result } from '../../shared/types/result';
import LocalStorageUtils from '../../utils/local-storage';
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


    const token = LocalStorageUtils.GetToken();

    if (token.length === 0) {
      return;
    }
    this.authService.logIn(token);

    if (this.authService.isLogIn()) {
      this.router.navigate(['/admin']);
      return;
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

        if (result.status === 201) {
          const token = result.body;
          this.authService.logIn(token);

          LocalStorageUtils.SaveToken(token);
          this.router.navigate(['/admin']);
          return;
        }

        this.loading.set(false);
        this.errorMessage.set(result.message);
      })
      // this.repository.logIn(body).pipe(
      //   map((success) => {

      //     const token = success.body;

      //     this.authService.logIn(token);


      //     LocalStorageUtils.SaveToken(token);

      //     this.router.navigate(['/admin']);

      //   }),
      //   catchError((error: Result<string>) => {
      //     this.errorMessage.set(error.message)
      //     return of()
      //   })
      //   ,
      //   finalize(() => {
      //     this.loading.set(false);
      //   })
      // ).subscribe()
    }

  }

}
