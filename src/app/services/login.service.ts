import { Http, RequestOptions, Headers } from "@angular/http"
import { Injectable } from "@angular/core";

import { environment } from "../../environments/environment";

import { map } from 'rxjs/operators';
import { Observable, Subject } from "rxjs";

@Injectable()
export class LoginService {
  public static PROFILES = {
    CLIENT: 1,
    PROVIDER: 2,
    ADMIN: 3,
  }

  public loginEvent = new Subject<any>();
  
  constructor(public http: Http) {
  }

  login(access: any): Observable<string> {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Device', 'web')
    const url = `${environment.apiUrl}/login`

    console.log('[Lobo Info:] Login: ',url)
    
    const requestOptions = new RequestOptions({ headers: headers })

    return this.http.post(url, JSON.stringify(access), requestOptions)
      .pipe(map((response: any) => {
        response = response.json()
        localStorage.setItem('token', response.token)
        localStorage.setItem('perfilId', response.perfilId)
        localStorage.setItem('usuarioId', response.usuarioId)

        this.loginEvent.next({ logged: true })

        return response
      }))
  }

  logout() {
    localStorage.clear()
    this.loginEvent.next({ logged: false })
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token')
    const perfilId = localStorage.getItem('perfilId')

    if (token && perfilId == '3')
      return true
    else
      return false
  }
}