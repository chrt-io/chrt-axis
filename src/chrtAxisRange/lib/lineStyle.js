export default function lineStyle(value) {
  if(!value) {
    return this._strokeStyle;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    switch(value) {
      case 'dashed':
        this._strokeStyle = `${this._strokeWidth * 4} ${this._strokeWidth * 4}`;
        break;
      case 'dotted':
        this._strokeStyle = `${this._strokeWidth} ${this._strokeWidth}`;
        break;
      case 'solid':
      default:
        this._strokeStyle = null;
    }
  }
  return this;
}
