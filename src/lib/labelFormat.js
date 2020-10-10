import { isNull } from '~/helpers';
export default function format(format) {
  if(isNull(format)) {
    return this;
  }

  if (typeof format === 'function') {
    this.labelFormat = format;
  }

  return this;
}
