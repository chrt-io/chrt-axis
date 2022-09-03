import chrtObject, { utils, cssDisplay } from 'chrt-object';
import { color, align, valign, offset } from './lib';
const { createSVG: create } = utils;

const DEFAULT_COLOR = '#000';
const DEFAULT_ALIGNMENT = 'right';
const DEFAULT_VERTICAL_ALIGNMENT = 'top';

function chrtAxisTitle(text) {
  // console.log('chrtAxisTitle', this, 'text ->', text);
  chrtObject.call(this);

  this.type = 'axis-title';
  this.g = null;
  this.attr('fill', DEFAULT_COLOR);
  this.attr('align', DEFAULT_ALIGNMENT);
  this.attr('valign', DEFAULT_VERTICAL_ALIGNMENT);
  this.attr('offset', {x: 0, y: 0});

  this._classNames = ['chrt-axis-title'];

  const xAxisDraw = () => {
    const fill = this.attr('fill')();
    const { width, _margins } = this.parentNode.parentNode;

    let x = 0;
    let textAnchor = 'start';

    switch(this.attr('align')()) {
      case 'left':
        x = _margins.left;
        textAnchor = 'start';
      break;
      case 'center':
        x = width / 2;
        textAnchor = 'middle';
      break;
      case 'right':
      default:
        x = width - _margins.right;
        textAnchor = 'end';
    }

    let dy = '0.25em';
    let y = 0;
    switch(this.attr('valign')()) {
      case 'bottom':
        y = 0;
        dy = '1em';
      break;
      case 'middle':
        y = 0;
        dy = '0.25em';
      break;
      case 'top':
      default:
        y = 0;
        dy = '-1em';
    }

    const offset = this.attr('offset')();

    this.text.textContent = text;
    this.text.setAttribute('text-anchor', textAnchor);
    this.text.setAttribute('x', x + offset.x);
    this.text.setAttribute('y', y + offset.y);
    this.text.setAttribute('dy', dy);
    this.text.setAttribute('fill', fill);
  }

  const yAxisDraw = () => {
    const fill = this.attr('fill')();
    // const fillOpacity = this.attr('fillOpacity')();
    // const stroke = this.attr('stroke')();
    // const strokeOpacity = this.attr('strokeOpacity')();
    // const strokeWidth = this.attr('strokeWidth')();

    const { height, _margins } = this.parentNode.parentNode;

    let x = 0;
    let textAnchor = 'start';

    switch(this.attr('align')()) {
      case 'left':
        x = -5;
        textAnchor = 'end';
      break;
      case 'center':
      case 'middle':
        x = 0;
        textAnchor = 'middle';
      break;
      case 'right':
      default:
        x = 5;
        textAnchor = 'start';
    }

    let dy = '0.25em';
    let y = 0;
    switch(this.attr('valign')()) {
      case 'bottom':
        y = height - _margins.bottom;
        dy = '0';
      break;
      case 'center':
      case 'middle':
        y = 0;
        dy = '0.25em';
      break;
      case 'top':
      default:
        y = _margins.top - 1;
        dy = '0';
    }

    const offset = this.attr('offset')();
    this.text.textContent = text;
    this.text.setAttribute('text-anchor', textAnchor);
    this.text.setAttribute('x', x + offset.x);
    this.text.setAttribute('y', y + offset.y);
    this.text.setAttribute('dy', dy);
    this.text.setAttribute('fill', fill);
  }

  this.draw = () => {
    // console.log('chrtAxisTitle draw', this);
    if (!this.parentNode.parentNode.scales) {
      return this.parentNode.parentNode;
    }
    if (!this.g) {
      this.g = create('g');
      // this.g.setAttribute('data-id', this._id);
      this.g.setAttribute('data-name', 'axis-title');
    }
    if (!this.parentNode.g.querySelector(`${name}AxisTitle-${this.id()}`)) {
      this.parentNode.g.appendChild(this.g);
    }

    cssDisplay.call(this, this.attr('display')());

    this.g.setAttribute('id', `${name}AxisTitle-${this.id()}`);
    this.g.classList.remove(...this.g.classList)
    this.g.classList.add(...this._classNames);
    this.g.setAttribute('aria-label', this.ariaLabel ?? text);

    // if (scales && scales.x[this.parentNode.name]) {
    //   const _scale = scales.x[this.parentNode.name];
    //   from = isNull(this._range.from) ? from : _scale(this._range.from);
    //   to = isNull(this._range.to) ? to : _scale(this._range.to);
    // }

    if (!this.text) {
      this.text = create('text');
      this.g.appendChild(this.text);
    }

    if(this.parentNode._name === 'x') {
      xAxisDraw();
    } else {
      yAxisDraw();
    }

    return this.parentNode;
  };
}

chrtAxisTitle.prototype = Object.create(chrtObject.prototype);
chrtAxisTitle.prototype.constructor = chrtAxisTitle;
chrtAxisTitle.parent = chrtObject.prototype;

chrtAxisTitle.prototype = Object.assign(chrtAxisTitle.prototype, {
  color,
  fill: color,
  align,
  valign,
  offset,
});

// export default chrtAxisTitle;
export default function (text) {
  return new chrtAxisTitle(text);
}
