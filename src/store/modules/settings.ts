import defaultSettings from '@/settings';
import variables from '@/styles/element-variables.scss';
import { MutationAction, Module, VuexModule } from 'vuex-module-decorators';

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

export interface ISettingsState {
  theme: string;
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
}

@Module({ name: 'settings' })
export class Settings extends VuexModule implements ISettingsState {
  public theme = variables.theme;
  public showSettings = showSettings;
  public tagsView = tagsView;
  public fixedHeader = fixedHeader;
  public sidebarLogo = sidebarLogo;

  @MutationAction
  public changeSetting(data: any) {
    const obj = this.state as ISettingsState;
    Object.assign(obj, data);
    return Promise.resolve(obj);
  }
}
