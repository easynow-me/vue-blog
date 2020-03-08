import { Module, VuexModule, MutationAction } from 'vuex-module-decorators';

export interface IErrorLogState {
  logs: any[];
}

@Module({ name: 'errorLog' })
export class ErrorLog extends VuexModule implements IErrorLogState {
  public logs: any[] = [];

  @MutationAction({ mutate: ['logs'] })
  public addErrorLog(log: any) {
    return Promise.resolve({
      logs: [...this.logs, log]
    });
  }

  @MutationAction({ mutate: ['logs'] })
  public clearErrorLog() {
    return Promise.resolve({
      logs: []
    });
  }
}
