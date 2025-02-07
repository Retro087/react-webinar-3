/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.index = initState.list[initState.list.length - 1].code;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.index += 1;
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          code: this.index,
          title: "Новая запись",
          selected: false,
          selectedNum: 0,
        },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    let isDel = this.state.list.find((item) => item.code === code);
    if (!isDel) {
      return null;
    }
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          if (!item.selected) {
            item.selectedNum++;
          }
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
