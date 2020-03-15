import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState, App } from './modules/app';
import { ISettingsState, Settings } from './modules/settings';
import { ITagsViewState, TagsView } from './modules/tagsView';
import { IUserState, User } from './modules/user';
import { IErrorLogState, ErrorLog } from './modules/errorLog';
import { IPermissionState, Permission } from './modules/permission';
import VuexPersistence from 'vuex-persist';
import { getModule } from 'vuex-module-decorators';

const vuexLocal = new VuexPersistence<IRootState>({
  storage: window.localStorage
});

Vue.use(Vuex);

export interface IRootState {
  settings: ISettingsState;
  app: IAppState;
  tagViews: ITagsViewState;
  user: IUserState;
  errorLog: IErrorLogState;
  permission: IPermissionState;
}

const store = new Vuex.Store<IRootState>({
  modules: {
    settings: Settings,
    app: App,
    tagsView: TagsView,
    user: User,
    errorLog: ErrorLog,
    permission: Permission
  }
  // plugins: [vuexLocal.plugin]
});

export const AppModule = getModule(App, store);
export const SettingsModule = getModule(Settings, store);
export const TagsViewModule = getModule(TagsView, store);
export const UserModule = getModule(User, store);
export const ErrorLogModule = getModule(ErrorLog, store);
export const PermissionModule = getModule(Permission, store);

export default store;
