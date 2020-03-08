import { removeToken } from '@/utils/auth';
import { Module, MutationAction, VuexModule } from 'vuex-module-decorators';
import { login } from '@/api/user';

export interface IUserState {
  token: string;
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
}

@Module({ name: 'user' })
export class User extends VuexModule implements IUserState {
  public token = '';
  public name = '';
  public avatar = '';
  public introduction = '';
  public roles = [];

  @MutationAction({ mutate: ['token'] })
  public async login(userInfo: { username: string; password: string }) {
    const { data } = await login({
      username: userInfo.username.trim(),
      password: userInfo.password
    });
    return data;
  }

  @MutationAction({ mutate: ['token', 'roles'] })
  public logout() {
    removeToken();
    return Promise.resolve({
      token: '',
      roles: []
    });
  }

  @MutationAction({ mutate: ['token', 'roles'] })
  public resetToken() {
    removeToken();
    return Promise.resolve({
      token: '',
      roles: []
    });
  }
}
