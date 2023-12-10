import React from "react";
import './style.css'
import { translater } from "../../utils";
import PropTypes from "prop-types";

function LangChanger({translate, lang}){
    return(
        <div>
            <span className="lang-item" onClick={() => translate('ru')}>{translater('Русский', lang)}</span>
            /
            <span className="lang-item" onClick={() => translate('en')}>{translater('Английский', lang)}</span>
        </div>
    )
}

LangChanger.propTypes = {
    lang: PropTypes.string,
    translate: PropTypes.func
};
  
  

export default React.memo(LangChanger)