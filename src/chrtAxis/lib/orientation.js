import { utils } from 'chrt-object';
import { ORIENTATIONS, DEFAULT_ORIENTATION } from '../../constants';

const { isNull } = utils;

export default function orient(value) {
  let orientation = value;
  if(!isNull(orientation)) {
    orientation = ORIENTATIONS[this.name].indexOf(value) > -1
      ? value
      : DEFAULT_ORIENTATION[this.name];
  }
  return this.attr('orientation', orientation)
}
