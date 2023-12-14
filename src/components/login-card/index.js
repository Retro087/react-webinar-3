import {memo, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LoginCard(props) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    function onClick(){
      props.login({login, password})
      setLogin('')
      setPassword('')
    }

  const cn = bem('LoginCard');
  return (
    <div className={cn()}>
        <h1>Вход</h1>
        <div className={cn('input')}>
            <span>Логин</span>
            <div>
              <input onChange={(e) => setLogin(e.target.value)} value={login}/>
            </div>
        </div>
        <div className={cn('input')}>
            <span>Пароль</span>
            <div>
              <input onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
        </div>
        {props.error ? 
        <div className={cn('error')}>{props.error}</div> : ''}
        <button onClick={() => onClick()}>Войти</button>
    </div>
  )
}

LoginCard.propTypes = {
  error: PropTypes.string,
  login: PropTypes.func
}

LoginCard.defaultProps = {
}

export default memo(LoginCard);
