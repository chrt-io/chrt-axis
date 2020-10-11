export default function strokeWidth(value) {
  if(!value) {
    return this._strokeWidth;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this._strokeWidth = value;
  }
  return this;
}
