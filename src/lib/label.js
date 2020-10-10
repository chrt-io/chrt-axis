import { isNull } from '~/helpers';
export default function label(text, options = {}) {
  if (isNull(text)) {
    return this._label;
  }
  this._label = Object.assign({}, options, { text });

  return this;
}
