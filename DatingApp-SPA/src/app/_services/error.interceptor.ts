import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          console.log("ErrorInterceptor:", err);
          // unauthorized
          if (err.status === 401) {
            // console.log("401", err.statusText);
            return throwError(err.statusText);
          }

          // handled exception
          const applicationError = err.headers.get("Application-Error");

          if (applicationError) {
            // console.log("applicationError:", applicationError);
            return throwError(applicationError);
          }

          // Catch All other server errors
          const serverErr = err.error;

          let modalStateErrs = "";

          // Catch are Modal Errors
          if (serverErr && typeof serverErr === "object") {
            // console.log("serverErr:", serverErr);
            for (const key in serverErr) {
              // check for props in obj
              if (serverErr[key]) {
                modalStateErrs += serverErr[key] + "\n";
              }
            }
          }
          return throwError(modalStateErrs || serverErr || "Server Error");
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
