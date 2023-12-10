import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural, translater} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";

function BasketTool({sum, amount, onOpen, lang}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <div>
        <span className={cn('label')}>{`${translater('В корзине', lang)}:` }</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: translater('товар', lang),
              few: translater('товара', lang),
              many: translater('товаров', lang)
            })} / ${numberFormat(sum)} ₽`
            : translater(`пусто`, lang)
          }
        </span>
        <button onClick={onOpen}>{translater('Перейти', lang)}</button>
      </div>
      
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
}

export default memo(BasketTool);
