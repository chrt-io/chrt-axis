import { isNull } from '~/helpers';
import { ORIENTATIONS, DEFAULT_ORIENTATION } from '~/constants';

export default function orient(value) {
  let orientation = value;
  if(!isNull(orientation)) {
    orientation = ORIENTATIONS[this._name].indexOf(value) > -1
      ? value
      : DEFAULT_ORIENTATION[this.name];
  }
  return this.attr('orientation', orientation)
  // if (isNull(value)) {
  //   return this.orientation;
  // }
  //
  // if (typeof value === 'function') {
  //   // something will go here
  // } else {
  //   this.orientation =
  //     ORIENTATIONS[this._name].indexOf(value) > -1
  //       ? value
  //       : DEFAULT_ORIENTATION[this.name];
  //   // // console.log('SETTING ORIENTATION', this.name, value, '->', this.orientation)
  // }
  // return this;
}
