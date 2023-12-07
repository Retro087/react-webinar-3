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

function Product() {

  const store = useStore();
    const {id} = useParams()

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    limit: state.pagination.limit,
    text: state.product.text,
    price: state.product.price,
    category: state.product.category,
    madeIn: state.product.madeIn,
    edition: state.product.edition,
    id: state.product.id,
    title: state.product.title
  }));

  useEffect(() => {
      store.actions.product.loadProduct(id);
  }, [id]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    closeModalBasket: useCallback(() => store.actions.modals.close(), [store])
  }

  return (
    <PageLayout>
      <Head title={select.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ProductItem price={select.price} category={select.category} madeIn={select.madeIn} edition={select.edition} id={select.id} addToBasket={callbacks.addToBasket} closeModalBasket={callbacks.closeModalBasket} text={select.text}/>
    </PageLayout>

  );
}

export default memo(Product);
