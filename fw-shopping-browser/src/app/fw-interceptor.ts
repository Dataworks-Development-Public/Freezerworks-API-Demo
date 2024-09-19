import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";

    const keyStr: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    
    const username = "adminuser";
    const pword = "admin";

    export function intercept(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
       
        req = addAuthHeader(req);
        return next(req)
            .pipe(catchError((error) => handleHttpError(error, req)));
        }
  
        function handleHttpError (
          error: HttpErrorResponse,
          req: HttpRequest<unknown>
        ): Observable<any> {
          return of({error:"there was a problem"})
          }
  

    function addAuthHeader(req: HttpRequest<any>) {
        const modifiedRequest = req.clone({ setHeaders: { Authorization: 'Basic ' + encode(username + ':' + pword) } })
        // let modifiedRequest = req.clone({
        //     headers: req.headers.set('Authorization', 'Basic ' + encode(username + ':' + pword))
        // });
        return modifiedRequest;
    }


    function encode(input: string) {
    let output = '';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;

    chr1 = chr2 = chr3 = '' as string | number;
    enc1 = enc2 = enc3 = enc4 = '' as string | number;

    let i = 0;


    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output =
        output +
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);

      chr1 = chr2 = chr3 = '';
      enc1 = enc2 = enc3 = enc4 = '';
    }
    return output;
  }

