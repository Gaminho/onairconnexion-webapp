import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public error = false;
  public alertType = '';

  public loginForm: FormGroup;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder,
    private router: Router,) {
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

  public showSuccess() {
    this.error = true;
    this.alertType = 'success';
    setTimeout(() => this.error = false, 3 * 1000);
  }

  public showError() {
    this.error = true;
    this.alertType = 'error';
    setTimeout(() => this.error = false, 3 * 1000);
  }

  public login() {
    this.loginService.login({login: '', password: this.loginForm.controls['password'].value}).subscribe({
      next: () => {
        this.showSuccess();
        this.router.navigate(['']);
      },
      error: () => this.showError()
    });
  }

}
