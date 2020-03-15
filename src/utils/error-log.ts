import Vue from 'vue';
import store from '@/store';
import { isString, isArray } from '@/utils/validate';
import settings from '@/settings';
import { ErrorLogModule } from '@/store';

const { errorLog: needErrorLog } = settings;

function checkNeed() {
  const env = process.env.NODE_ENV;
  if (!env) {
    return false;
  }
  if (isString(needErrorLog)) {
    return env === needErrorLog;
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env);
  }
  return false;
}

if (checkNeed()) {
  Vue.config.errorHandler = function(err: Error, vm: Vue, info: string) {
    Vue.nextTick(() => {
      ErrorLogModule.addErrorLog(err);
      console.error(err, info);
    });
  };
}
