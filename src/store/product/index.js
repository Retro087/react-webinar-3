import StoreModule from "../module"

class Product extends StoreModule {

    initState() {
      return {
        productData: {},
        isLoading: false
      }
    }
  
    async loadProduct(id) {
        this.setState({
          ...this.getState(),
          isLoading: true
        })
        const product = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`)
        const json = await product.json()
        this.setState({
            ...this.getState(),
            productData: {
              ...json.result
            },
            isLoading: false
          }, 'Загрузка продукта');
    }
      
  }
  
  export default Product;
  