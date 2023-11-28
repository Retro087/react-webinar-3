import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';
import { useState } from 'react';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    openModal: useCallback(() => {
      setIsModalOpen(!isModalOpen)
    }, [isModalOpen])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls cart={cart} openModal={callbacks.openModal}/>
      <List list={list}
            onAddItem={callbacks.onAddItem}/>
      {isModalOpen ? <Cart cart={cart} deleteItem={callbacks.onDeleteItem} openModal={callbacks.openModal}/> : ''}
    </PageLayout>
  );
}

export default App;
