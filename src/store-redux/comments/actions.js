export default {
    /**
     * Загрузка товара
     * @param id
     * @return {Function}
     */
    load: (id) => {
      return async (dispatch, getState, services) => {
        // Сброс текущего товара и установка признака ожидания загрузки
        dispatch({type: 'comments/load-start'});
  
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
          });
          // Товар загружен успешно
          dispatch({type: 'comments/load-success', payload: {data: res.data.result.items, count: res.data.result.count}, });
  
        } catch (e) {
          //Ошибка загрузки
          dispatch({type: 'comments/load-error'});
        }
      }
    },
    addComment: (data, user) => {
        return async (dispatch, getState, services) => {
            dispatch({type: 'addComment/load-start'});
            try {
                const res = await services.api.request({
                  url: `/api/v1/comments`,
                  method: 'POST',
                  body: JSON.stringify(data),
                  fields: '*'
                });
                // Товар загружен успешно
                
                dispatch({type: 'addComment/load-success', payload: {data: {...res.data.result, author: {profile: {name: user}, _id: res.data.result.author._id}}}});
        
              } catch (e) {
                //Ошибка загрузки
                dispatch({type: 'comments/load-error'});
              }
        }
    }
}
  