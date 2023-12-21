import {createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState, useSyncExternalStore} from 'react';
import useServices from './use-services';
import I18nService from '../i18n';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */

export default function useTranslate() {
  const { lang, setLang, translate, subscribe, getLang } = useServices().i18n;
  const state = useSyncExternalStore(subscribe, getLang)
  return useMemo(() => ({
    // Код локали
    lang: state,
    // Функция для смены локали
    setLang,
    // Функция для локализации текстов с замыканием на код языка
    t: (text, number) => translate(lang, text, number)
  }), [lang]);
  

}