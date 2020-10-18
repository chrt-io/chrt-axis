import { createSVG as create } from '~/layout';
import generateTicks from './lib/generateTicks';
import chrtAxis from './chrtAxis';
import { DEFAULT_ORIENTATION, TICKS_DEFAULT } from '~/constants';

function xAxis(ticksNumber = TICKS_DEFAULT) {
  chrtAxis.call(this, 'x');
  const name = this.name;

  const xAxisTick = (tickGroup, visible) => {
    tickGroup.style.display = visible ? 'block' : 'none';

    const tickLine = tickGroup.querySelector('line');

    const orientation =
      this.orientation === DEFAULT_ORIENTATION[this.name] ? 1 : -1;

    tickLine.setAttribute('x1', 0);
    tickLine.setAttribute('x2', 0);
    tickLine.setAttribute('y1', 0);
    tickLine.setAttribute('y2', this.tickLength * orientation);

    const label = tickGroup.querySelector('text');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('y', this.tickLength * orientation);
    label.setAttribute('dy', `${orientation > 0 ? 1 : -0.2}em`);
    label.setAttribute('fill', this.stroke);
  };

  this.draw = () => {
    if (!this.parentNode.scales[name]) {
      return this.parentNode;
    }

    const { _margins, width, height, scales } = this.parentNode;

    if(this._label) {
      this._label.tickIndex = -1;
    }
    let ticks = scales[name]
      .ticks(ticksNumber * 2)
      .map((tick, i , arr) => {
        tick.position = scales[name](tick.value);
        let visible =
          tick.position >= _margins.left && tick.position <= width - _margins.right;
        visible = visible && (this.showMinorTicks || (tick.isZero && this.showZero) || !tick.isMinor);
        visible = visible && ((!isLog) || (isLog && !tick.isMinor));

        if(this.ticksFilter) {
          visible = this.ticksFilter(tick.value, i, arr);
        }
        tick.visible = visible;

        tick.label = null;

        if(tick.visible && this._label && this._label.tickIndex === -1) {
          tick.label = this._label;
          this._label.tickIndex = tick.index;
        }

        return tick;
      })
      // .filter((tick, i, arr) => this.ticksFilter ? this.ticksFilter(tick.value, i, arr) : true);

    this.g.setAttribute('id', `${name}Axis-${this.id()}`);
    const axisY =
      this.orientation === DEFAULT_ORIENTATION[this.name]
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
    const axisLineY = scales['y'].isLog() ? scales['y'].range[1] : scales['y'](0) - (height - _margins.bottom);

    axisLine.setAttribute('y1', !isNaN(axisLineY) ? axisLineY : 0);
    axisLine.setAttribute('y2', !isNaN(axisLineY) ? axisLineY : 0);

    // if no axis remove the axis line after creating it
    if (!this.showAxisLine) {
      axisLine.remove();
    }

    const isLog = scales[name].isLog();
    this.g.querySelectorAll('g').forEach(d => {
      const tickName = d.getAttribute('data-id');

      const tick = ticks.find(tick => tickName === `tick-${name}-${tick}`);

      if(!tick) {
        d.remove();
      }
    })
    generateTicks.call(this, ticks, name, (tickGroup, tick) => {
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

export default xAxis;
