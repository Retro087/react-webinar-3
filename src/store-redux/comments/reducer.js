// Начальное состояние
export const initialState = {
    data: [],
    count: 0,
    waiting: false // признак ожидания загрузки
  }
  
  // Обработчик действий
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "comments/load-start":
        return {...state, count: 0, data: [], waiting: true};

      case "addComment/load-start":
        return {...state, waiting: true};

      case "comments/load-success":
        return {...state, data: action.payload.data, count: action.payload.count, waiting: false};
  
      case "comments/load-error":
        return {...state, data: [], waiting: false}; //@todo текст ошибки сохранять?

      case "addComment/load-success":
        return {...state, count: state.count + 1, data: [...state.data, action.payload.data], waiting: false};
    
      default:
        // Нет изменений
        return state;
    }
  }
  
  export default reducer;
  