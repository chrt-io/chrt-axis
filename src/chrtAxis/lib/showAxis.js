 export default function showAxis(value = true) {
  return this.attr('showAxisLine', value)
}

export function hideAxis() {
  return showAxis.call(this, false);
}
