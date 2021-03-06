export default function lineStyle(value) {
  return this.attr('lineStyle', value)
  // return;
  // if(!value) {
  //   return this._strokeStyle;
  // }
  //
  // if (typeof value === 'function') {
  //   // something will go here
  // } else {
  //   const strokeWidth = this.attr('strokeWidth')();
  //   switch(value) {
  //     case 'dashed':
  //       this._strokeStyle = `${strokeWidth * 4} ${strokeWidth * 4}`;
  //       break;
  //     case 'dotted':
  //       this._strokeStyle = `${strokeWidth} ${strokeWidth}`;
  //       break;
  //     case 'solid':
  //     default:
  //       this._strokeStyle = null;
  //   }
  // }
  // return this;
}
