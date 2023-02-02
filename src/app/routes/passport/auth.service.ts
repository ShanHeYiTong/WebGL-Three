import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  md5pass = true;
  setMd5pass(passFlg: boolean) {
    this.md5pass = passFlg;
  }

  getMd5Pass(): boolean {
    return this.md5pass;
  }
  login(params: any, url: string = 'http://192.168.0.140:9000/api/auth/login', baseUrl = '') {
    return this.http.post(baseUrl + url, params);
  }

  profile(url = 'api/auth/profile', baseUrl = '') {
    return this.http.get(baseUrl + url, this.getHeaders());
  }

  getHeaders() {
    const token = this.cookieService.get('access_token');
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  check(): boolean {
    const token = this.cookieService.get('access_token');
    const profile = this.cookieService.get('profile');
    if (token && profile) {
      return true;
    } else {
      return false;
    }
  }
}
