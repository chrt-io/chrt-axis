import { isNull } from '~/helpers';
export default function setTickLength(value) {
  if(isNull(value)) {
    return this.tickLength;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this.tickLength = value;
  }
  return this;
}
