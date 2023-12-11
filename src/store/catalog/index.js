import {codeGenerator, getTotalPages} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      totalPages: 0,
      currentPage: 1,
      limit: 10,
      isLoading: false
    }
  }

  async load(limit, currentPage) {
    debugger
    this.setState({
      ...this.getState(),
      isLoading: true
    })
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${(currentPage-1)*limit}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalPages: getTotalPages(limit, json.result.count),
      currentPage: currentPage,
      limit: limit,
      isLoading: false
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
