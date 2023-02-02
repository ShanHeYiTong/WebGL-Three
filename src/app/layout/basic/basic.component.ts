import { Component } from '@angular/core';
import { SettingsService, User } from '@delon/theme';
import { environment } from '@env/environment';
import {CookieService} from "@delon/util";
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, tap } from 'rxjs';
@Component({
  selector: 'layout-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.less']
})
export class LayoutBasicComponent {
  searchToggleStatus = false;
  showSettingDrawer = !environment.production;

  q = '';
  qIpt: HTMLInputElement | null = null;
  options: string[] = [];
  search$ = new BehaviorSubject('');
  loading = false;
  get user(): User {
    return this.settings.user;
  }

  constructor(private cookieService: CookieService,
              private router: Router,
              private settings: SettingsService) {}
  isCollapsed = false;

  logout() {
    this.router.navigate(['/passport/login']);
  }

  //接收实时输入的数据
  search(it : any){
    console.log(it.data);
  }

}
