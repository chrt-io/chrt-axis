import { chrtGeneric } from 'chrt-core';
import {
  color,
  stroke,
  strokeWidth,
  lineStyle,
  fillOpacity,
  range,
  from,
  to,
} from './lib';

const DEFAULT_FILL_COLOR = '#ddd';
const DEFAULT_STROKE = '#000';
const DEFAULT_STROKE_OPACITY = 1;
const DEFAULT_STROKE_WIDTH = 1;
const DEFAULT_FILL_OPACITY = 1;

function chrtAxisRange() {
  console.log('chrtAxisRange', this)
  chrtGeneric.call(this);
  this.type = 'axis-range';
  this.g = null;
  this.attr('fill', DEFAULT_FILL_COLOR);
  this.attr('stroke', DEFAULT_STROKE);
  this.attr('fillOpacity', DEFAULT_FILL_OPACITY);
  this.attr('strokeOpacity', DEFAULT_STROKE_OPACITY);
  this.attr('strokeWidth', DEFAULT_STROKE_WIDTH);
  this.attr('lineStyle', 'solid');

  this._range = {};

  this._classNames = ['chrt-axis-range'];

  this.draw = () => {
    return this.parentNode;
  };

  this.solid = () => lineStyle.call(this, 'solid');
  this.dashed = () => lineStyle.call(this, 'dashed');
  this.dotted = () => lineStyle.call(this, 'dotted');

  this.strokeOpacity = (value) => this.attr('strokeOpacity', value);

  return this.parentNode;
}

chrtAxisRange.prototype = Object.create(chrtGeneric.prototype);
chrtAxisRange.prototype.constructor = chrtAxisRange;
chrtAxisRange.parent = chrtGeneric.prototype;

chrtAxisRange.prototype = Object.assign(chrtAxisRange.prototype, {
  color,
  fill: color,
  stroke,
  strokeWidth,
  fillOpacity,
  lineStyle,
  range,
  from,
  to,
});

export default chrtAxisRange;
// export default function () {
//   return new chrtAxisRange();
// }
