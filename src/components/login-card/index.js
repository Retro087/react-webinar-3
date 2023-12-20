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
        <h1 className={cn('title')}>Вход</h1>
        <div className={cn('input')}>
            <span className={cn('label')}>Логин</span>
            <div>
              <input className="input" onChange={(e) => setLogin(e.target.value)} value={login}/>
            </div>
        </div>
        <div className={cn('input')}>
            <span className={cn('label')}>Пароль</span>
            <div>
              <input className="input" type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
        </div>
        {props.errors ? 
        props.errors.map(item => {
          return <div className={cn('error')}>{item}</div>
        })
         : ''}
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
