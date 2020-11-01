import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MHttpInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercepted request ... ');
        // Clone the request to add the new header.
        const request = req.clone({
            headers: req.headers.set('headerName', 'headerValue')
        });

        return next.handle(request);
    }
}