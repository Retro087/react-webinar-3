import {memo, useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
import List from '../list';
import ItemComment from '../item-comment';
import CommentForm from '../comment-form';


function CommentsCard(props) {
  const cn = bem('CommentsCard');
  return (
    <div className={cn()}>
        <h1 className={cn('title')}>Комментарии ({props.count})</h1>
        {props.comments.map((item) => {
          return <ItemComment lastChild={props.lastChild} setOpenedId={props.setOpenedId} openedId={props.openedId} isOpen={props.isOpen} setIsOpen={props.setIsOpen} addComment={props.addComment} isAuth={props.isAuth} signedId={props.signedId} key={item._id} item={item}/>
        })}
        {props.isOpen ? <CommentForm isOpen={props.isOpen} isAuth={props.isAuth} title={'Новый комментарий'} addComment={props.addComment} placehold={'Текст'}/> : ''}
    </div>
  );
}
  
CommentsCard.propTypes = {
  Comments: PropTypes.array,
  setOpenedId: PropTypes.func,
  openedId: PropTypes.array,
  isAuth: PropTypes.bool,
  addComment: PropTypes.func,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  signedId: PropTypes.string,
};

CommentsCard.defaultProps = {

}

export default memo(CommentsCard);
