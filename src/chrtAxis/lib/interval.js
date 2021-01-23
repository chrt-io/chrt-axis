import { isNull } from '~/helpers';
export default function interval(value) {
  // console.log('INTERVAL', value)
  if(isNull(value)) {
    return this._interval;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this._interval = value;
  }
  return this;
}
