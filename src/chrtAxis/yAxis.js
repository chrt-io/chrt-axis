import { createSVG as create } from '~/layout';
import generateTicks from './lib/generateTicks';
import chrtAxis from './chrtAxis';
import { DEFAULT_ORIENTATION, TICKS_DEFAULT } from '~/constants';

function yAxis(ticksNumber = TICKS_DEFAULT) {
  chrtAxis.call(this, 'y');
  const name = this.name;

  const yAxisTick = (tickGroup, visible) => {
    tickGroup.style.display = visible ? 'block' : 'none';

    const orientation =
      this.orientation === DEFAULT_ORIENTATION[this.name] ? 1 : -1;


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
    if (!this.parentNode.scales[name]) {
      return this.parentNode;
    }
    const { _margins, scales, width, height } = this.parentNode;

    // CHECKING MARGINS
    // let topMarginLine = this.g.querySelector(`[data-id='top-margin-${name}-axis-line']`);
    // if (!topMarginLine) {
    //   topMarginLine = create('line');
    //   topMarginLine.setAttribute('data-id', `top-margin-${name}-axis-line`);
    //   this.g.appendChild(topMarginLine);
    //
    //   topMarginLine.setAttribute('stroke', '#f00');
    //   topMarginLine.setAttribute(
    //     'stroke-width',
    //     2
    //   );
    //
    //   topMarginLine.setAttribute('x1', 0);
    //   topMarginLine.setAttribute('x2', width);
    // }
    // topMarginLine.setAttribute('y1', _margins.top);
    // topMarginLine.setAttribute('y2', _margins.top);
    //
    // let bottomMarginLine = this.g.querySelector(`[data-id='bottom-margin-${name}-axis-line']`);
    // if (!bottomMarginLine) {
    //   bottomMarginLine = create('line');
    //   bottomMarginLine.setAttribute('data-id', `bottom-margin-${name}-axis-line`);
    //   this.g.appendChild(bottomMarginLine);
    //
    //   bottomMarginLine.setAttribute('stroke', '#f00');
    //   bottomMarginLine.setAttribute(
    //     'stroke-width',
    //     2
    //   );
    //
    //   bottomMarginLine.setAttribute('x1', 0);
    //   bottomMarginLine.setAttribute('x2', width);
    // }
    // bottomMarginLine.setAttribute('y1', height - _margins.bottom);
    // bottomMarginLine.setAttribute('y2', height - _margins.bottom);

    this.g.setAttribute('id', `${name}Axis${this.id()}`);
    const axisX =
      this.orientation === DEFAULT_ORIENTATION[this.name] ? _margins.left : width - _margins.right;
    this.g.setAttribute('transform', `translate(${axisX},0)`);
    if(this._label) {
      this._label.tickIndex = -1;
    }
    const ticks = scales[name]
      //.ticks(ticksNumber * (this.showMinorTicks ? 2 : 1))
      .ticks(ticksNumber * 2)
      .map((tick, i , arr) => {
        tick.position = scales[name](tick.value);
        let visible =
          tick.position >= _margins.top && tick.position <= height - _margins.bottom;
          // tick.position >= 0 && tick.position <= height ;
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
      .filter((tick, i, arr) => this.ticksFilter ? this.ticksFilter(tick.value, i, arr) : true);
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

    const isLog = scales[name].isLog();
    this.g.querySelectorAll('g').forEach(d => {
      const tickName = d.getAttribute('data-id');

      const tick = ticks.find(tick => tickName === `tick-${name}-${tick}`);

      if(!tick) {
        d.remove();
      }
    })
    generateTicks.call(this, ticks, name, (tickGroup, tick) => {
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

export default yAxis;
