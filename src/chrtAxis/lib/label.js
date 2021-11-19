// legacy method, we can remove it from and use labelFormat
import labelFormat from './labelFormat';
import { utils } from 'chrt-object';
const { isNull } = utils;

export default function label(text, options = {}) {
  const _options = Object.assign({position: 'last'}, options);
  return labelFormat.call(this, (d, i, arr) => {
    if(!isNull(_options.value)) {
      return d !== _options.value ? d : `${d}${text}`;
    }
    if(_options.position === 'last' && i !== arr.length - 1) {
      return d;
    }
    if(_options.position === 'first' && i !== 0) {
      return d;
    }
    return `${d}${text}`
  });
}
