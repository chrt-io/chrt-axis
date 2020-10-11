import { isNull } from '~/helpers';
export default function minor(value = true) {
  if(isNull(value)) {
    return this.showMinorTicks;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this.showMinorTicks = value;
  }
  return this;
}
