import {memo, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
import List from '../list';
import ItemComment from '../item-comment';
import { Link } from 'react-router-dom';
import checkForWord from '../../utils/checkForWord';

function CommentForm(props) {
  const cn = bem('CommentForm');
  const [input, setInput] = useState('')
  const commentForm = useRef()

  function onAnswer(){
    if(checkForWord(input)){
      if(props.isOpen){
        props.addComment(input)
      }else{
        props.addComment(input, props.id, 'comment')
      }
      setInput('')
    }
  }
  
  function onCancel(e){
    e.preventDefault()
    props.closeComment()
    setInput('')
  }

  useEffect(() => {
    commentForm.current?.scrollIntoView({block: 'center'})
  }, [])

  if(!props.isAuth){
    return <div ref={commentForm}>
      {!props.isOpen ? <span style={props.level ? {paddingLeft: props.level*20} : {paddingBottom: 0}} className={cn('not-auth')}><a onClick={() => props.onSignIn()} className='link'>Войдите</a>, чтобы иметь возможность комментировать.<a className='cancel' onClick={(e) => onCancel(e)} href=''>Отмена</a></span>:
      <span style={props.level ? {paddingLeft: props.level*20} : {paddingBottom: 0}} className={cn('not-auth')}><a className='link' onClick={() => props.onSignIn()}>Войдите</a>, чтобы иметь возможность комментировать.</span>}
    </div>
  }
  
  return (
    <div ref={commentForm} style={props.level ? {paddingLeft: props.level*20} : {padding: 0}} className={cn()}>
      <div className={cn('item')}>
        <span className={cn('title')}>{props.title}</span>
      </div>
      <div className={cn('item')}>
        <textarea className={cn('input')} onChange={(e) => setInput(e.target.value)} placeholder={props.placehold} value={input}/>
      </div>
      <div className={cn('item')}>
        <button className={cn('btn')} onClick={() => onAnswer()}>Отправить</button>
        {props.isOpen ? '' : <button className={cn('btn')} onClick={(e) => onCancel(e)}>Отмена</button>}
      </div>
    </div>
  );
}

CommentForm.propTypes = {
  level: PropTypes.number,
  title: PropTypes.string,
  placehold: PropTypes.string,
  isOpen: PropTypes.bool,
  isAuth: PropTypes.bool,
  closeComment: PropTypes.func,
  addComment: PropTypes.func
};

CommentForm.defaultProps = {

}

export default memo(CommentForm);
