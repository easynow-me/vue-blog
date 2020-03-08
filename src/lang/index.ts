import Vue from 'vue';
import VueI18n from 'vue-i18n';
import elementEnLocale from './element/en';
import elementZhLocale from './element/zh-CN';
import enLocale from './en';
import zhLocale from './zh-CN';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  'zh-CN': {
    ...zhLocale,
    ...elementZhLocale
  }
};

export function getLanguage() {
  // todo 获取当前设置语言
  const chooseLanguage = 'zh-CN';
  if (chooseLanguage) {
    return chooseLanguage;
  }

  const language = (
    navigator.language || (navigator as any).browserLanguage
  ).toLowerCase();

  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return 'zh-CN';
}

const i18n = new VueI18n({
  locale: getLanguage(),
  messages
});

export default i18n;
