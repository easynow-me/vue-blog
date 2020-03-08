import { Module, VuexModule } from 'vuex-module-decorators';
import { RouteConfig } from 'vue-router';

export interface IPermissionState {
  routes: RouteConfig[];
  addRoutes: RouteConfig[];
}

@Module({ name: 'permission' })
export class Permission extends VuexModule implements IPermissionState {
  public routes = new Array<RouteConfig>();
  public addRoutes = new Array<RouteConfig>();
}
