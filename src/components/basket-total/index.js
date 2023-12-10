import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, translater} from "../../utils";
import './style.css';

function BasketTotal({sum, lang}) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translater('Итого', lang)}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  lang: PropTypes.string
};

BasketTotal.defaultProps = {
  sum: 0,
}

export default memo(BasketTotal);
