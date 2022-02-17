import { utils } from 'chrt-object';
// import { ORIENTATIONS, DEFAULT_ORIENTATION } from '../../constants';
//
// const { isNull } = utils;

export default function orient(value) {
  // let orientation = value;
  // if(!isNull(orientation)) {
  //   orientation = ORIENTATIONS[this.coord].indexOf(value) > -1
  //     ? value
  //     : DEFAULT_ORIENTATION[this.coord];
  // }
  return this.attr('orientation', value)
}
