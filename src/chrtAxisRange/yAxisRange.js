import chrtAxisRange from './chrtAxisRange';
import { isNull } from '~/helpers';
import { createSVG as create } from '~/layout';

function yAxisRange() {
  chrtAxisRange.call(this);

  this.class('chrt-y-axis-range')

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

    const { scales, width, _margins } = this.parentNode.parentNode;

    let from = null;
    let to = null;

    if (scales && scales.y[this.parentNode.name]) {
      const _scale = scales.y[this.parentNode.name];
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
        [this.parentNode.strokeWidth, from],
        [this.parentNode.strokeWidth, to],
        [width - (_margins.right + _margins.left), to],
        [width - (_margins.right + _margins.left), from]
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

      line.setAttribute('x1', this.parentNode.strokeWidth);
      line.setAttribute('x2', width - (_margins.left + _margins.right));
      line.setAttribute('y1', position);
      line.setAttribute('y2', position);

      line.setAttribute('stroke', stroke);
      line.setAttribute('stroke-width', strokeWidth);
      line.setAttribute('stroke-opacity', strokeOpacity);

      if (!isNull(this._strokeStyle)) {
        line.setAttribute('stroke-dasharray', this._strokeStyle);
      }
    });
  };
}

yAxisRange.prototype = Object.create(chrtAxisRange.prototype);
yAxisRange.prototype.constructor = yAxisRange;
yAxisRange.parent = chrtAxisRange.prototype;


export default function() {
  return new yAxisRange();
}