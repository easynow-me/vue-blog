import Vue from 'vue';
import App from '@/App.vue';
import '@/icons';
import 'normalize.css/normalize.css';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import i18n from '@/lang';
import Element from 'element-ui';
import '@/styles/element-variables.scss';
import VueI18n from 'vue-i18n';
import '@/styles/index.scss';
import '@/permission';
import '@/utils/error-log';

import * as filters from '@/filters';

Vue.use(Element, {
  size: 'medium',
  i18n: (key: string, value: VueI18n.Values) => i18n.t(key, value)
});

Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as any)[key]);
});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
