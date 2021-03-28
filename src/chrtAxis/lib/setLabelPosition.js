import { isNull } from '~/helpers';
export default function setTickPosition(value) {
  if(isNull(value)) {
    return this.labelPosition;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this.labelPosition = value;
  }
  return this;
}
