import { isNull } from '~/helpers';
import { createSVG as create } from '~/layout';
import generateTicks from './lib/generateTicks';
import chrtAxis from './chrtAxis';
import { DEFAULT_ORIENTATION, TICKS_DEFAULT } from '~/constants';

function yAxis(ticksNumber, customName = 'y') {
  ticksNumber = isNull(ticksNumber) ? TICKS_DEFAULT : ticksNumber;
  chrtAxis.call(this, customName, 'y');
  const name = this.name;
  this._name = 'y';
  this._coordinates  = 'y';
  this.orientation = DEFAULT_ORIENTATION[this._name];

  const yAxisTick = (tickGroup, visible) => {
    tickGroup.style.display = visible ? 'block' : 'none';

    const orientation =
      this.orientation === DEFAULT_ORIENTATION[this._name] ? 1 : -1;


    const tickLine = tickGroup.querySelector('line');
    if(tickLine) {
      tickLine.setAttribute('x1', 0);
      tickLine.setAttribute(
        'x2',
        (this.tickPosition === 'outside' ? -this.tickLength : 0) * orientation
      );
    }



    const label = tickGroup.querySelector('text');
    label.setAttribute(
      'text-anchor',
      this.tickPosition === 'outside'
        ? ~orientation
          ? 'end'
          : 'start'
        : ~orientation
        ? 'start'
        : 'end'
    );
    label.setAttribute(
      'x',
      (this.tickPosition === 'outside' ? -this.tickLength : 0) * orientation
    );
    label.setAttribute(
      'dx',
      `${(this.tickPosition === 'outside' ? -2 : 2) * orientation}px`
    );
    label.setAttribute(
      'dy',
      this.tickPosition === 'outside' ? '0.25em' : '-0.3em'
    );
    label.setAttribute('fill', this.stroke);
  };

  this.draw = () => {
    if (!this.parentNode.scales.y[name]) {
      return this.parentNode;
    }
    const { _margins, scales, width, height } = this.parentNode;

    this.g.setAttribute('id', `${name}Axis${this.id()}`);
    const axisX =
      this.orientation === DEFAULT_ORIENTATION[this._name] ? _margins.left : width - _margins.right;
    this.g.setAttribute('transform', `translate(${axisX},0)`);
    if(this._label) {
      this._label.tickIndex = -1;
    }
    const ticks = scales.y[name].ticks(this._fixedTicks || ticksNumber * 2);
    if(this._label && this._label.position === 'last') {
      ticks.reverse();
    }
    this._ticks = ticks
      .map((tick, i , arr) => {
        tick.position = scales.y[name](tick.value);
        let visible =
          tick.position >= _margins.top && tick.position <= (height - _margins.bottom);
        visible = visible && (this.showMinorTicks || (tick.isZero && this.showZero) || !tick.isMinor);
        visible = visible && ((!isLog) || (isLog && !tick.isMinor));

        if(this.ticksFilter) {
          visible = visible && this.ticksFilter(tick.value, i, arr);
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

    // console.log('Y AXIS TICKS', ticks)

    let axisLine = this.g.querySelector(`[data-id='tick-${name}-axis-line']`);
    if (!axisLine) {
      axisLine = create('line');
      axisLine.setAttribute('data-id', `tick-${name}-axis-line`);
      this.g.appendChild(axisLine);
    }

    axisLine.setAttribute('stroke', this.stroke);
    axisLine.setAttribute(
      'stroke-width',
      this.tickPosition === 'outside' ? this.strokeWidth : 0
    );

    axisLine.setAttribute('x1', 0);
    axisLine.setAttribute('x2', 0);
    axisLine.setAttribute('y1', _margins.top);
    axisLine.setAttribute('y2', height - _margins.bottom);

    // if no axis remove the axis line after creating it
    if (!this.showAxisLine) {
      axisLine.remove();
    }

    const isLog = scales.y[name].isLog();
    this.g.querySelectorAll('g').forEach(d => {
      const tickName = d.getAttribute('data-id');

      const tick = this._ticks.find(tick => tickName === `tick-${name}-${tick}`);

      if(!tick) {
        d.remove();
      }
    })
    generateTicks.call(this, this._ticks, name, (tickGroup, tick) => {
      tickGroup.setAttribute('transform', `translate(0, ${tick.position})`);
      yAxisTick(tickGroup, tick.visible);
    });

    this.objects.forEach(obj => obj.draw())

    return this.parentNode;
  };
}

yAxis.prototype = Object.create(chrtAxis.prototype);
yAxis.prototype.constructor = yAxis;
yAxis.parent = chrtAxis.prototype;

// export default yAxis;

export default function(ticksNumber, customName) {
  return new yAxis(ticksNumber, customName);
}
