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
import ProfileCard from '../../components/profile-card';

/**
 * Главная страница - первичная загрузка каталога
 */
function Profile() {

  const store = useStore();
  const navigate = useNavigate()

  useInit(() => {
    store.actions.login.checkAuth();
  }, [], true);

  const select = useSelector(state => ({
    isAuth: state.login.isAuth,
    error: state.login.error,
    name: state.login.name,
    user: state.login.user
  }))

  const callbacks = {
    logout: useCallback(() => store.actions.login.logout(), [store])
  }

  const {t} = useTranslate();
  
  useEffect(() => {
    if(!select.isAuth){
      navigate('/login')
    }
  }, [select.isAuth])

  return (
    <PageLayout>
      <UserShort isAuth={select.isAuth} name={select.name} logout={callbacks.logout}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileCard user={select.user} name={select.name}/>
    </PageLayout>
  );
}

export default memo(Profile);
