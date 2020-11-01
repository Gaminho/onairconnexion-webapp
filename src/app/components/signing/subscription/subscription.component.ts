import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/interfaces/user';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['../signing.scss']
})
export class SubscriptionComponent implements OnInit {

  public errorMsg: string;
  private loading = false;
  public subscribeForm: FormGroup;

  constructor(private loginService: LoginService, 
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  /* Init artist form. */
  private initForm(): void {
    this.subscribeForm = this.formBuilder.group({ 
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      role: new FormControl(UserRole.MEMBER, [Validators.required])
    });
  }

  public showError(msg: string) {
    this.errorMsg = msg;
  }

  private startLoading(): void {
    this.loading = true;
    this.subscribeForm.disable();
  }

  private stopLoading(): void {
    this.loading = false;
    this.subscribeForm.enable();
  }

  private cleanError(): void {
    this.errorMsg = undefined;
  }

  public signUp() {
    this.cleanError();
    this.startLoading();
    this.loginService.signUp(this.subscribeForm.value).subscribe({
      next: () => this.router.navigate(['']),
      error: e => {
        this.showError(e.message);
        this.stopLoading();
      }
    });
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }

  get isLoading(): boolean {
    return this.loading;
  }

}
