import { getLanguage } from '@/lang';
import { Module, VuexModule, MutationAction } from 'vuex-module-decorators';

export enum DeviceType {
  Mobile,
  Desktop
}

export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  size: string;
  language: string;
}

@Module({ name: 'app' })
export class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: true,
    withoutAnimation: false
  };

  public device = DeviceType.Desktop;

  public size = 'medium';

  public language = getLanguage();

  @MutationAction({ mutate: ['sidebar'] })
  public toggleSideBar() {
    return Promise.resolve({
      sidebar: {
        opened: !(this.state as IAppState).sidebar.opened,
        withoutAnimation: false
      }
    });
  }

  @MutationAction({ mutate: ['sidebar'] })
  public closeSideBar(withoutAnimation: boolean) {
    return Promise.resolve({
      sidebar: {
        opened: false,
        withoutAnimation
      }
    });
  }

  @MutationAction({ mutate: ['device'] })
  public toggleDevice(device: DeviceType) {
    return Promise.resolve({
      device
    });
  }

  @MutationAction({ mutate: ['size'] })
  public setSize(size: string) {
    return Promise.resolve({
      size
    });
  }

  @MutationAction({ mutate: ['language'] })
  public setLanguage(lang: string) {
    return Promise.resolve({
      language: lang
    });
  }
}
