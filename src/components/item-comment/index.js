import {memo, useCallback, useState} from 'react';
import propTypes, { bool } from 'prop-types';
import numberFormat from '../../utils/number-format';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './style.css';
import getDate from '../../utils/get-date';
import CommentForm from '../comment-form';


function ItemComment(props) {

  const cn = bem('ItemComment');

  function openComment(e) {
    e.preventDefault()
    props.setIsOpen(false)
    props.setOpenedId(props.item)
  };

  function closeComment(){
    props.setIsOpen(true)
    props.setOpenedId({})
  }
  
  return (
    <div>
      <div style={{paddingLeft: (props.item.level - 1 ) * 20, width: 945-(props.item.level - 1 ) * 20}} className={cn()}>
        {/*<div className={cn('code')}>{props.item._id}</div>*/}
        <div className={cn('head')}>
          <div className={cn(props.signedId === props.item.author._id ? 'me' : 'author')}>
            {props.item.author.profile.name}
          </div>
          <div className={cn('date')}>
            <span>{getDate(props.item.date)}</span>
          </div>
        </div>
        <div className={cn('text')}>{props.item.text}</div>
        <a onClick={(e) => openComment(e)} className={cn('link')} href=''>Ответить</a>
      </div>
      {props.lastChild?._id === props.item._id ? <CommentForm onSignIn={props.onSignIn} id={props.openedId._id} level={props.openedId.level} closeComment={closeComment} isOpen={props.isOpen} setIsOpen={props.setIsOpen} isAuth={props.isAuth} addComment={props.addComment} placehold={'Мой ответ для User №1'} title={'Новый ответ'}/> : ''}
    </div>
  )
}

ItemComment.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    level: PropTypes.number,
    author: PropTypes.object,
  }).isRequired,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  isAuth: PropTypes.bool,
  addComment: PropTypes.func,
}

export default memo(ItemComment);
