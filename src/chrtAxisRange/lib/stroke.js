export default function stroke(value) {
  if(!value) {
    return this._stroke;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this._stroke = value;
  }
  return this;
}
