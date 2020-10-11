import { isNull } from '~/helpers';
export default function setTickPosition(value) {
  if(isNull(value)) {
    return this.tickPosition;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this.tickPosition = value;
  }
  return this;
}
