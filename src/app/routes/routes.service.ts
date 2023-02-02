import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {ALLOW_ANONYMOUS} from "@delon/auth";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http: HttpClient) {}

  //用户登录
  login(body: any): any {
    return this.http.post(`api/auth/login`, body);
  }

  //爬虫引擎
  //添加引擎
  addEngine(body:any){
    return this.http.post(`api/engine`, body);
  }
  //查询所有引擎  http://192.168.0.140:9000/api/engine?status=0&page=1&limit=10
  queryAllEngines(page:any,limit:any){
    return this.http.get(`api/engine?&page=${page}&limit=${limit}`,{context: new HttpContext().set(ALLOW_ANONYMOUS, true)});
  }
  //查询单个引擎
  queryEngines(id:any){
    return this.http.get(`api/engine/${id}`,{context: new HttpContext().set(ALLOW_ANONYMOUS, true)});
  }
  //修改引擎
  updateEngine(body: any){
    return this.http.patch(`api/engine/${body.id}`, body);
  }
  //删除引擎
  deleteEngine(id: any) {
    return this.http.delete(`api/engine/${id}`);
  }

  //站点管理
  //添加站点
  addSite(body:any){
    return this.http.post(`api/platform`, body);
  }
  //查询所有站点
  queryAllSite(){
    return this.http.get(`api/platform`,{context: new HttpContext().set(ALLOW_ANONYMOUS, true)});
  }

  //生成模拟站点
  generateSimulationSite(body :any){
    return this.http.post(`api/platform/generatePlatform`,{body});
  }

  //查询单个站点
  querySite(id:any){
    return this.http.get(`api/platform/${id}`,{context: new HttpContext().set(ALLOW_ANONYMOUS, true)});
  }
  //修改站点

  updateSite(body: any){
    return this.http.patch(`api/platform/${body.id}`, body);
  }
  //删除站点
  deleteSite(id: any) {
    return this.http.delete(`api/platform/${id}`);
  }
}
