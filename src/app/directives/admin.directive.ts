import { Directive, ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';

@Directive({
  selector: '[appAdmin]'
})
export class AdminDirective {

    constructor(el: ElementRef, public loginService: LoginService) {
        this.loginService.obsAdmin.subscribe(
            isAdmin => el.nativeElement.style.display = isAdmin ? 'block' : 'none');
    }

}
