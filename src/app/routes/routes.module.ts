import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { RouteRoutingModule } from './routes-routing.module';
import { DelonAuthModule } from '@delon/auth';
//管理页面
import {EngineComponent} from "./Emanagement/engine.component";
import {TableListComponent} from "./table-list/table-list.component";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

const COMPONENTS: Array<Type<void>> = [
  DashboardComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
  EngineComponent,
  TableListComponent,
];

@NgModule({
  imports: [
    SharedModule,
    RouteRoutingModule,
    DelonAuthModule,
    NzDatePickerModule,
    NzBadgeModule,
  ],
  providers: [],
  declarations: COMPONENTS,
})
export class RoutesModule {}
