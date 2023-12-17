import { json } from "react-router";
import StoreModule from "../module";
import { sortList } from "../../utils";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class LoginState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      name: '',
      errors: [],
      X_token: '',
      isAuth: null,
      waiting: false
    }
  }

  
  async login(user){
    let response = await fetch('api/v1/users/sign', {
        method: 'POST',
        body: JSON.stringify(user.login),
        headers: {'Content-Type': 'application/json'}
    })
    const json = await response.json()
    if(json.error){
        this.setState({
            ...this.getState(),
            errors: json.error.data.issues.map(item => {
              return item.message
            })
        })
    }else{
        localStorage.setItem('x-token', json.result.token);

        this.setState({ 
            ...this.getState(),
            X_token: json.result.token,
            name: json.result.user.profile.name,
            isAuth: true,
        })
    }
    
  }

  async logout(){
    const response = await fetch(`/api/v1/users/sign`,
    {
      method: 'DELETE',
      headers: {
        'X-Token': localStorage.getItem('x-token'),
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const json = await response.json()
    if(json.error){
      localStorage.removeItem('x-token')
      
        this.setState({
            ...this.getState(),
            ...this.initState(),
            isAuth: false,
            error: json.error.message
        })
    }else{
      
      localStorage.removeItem('x-token')
        this.setState({ 
            ...this.getState(),
            isAuth: false
        })
    }
    
  }

  resetErrors(){
    this.setState({
      ...this.getState(),
      errors: []
    })
  }

  async checkAuth() {
    const token = localStorage.getItem('x-token');
    this.setState({
      ...this.getState(),
      waiting: true
    })
    if (!token) {
      this.setState({
        ...this.getState(),
        isAuth: false,
      }, );
    }
    else {
      const response = await fetch(`/api/v1/users/self?fields=*`,
        {
          method: 'GET',
          headers: {
            'X-Token': token,
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      const json = await response.json()
      if (json.error) {
        this.setState({
          ...this.getState(),
          isAuth: false,
          errors: json.error.message,
          waiting: false
        }, )
      }
      else{
        this.setState({
          ...this.getState(),
          isAuth: true,
          name: json.result.profile.name,
          waiting: false
        })
      }
    }
  }

}

export default LoginState;
