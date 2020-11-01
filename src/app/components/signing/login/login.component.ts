import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../signing.scss']
})
export class LoginComponent implements OnInit {

  public errorMsg: string;
  private loading = false;
  public loginForm: FormGroup;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  /* Init artist form. */
  private initForm(): void {
    this.loginForm = this.formBuilder.group({ 
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  public showError(msg: string) {
    this.errorMsg = msg;
  }

  private startLoading(): void {
    this.loading = true;
    this.loginForm.disable();
  }

  private stopLoading(): void {
    this.loading = false;
    this.loginForm.enable();
  }

  private cleanError(): void {
    this.errorMsg = undefined;
  }

  public login() {
    this.cleanError();
    this.startLoading();
    this.loginService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['']),
      error: e => {
        this.showError(e.message);
        this.stopLoading();
      }
    })
  }

  public goToSubscription(): void {
    this.router.navigate(['/subscribe']);
  }

  get isLoading(): boolean {
    return this.loading;
  }

}
