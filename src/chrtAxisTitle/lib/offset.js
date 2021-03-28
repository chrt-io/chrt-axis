export default function offset(value) {
  const currentOffset = this.attr('offset')();

  return this.attr('offset', Object.assign({}, currentOffset || {}, value));
  // if(!value) {
  //   return this._fill;
  // }
  //
  // if (typeof value === 'function') {
  //   // something will go here
  // } else {
  //   this._fill = value;
  // }
  // return this;
}
