import {memo, useCallback, useEffect, useState} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import LoginCard from '../../components/login-card';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router';
import UserShort from '../../components/user-short';

/**
 * Главная страница - первичная загрузка каталога
 */
function Login() {

  const store = useStore();
  const navigate = useNavigate()

  useInit(() => {
    store.actions.login.checkAuth();
  }, [], true);

  const select = useSelector(state => ({
    isAuth: state.login.isAuth,
    error: state.login.error,
    name: state.login.name,

  }))

  const callbacks = {
    login: useCallback((login, password) => store.actions.login.login({login, password}), [store]),
    logout: useCallback(() => store.actions.login.logout(), [store])
  }
  const {t} = useTranslate();

  useEffect(() => {
    if(select.isAuth){
      navigate('/profile')
    }
  }, [select.isAuth])
  

  return (
    <PageLayout>
      <UserShort isAuth={select.isAuth} logout={callbacks.logout} name={select.name}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginCard  isAuth={select.isAuth} error={select.error} login={callbacks.login}/>
    </PageLayout>
  );
}

export default memo(Login);
