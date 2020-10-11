import { isNull } from '~/helpers';
export default function minor(value = true) {
  if(isNull(value)) {
    return this.showZero;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this.showZero = value;
  }
  return this;
}
