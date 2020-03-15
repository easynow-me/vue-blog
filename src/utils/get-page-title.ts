import defaultSettings from '@/settings';
import i18n from '@/lang';

const title = defaultSettings.title || 'Easy Now Admin';

export default function getPageTitle(key: string) {
  const hasKey = i18n.te(`route.${key}`);
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`);
    return `${pageName} - ${title}`;
  }
  return `${title}`;
}
