import { json } from "react-router";
import StoreModule from "../module";
import { sortList } from "../../utils";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class ProfileState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      waiting: false,
      error: '',
      name: ''
    }
  }

  
  async getUser(){
    this.setState({
      user: {},
      error: '',
      waiting: true
    });
    try {
      const response = await fetch(`/api/v1/users/self?fields=*`,
        {
          method: 'GET',
          headers: {
            'X-Token': localStorage.getItem('x-token'),
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      const json = await response.json()
      this.setState({
        ...this.getState(),
        user: json.result,
        errors: '',
        waiting: false,
        name: json.result.profile.name
      })

    } catch (e) {
      this.setState({
        user: {},
        waiting: false,
        name: '',
        error: e
      });
    }}

}

export default ProfileState;
