import { isNull } from '~/helpers';
import { createSVG as create } from '~/layout';
import generateTicks from './lib/generateTicks';
import chrtAxis from './chrtAxis';
import { DEFAULT_ORIENTATION, TICKS_DEFAULT } from '~/constants';

function xAxis(ticksNumber = TICKS_DEFAULT, customName = 'x') {
  chrtAxis.call(this, customName);
  const name = this.name;
  this._name = 'x';
  this._coordinates = 'x';
  this.orientation = DEFAULT_ORIENTATION[this._name];

  const xAxisTick = (tickGroup, visible) => {
    tickGroup.style.display = visible ? 'block' : 'none';

    const tickLine = tickGroup.querySelector('line');

    const orientation =
      this.orientation === DEFAULT_ORIENTATION[this._name] ? 1 : -1;
    if(tickLine) {
      tickLine.setAttribute('x1', 0);
      tickLine.setAttribute('x2', 0);
      tickLine.setAttribute('y1', 0);
      tickLine.setAttribute('y2', this.tickLength * orientation);
    }
    const label = tickGroup.querySelector('text');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('y', this.tickLength * orientation);
    label.setAttribute('dy', `${orientation > 0 ? 1 : -0.2}em`);
    label.setAttribute('fill', this.stroke);
  };

  this.draw = () => {
    if (!this.parentNode.scales.x[name]) {
      return this.parentNode;
    }

    const { _margins, width, height, scales } = this.parentNode;

    if(this._label) {
      this._label.tickIndex = -1;
    }
    const ticks = scales.x[name].ticks(this._fixedTicks || ticksNumber * 2);
    if(this._label && this._label.position === 'last') {
      ticks.reverse();
    }
    this._ticks = ticks
      .map((tick, i , arr) => {
        tick.position = scales.x[name](tick.value);
        let visible = tick.position >= _margins.left && tick.position <= width - _margins.right;
        visible = visible && (this.showMinorTicks || (tick.isZero && this.showZero) || !tick.isMinor);
        visible = visible && ((!isLog) || (isLog && !tick.isMinor));

        if(this.ticksFilter) {
          visible = this.ticksFilter(tick.value, i, arr);
        }
        tick.visible = visible;

        tick.label = null;

        if(tick.visible && this._label) {
          if(!isNull(this._label.value) && this._label.value === tick.value) {
            tick.label = this._label;
            this._label.tickIndex = tick.index;
          }
        }

        if(tick.visible && this._label && isNull(this._label.value) && (this._label.position === 'all' || this._label.tickIndex === -1)) {
          if(!isNull(this._label.position)) {
            tick.label = this._label;
            this._label.tickIndex = tick.index;
          }
        }

        return tick;
      })
      .filter(d => d.visible) // decrease the number of ticks rendered in the DOM
      // .filter((tick, i, arr) => this.ticksFilter ? this.ticksFilter(tick.value, i, arr) : true);

    this.g.setAttribute('id', `${name}Axis-${this.id()}`);
    const axisY =
      this.orientation === DEFAULT_ORIENTATION[this._name]
        ? height - _margins.bottom
        : _margins.top;
    this.g.setAttribute('transform', `translate(0,${axisY})`);

    let axisLine = this.g.querySelector(`[data-id='tick-${name}-axis-line']`);
    if (!axisLine) {
      axisLine = create('line');
      axisLine.setAttribute('data-id', `tick-${name}-axis-line`);
      this.g.appendChild(axisLine);
    }

    axisLine.setAttribute('stroke', this.stroke);
    axisLine.setAttribute('stroke-width', this.strokeWidth);

    axisLine.setAttribute('x1', _margins.left);
    axisLine.setAttribute('x2', width - _margins.right);
    const scaleY = scales.y['y'] || Object.values(scales.y)[0];
    const axisLineY = scaleY.isLog() ? scaleY.range[1] : scaleY(0) - (height - _margins.bottom);

    axisLine.setAttribute('y1', !isNaN(axisLineY) ? axisLineY : 0);
    axisLine.setAttribute('y2', !isNaN(axisLineY) ? axisLineY : 0);

    // if no axis remove the axis line after creating it
    if (!this.showAxisLine) {
      axisLine.remove();
    }

    const isLog = scales.x[name].isLog();
    this.g.querySelectorAll('g').forEach(d => {
      const tickName = d.getAttribute('data-id');

      const tick = this._ticks.find(tick => tickName === `tick-${name}-${tick}`);

      if(!tick) {
        d.remove();
      }
    })
    generateTicks.call(this, this._ticks, name, (tickGroup, tick) => {
      // console.log('generateTick', name, tick)
      tickGroup.setAttribute('transform', `translate(${tick.position}, 0)`);
      xAxisTick(tickGroup, tick.visible);
    });

    this.objects.forEach(obj => obj.draw())

    return this.parentNode;
  };
}

xAxis.prototype = Object.create(chrtAxis.prototype);
xAxis.prototype.constructor = xAxis;
xAxis.parent = chrtAxis.prototype;

// export default xAxis;

export default function(ticksNumber, customName) {
  return new xAxis(ticksNumber, customName);
}
