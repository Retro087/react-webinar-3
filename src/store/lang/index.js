import StoreModule from "../module";

class Lang extends StoreModule {

  initState() {
    return {
      lang: 'ru',
    }
  }

  changeLang(lang) {
    this.setState({
     ...this.setState,
      lang
    },'Смена языка')
  }
}

export default Lang;