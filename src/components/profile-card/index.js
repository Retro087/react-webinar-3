import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from "react-router-dom";
import './style.css';

function ProfileCard(props) {
  const cn = bem('ProfileCard');
  if(!props.user.profile){
    return ''
  }

  return (
    <div className={cn()}>
        <h1>Профиль</h1>
        <p>Имя: <b>{props.name}</b></p>
        <p>Телефон: <b>{props.user.profile.phone}</b></p>
        <p>email: <b>{props.user.email}</b></p>
    </div>
  )
}

ProfileCard.propTypes = {
  user: PropTypes.object,
  name: PropTypes.string,
};

ProfileCard.defaultProps = {
}
export default memo(ProfileCard);
