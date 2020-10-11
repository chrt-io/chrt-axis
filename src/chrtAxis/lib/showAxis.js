import { isNull } from '~/helpers';
export default function showAxis(value) {
  if (typeof value === 'function') {
    // something will go here
  } else {
    this.showAxisLine = isNull(value) ? true : value;
  }

  return this;
}

export function hideAxis() {
  return showAxis.call(this, false);
}
