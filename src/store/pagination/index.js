import StoreModule from "../module"

class Pagination extends StoreModule {

    initState() {
      return {
        pages: [],
        currentPage: 1,
        limit: 10
      }
    }
  
    loadPages(currentPage, totalPage) {
      let pages = [1,2,3,'...',totalPage]

      if(totalPage < 7){
        pages = []
        for(let i = 1; i <= totalPage; i++){
            pages.push(i)
        }
      }else{
        if(currentPage === 3){
            pages = [1, 2, 3, 4, '...', totalPage]
        }else if(currentPage > totalPage - 2){
            pages = [1, '...', totalPage - 2, totalPage - 1, totalPage]
        }else if(currentPage === totalPage - 2){
            pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, totalPage]
        }else if(currentPage > 3){
            pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPage]
        }
      }

      if(totalPage === 0){
        pages = []
      }

      this.setState({
        ...this.getState(),
        pages: pages
      })
    }
  
      
    setCurrentPage(currentPage) {
      this.setState({
        ...this.getState(),
        currentPage: currentPage
      }, 'Смена номера страницы');
    }
  }
  
  export default Pagination;
  