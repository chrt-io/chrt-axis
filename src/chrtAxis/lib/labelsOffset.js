export default function labelOffset(value) {
  if(Number.isFinite(value)) {
    value = [value, value];
  }
  return this.attr('labelsOffset', value)
}
