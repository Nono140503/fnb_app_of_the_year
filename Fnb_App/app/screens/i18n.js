import I18n from 'i18n-js';
import { I18nManager } from 'react-native';
import eng_Latn from './translations/eng_Latn.json';
import zul_Latn from './translations/zul_Latn.json';
import * as Localization from 'expo-localization';

I18n.fallbacks = true;

I18n.translations = {
  eng_Latn,
  zul_Latn,
};

i18n.locale = Localization.locale.startsWith('zul') ? 'zul_Latn' : 'eng_Latn';

export const setLanguage = (language) => {
  I18n.locale = language;
};

export default I18n;
