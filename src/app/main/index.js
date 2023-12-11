import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import Menu from '../../components/menu';
import AlignContent from '../../components/align-content';

function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    limit: state.catalog.limit,
    currentPage: state.catalog.currentPage,
    totalPages: state.catalog.totalPages,
    isLoading: state.catalog.isLoading,
    lang: state.lang.lang
  }));
  
  useEffect(() => {
      store.actions.catalog.load(select.limit, select.currentPage);
  }, []);
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    load: useCallback((limit, currentPage) => store.actions.catalog.load(limit, currentPage), [store]),
    translate: useCallback(lang => store.actions.lang.changeLang(lang), [store])
  }
  
  const renders = {
    item: useCallback((item) => {
      return <Item lang={select.lang} item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket, select.lang]),
  };

  return (
    <PageLayout>
      <Head lang={select.lang} translate={callbacks.translate} title='Магазин'/>
      <AlignContent>
        <Menu lang={select.lang}/>
        <BasketTool lang={select.lang} onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      </AlignContent>
      <List lang={select.lang} isLoading={select.isLoading} list={select.list} renderItem={renders.item}/>
      <Pagination load={callbacks.load} limit={select.limit} totalPages={select.totalPages} currentPage={select.currentPage} />
    </PageLayout>

  );
}

export default memo(Main);
