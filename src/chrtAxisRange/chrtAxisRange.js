import { chrtGeneric } from 'chrt-core';
import { isNull } from '~/helpers';
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
import { createSVG as create } from '~/layout';

const DEFAULT_FILL_COLOR = '#ddd';
const DEFAULT_STROKE = '#000';
const DEFAULT_STROKE_OPACITY = 1;
const DEFAULT_STROKE_WIDTH = 1;
const DEFAULT_FILL_OPACITY = 1;

function chrtAxisRange() {
  // console.log('chrtAxisRange', this)
  chrtGeneric.call(this);
  // console.log('HI WE ARE MARKERS', this);
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
    // console.log('chrtAxisRange draw', this);
    if (!this.parentNode.parentNode.scales) {
      return this.parentNode.parentNode;
    }
    if (!this.g) {
      this.g = create('g');
      this.g.setAttribute('data-id', this._id);
      this.g.setAttribute('data-name', 'axis-range');
    }
    if (!this.parentNode.g.querySelector(`${name}AxisRange-${this.id()}`)) {
      this.parentNode.g.appendChild(this.g);
    }
    this.g.setAttribute('id', `${name}AxisRange-${this.id()}`);
    this._classNames.forEach((d) => this.g.classList.add(d));

    const fill = this.attr('fill')();
    const fillOpacity = this.attr('fillOpacity')();
    const stroke = this.attr('stroke')();
    const strokeOpacity = this.attr('strokeOpacity')();
    const strokeWidth = this.attr('strokeWidth')();

    const { scales, height, _margins } = this.parentNode.parentNode;

    let from = null;
    let to = null;

    if (scales && scales.x[this.parentNode.name]) {
      const _scale = scales.x[this.parentNode.name];
      from = isNull(this._range.from) ? from : _scale(this._range.from);
      to = isNull(this._range.to) ? to : _scale(this._range.to);
    }

    if (!this.path) {
      this.path = create('path');
      this.g.appendChild(this.path);
    }

    if (isNull(from) && isNull(to)) {
      return;
    }

    // the range should be at least 1px thick
    from = isNull(from) ? to : from;
    to = isNull(to) ? from : to;

    if (from === to) {
      this.path.remove();
      this.path = null;
    } else {
      const d = [
        [from, -this.parentNode.strokeWidth],
        [to, -this.parentNode.strokeWidth],
        [to, -(height - (_margins.top + _margins.bottom))],
        [from, -(height - (_margins.top + _margins.bottom))],
      ];
      this.path.setAttribute('d', `M${d.join('L')}z`);
      this.path.setAttribute('fill', fill);
      this.path.setAttribute('fill-opacity', fillOpacity);
    }

    const strokeStyle = this.attr('lineStyle')();
    if (!isNull(strokeStyle)) {
      switch (strokeStyle) {
        case 'dashed':
          this._strokeStyle = `${strokeWidth * 4} ${strokeWidth * 4}`;
          break;
        case 'dotted':
          this._strokeStyle = `${strokeWidth} ${strokeWidth}`;
          break;
        case 'solid':
        default:
          this._strokeStyle = null;
      }
    }

    const lines = [...new Set([from, to])];
    this.lines = [];

    lines.forEach((position, index) => {
      if (!this.lines[index]) {
        this.lines[index] = create('line');
        this.g.appendChild(this.lines[index]);
      }
      const line = this.lines[index];

      line.setAttribute('x1', position);
      line.setAttribute('x2', position);
      line.setAttribute('y1', -this.parentNode.strokeWidth);
      line.setAttribute('y2', -(height - (_margins.top + _margins.bottom)));

      line.setAttribute('stroke', stroke);
      line.setAttribute('stroke-width', strokeWidth);
      line.setAttribute('stroke-opacity', strokeOpacity);

      if (!isNull(this._strokeStyle)) {
        line.setAttribute('stroke-dasharray', this._strokeStyle);
      }
    });
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
