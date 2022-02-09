export default function minor(value = true) {
  this.attr('showMinorTicks', value)
  this.attr('showMinorLabels', value)
  return this;
}

export function minorTicks(value = true) {
  return this.attr('showMinorTicks', value)
}

export function minorLabels(value = true) {
  return this.attr('showMinorLabels', value)
}
