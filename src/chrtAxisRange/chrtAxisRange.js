import { chrtGeneric } from 'chrt-core';
import { isNull } from '~/helpers';
import {
  color,
  stroke,
  strokeWidth,
  lineStyle,
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
  chrtGeneric.call(this);
  // console.log('HI WE ARE MARKERS', this);
  this.type = 'axis-range';
  this.g = null;
  this._fill = null;
  this._range = {};

  this.draw = () => {
    // console.log('chrtAxisRange draw', this);
    if (!this.parentNode.parentNode.scales) {
      return this.parentNode.parentNode;
    }
    if (!this.g) {
      this.g = create('g');
      this.g.setAttribute('data-id', this._id);
      this.g.setAttribute('data-name', 'axis-range')
    }

    this.parentNode.g.appendChild(this.g);

    const fill = this._fill || DEFAULT_FILL_COLOR;
    const fillOpacity = this._fillOpacity || DEFAULT_FILL_OPACITY;
    const stroke = this._stroke || DEFAULT_STROKE;
    const strokeOpacity = !isNull(this._strokeOpacity) ? this._strokeOpacity : DEFAULT_STROKE_OPACITY;
    const strokeWidth = !isNull(this._strokeWidth) ? this._strokeWidth :  DEFAULT_STROKE_WIDTH;

    const { scales, height, _margins } = this.parentNode.parentNode;

    let from = null;
    let to = null;
    if (scales && scales['x']) {
      from = isNull(this._range.from) ? from : scales['x'](this._range.from);
      to = isNull(this._range.to) ? to : scales['x'](this._range.to);
    }

    if (!this.path) {
      this.path = create('path');
      this.g.appendChild(this.path);
    }

    if(isNull(from) && isNull(to)) {
      return;
    }

    // the range should be at least 1px thick
    from = isNull(from) ? to : from;
    to = isNull(to) ? from : to;

    if(from === to) {
      this.path.remove();
      this.path = null;

      if (!this.line) {
        this.line = create('line');
        this.g.appendChild(this.line);
      }

      this.line.setAttribute('x1', from);
      this.line.setAttribute('x2', from);
      this.line.setAttribute('y1', -this.parentNode.strokeWidth);
      this.line.setAttribute('y2', -(height - (_margins.top + _margins.bottom)));

      this.line.setAttribute('stroke', stroke)
      this.line.setAttribute('stroke-width', strokeWidth)
      this.line.setAttribute('stroke-opacity', strokeOpacity)

      if(!isNull(this._strokeStyle)) {
        this.line.setAttribute('stroke-dasharray', this._strokeStyle);
      }


    } else {
      const d = [[from, -this.parentNode.strokeWidth],[to,-this.parentNode.strokeWidth],[to, -(height - (_margins.top + _margins.bottom))], [from, -(height - (_margins.top + _margins.bottom))]];
      this.path.setAttribute('d', `M${d.join('L')}z`);
      this.path.setAttribute('fill', fill)
      this.path.setAttribute('fill-opacity', fillOpacity)
      this.path.setAttribute('stroke', stroke)
      this.path.setAttribute('strokeWidth', strokeWidth)
      this.path.setAttribute('stroke-opacity', strokeOpacity)
    }

  };

  this.solid = () => lineStyle.call(this, 'solid');
  this.dashed = () => lineStyle.call(this, 'dashed');
  this.dotted = () => lineStyle.call(this, 'dotted');
}

chrtAxisRange.prototype = Object.create(chrtGeneric.prototype);
chrtAxisRange.prototype.constructor = chrtAxisRange;
chrtAxisRange.parent = chrtGeneric.prototype;

chrtAxisRange.prototype = Object.assign(chrtAxisRange.prototype, {
  color,
  stroke,
  strokeWidth,
  lineStyle,
  range,
  from,
  to,
});

// export default chrtAxisRange;
export default function() {
  return new chrtAxisRange();
}
