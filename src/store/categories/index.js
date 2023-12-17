import { json } from "react-router";
import StoreModule from "../module";
import { sortList } from "../../utils";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    }
  }

  
  async getCategories(){
    const response = await fetch('api/v1/categories?fields=_id,title,parent(_id)&limit=*')
    const json = await response.json()
    const result = json.result
    const items = result.items.map(el => {
      return { title: el.title, value: el._id, parent: (el.parent?._id || null) }
    })
    const sorted = sortList(items);
    const list = [{ title: 'Все', value: 'all' }, ...sorted];
    this.setState({
      ...this.getState(),
      categories: list
    })
  }
  
}

export default CategoriesState;
