import {memo, useCallback, useMemo, useState} from 'react';
import PropTypes, { element } from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/number-format';
import './style.css';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useStore from '../../hooks/use-store';
import List from '../../components/list';
import ItemComment from '../../components/item-comment';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import useTranslate from '../../hooks/use-translate';
import SideLayout from '../../components/side-layout';
import CommentsCard from '../../components/comments-card';
import commentsActions from '../../store-redux/comments/actions';
import { useParams } from 'react-router';
import useSelectorReact from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import getChild from '../../utils/get-child';

function Comments() {
  const store = useStore();
  const dispatch = useDispatch();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(true)
  const [openedId, setOpenedId] = useState([])

  const select = useSelector(state => ({
    comments: state.comments.data,
    count: state.comments.count,
    waiting: state.comments.waiting
  }), shallowEqual);

  const name = useSelectorReact(state => state.session.user.profile?.name)
  const isAuth = useSelectorReact(state => state.session.exists)
  const signedId = useSelectorReact(state => state.session.user?._id)

  const callbacks = {
    addComment: useCallback((text, parentId = params.id, type = 'article') => dispatch(commentsActions.addComment({text, parent:{_id: parentId, _type: type}}, name))),
    openComment: useCallback(e => openComment(e)),
  };

  const comments = {
    items: useMemo(() => (treeToList(listToTree(select.comments), (item, level) => ({
      _id: item._id,
      text: item.text,
      date: item.dateCreate,
      author: item.author,
      parent: item.parent,
      level: level,
    })).slice(1)), [select.comments])
  };

  const lastChild = getChild(openedId._id, comments.items)

  const {t} = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <SideLayout padding='big'>
        <CommentsCard lastChild={lastChild} setOpenedId={setOpenedId} openedId={openedId} isOpen={isOpen} setIsOpen={setIsOpen} signedId={signedId} isAuth={isAuth} addComment={callbacks.addComment} comments={comments.items} count={select.count}/>
      </SideLayout>
    </Spinner>
  )
}


export default memo(Comments);
