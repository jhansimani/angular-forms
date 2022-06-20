import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let date = Date.now().toString();
    let clonedRequest = request.clone({
      // headers: request.headers.set('request made at', date),
      setHeaders: { Request: date },
    });
    console.log(clonedRequest);
    return next.handle(clonedRequest);
  }
}
