import { utils } from 'chrt-object';
const { isNull } = utils;

export default function range(values) {
  if(isNull(values)) {
    return this;
  }

  if (typeof values === 'function') {
    // something will go here
  } else {
    this._range = Object.assign({}, this._range, values);
  }

  return this;
}

export function from(value) {
  return range.call(this, {from: value})
}

export function to(value) {
  return range.call(this, {to: value})
}
