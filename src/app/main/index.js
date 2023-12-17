import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import useSelector from '../../hooks/use-selector';
import UserShort from '../../components/user-short';


/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const select = useSelector(state => ({
    isAuth: state.login.isAuth,
    name: state.login.name,
  }))
  
  const callbacks = {
    logout: useCallback(() => store.actions.login.logout(), [store])
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserShort isAuth={select.isAuth} logout={callbacks.logout} name={select.name}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
