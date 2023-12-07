import StoreModule from "../module"

class Product extends StoreModule {

    initState() {
      return {
        id: null,
        text: '',
        madeIn: null,
        category: null,
        edition: null,
        price: null,
        title: ''
      }
    }
  
    async loadProduct(id) {
        const product = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
        const json = await product.json()
        debugger
        this.setState({
            ...this.getState(),
            id: json.result._id,
            text: json.result.description,
            madeIn: json.result.madeIn.title,
            edition: json.result.edition,
            category: json.result.category.title,
            price: json.result.price,
            title: json.result.title
          }, 'Загрузка продукта');
    }
      
  }
  
  export default Product;
  