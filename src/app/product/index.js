import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';
import ProductItem from '../../components/product-item';
import { useParams } from 'react-router';
import AlignContent from '../../components/align-content';
import Menu from '../../components/menu';

function Product() {

  const store = useStore();
  const {id} = useParams()

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    limit: state.catalog.limit,
    productData: state.product.productData,
    isLoading: state.product.isLoading,
    lang: state.lang.lang
  }));

  useEffect(() => {
      store.actions.product.loadProduct(id);
  }, [id]);
  
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    closeModalBasket: useCallback(() => store.actions.modals.close(), [store]),
    translate: useCallback((lang) => store.actions.lang.changeLang(lang), [store])
  }

  return (
    <PageLayout>
      <Head lang={select.lang} translate={callbacks.translate} title={select.productData.title}/>
      <AlignContent>
        <Menu lang={select.lang}/>
        <BasketTool lang={select.lang} onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      </AlignContent>
      <ProductItem lang={select.lang} isLoading={select.isLoading} productData={select.productData} addToBasket={callbacks.addToBasket} closeModalBasket={callbacks.closeModalBasket}/>
    </PageLayout>
  );
}

export default memo(Product);
