import { HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService, SocialOpenType, SocialService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { finalize } from 'rxjs';
import {AuthService} from "../auth.service";
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginComponent implements OnDestroy {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  // #region fields

  form = this.fb.nonNullable.group({
    userName: ['', [Validators.required, Validators.pattern(/^(admin|user)$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(ng\-alain\.com)$/)]],
    mobile: ['', [Validators.required, Validators.pattern(/^1\d{10}$/)]],
    captcha: ['', [Validators.required]],
    remember: [true]
  });
  error = '';
  type = 0;
  loading = false;

  // #region get captcha

  count = 0;
  interval$: any;

  // #endregion

  switch({ index }: NzTabChangeEvent): void {
    this.type = index!;
  }

  getCaptcha(): void {
    const mobile = this.form.controls.mobile;
    if (mobile.invalid) {
      mobile.markAsDirty({ onlySelf: true });
      mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
  }

  // #endregion

  submit(): void {

    const body = {
      username: 'admin',
      password: 'password',
    };
    console.log(body);
    this.authService.login(body).subscribe((res:any) => {
      console.log(res); //???????????????access_token
        // @ts-ignore
        this.cookieService.set('access_token', res['access_token']);
        // @ts-ignore
        this.authService.profile('api/auth/profile', environment.searchUrl).subscribe((res1) => {
          this.cookieService.set('profile', JSON.stringify(res1));
          this.router.navigate(['/']);
        });
      },
      (error) => {
        console.error(error);
        this.error = '?????????????????????';
      },
    );

    this.error = '';
    if (this.type === 0) {
      const { userName, password } = this.form.controls;
      userName.markAsDirty();
      userName.updateValueAndValidity();
      password.markAsDirty();
      password.updateValueAndValidity();
      if (userName.invalid || password.invalid) {
        return;
      }
    } else {
      const { mobile, captcha } = this.form.controls;
      mobile.markAsDirty();
      mobile.updateValueAndValidity();
      captcha.markAsDirty();
      captcha.updateValueAndValidity();
      if (mobile.invalid || captcha.invalid) {
        return;
      }
    }

    // ????????????????????????HTTP?????????????????? [??????](https://ng-alain.com/auth/getting-started) ?????? Token
    // ????????????????????????????????????????????????????????? `ALLOW_ANONYMOUS` ????????????????????? Token ??????
    this.loading = true;
    this.cdr.detectChanges();
    this.http
      .post('/login/account', {
          type: this.type,
          userName: this.form.value.userName,
          password: this.form.value.password
        }, null, {
          context: new HttpContext().set(ALLOW_ANONYMOUS, true)
        }
      )
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        // console.log(res);
        // console.log(this.tokenService);
        if (res.msg !== 'ok') {
          this.error = res.msg;
          this.cdr.detectChanges();
          return;
        }
        // ????????????????????????
        this.reuseTabService.clear();
        // ????????????Token??????
        // TODO: Mock expired value
        res.user.expired = +new Date() + 1000 * 60 * 5;
        this.tokenService.set(res.user);
        // ???????????? StartupService ???????????????????????????????????????????????????????????????????????????????????????
        this.startupSrv.load().subscribe(() => {
          let url = this.tokenService.referrer!.url || '/';
          if (url.includes('/passport')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });
      });
  }

  // // #region social
  //
  // open(type: string, openType: SocialOpenType = 'href'): void {
  //   let url = ``;
  //   let callback = ``;
  //   console.log(environment.production);
  //   if (environment.production) {
  //     callback = `https://ng-alain.github.io/ng-alain/#/passport/callback/${type}`;
  //   } else {
  //     callback = `http://localhost:4200/#/passport/callback/${type}`;
  //   }
  //   switch (type) {
  //     case 'auth0':
  //       url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(callback)}`;
  //       break;
  //     case 'github':
  //       url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
  //         callback
  //       )}`;
  //       break;
  //     case 'weibo':
  //       url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
  //       break;
  //   }
  //   if (openType === 'window') {
  //     this.socialService
  //       .login(url, '/', {
  //         type: 'window'
  //       })
  //       .subscribe(res => {
  //         if (res) {
  //           this.settingsService.setUser(res);
  //           this.router.navigateByUrl('/');
  //         }
  //       });
  //   } else {
  //     this.socialService.login(url, '/', {
  //       type: 'href'
  //     });
  //   }
  // }
  //
  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
