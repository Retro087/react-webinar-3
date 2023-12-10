import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import LangChanger from "../langChanger";
import { translater } from "../../utils";


function Head({title, translate, lang}) {
  
  return (
    <div className='Head'>
      <h1>{translater(title, lang)}</h1>
      <LangChanger lang={lang} translate={translate}/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
