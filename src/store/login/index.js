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
      error: '',
      X_token: '',
      isAuth: false,
      user: {}
    }
  }

  
  async login(user){
    let response = await fetch('api/v1/users/sign', {
        method: 'POST',
        body: JSON.stringify(user.login),
        headers: {'Content-Type': 'application/json'}
    })
    const json = await response.json()
    debugger
    if(json.error){
        this.setState({
            ...this.getState(),
            error: json.error.message
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
            error: json.error.message
        })
    }else{
      
      localStorage.removeItem('x-token')
        this.setState({ 
            ...this.getState(),
            ...this.initState()
        })
    }
    
  }

  async checkAuth() {
    const token = localStorage.getItem('x-token');
    
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
          user: {},
          isAuth: false,
          error: json.error.message
        }, )
      }
      else{
        this.setState({
          ...this.getState(),
          user: json.result,
          isAuth: true,
          error: '',
          name: json.result.profile.name
        })
      }
    }
  }

}

export default LoginState;
