import { isNull } from '~/helpers';
import { createSVG as create } from '~/layout';
import generateTicks from './lib/generateTicks';
import chrtAxis from './chrtAxis';
import { DEFAULT_ORIENTATION, TICKS_DEFAULT } from '~/constants';

function yAxis(ticksNumber = TICKS_DEFAULT, customName = 'y') {
  // ticksNumber = isNull(ticksNumber) ? TICKS_DEFAULT : ticksNumber;
  // console.log('Y AXIS', arguments)
  if(typeof arguments[0] === 'string') {
    customName = arguments[0];
    ticksNumber = TICKS_DEFAULT;
  }
  chrtAxis.call(this, customName, 'y');
  let name = this.name;
  this._name = 'y';
  this._coordinates  = 'y';
  this.orientation = DEFAULT_ORIENTATION[this._name];
  this._classNames = [...this._classNames,'chrt-y-axis'];

  const coords = {
    x: 'x',
    y: 'y',
  }



  const yAxisTick = (tickGroup, visible) => {
    this._name = coords.y;
    name = this.parentNode.scales[coords.y][this.name].getName();

    tickGroup.style.display = visible ? 'block' : 'none';

    const orientation =
    this.orientation === DEFAULT_ORIENTATION[this._name] ? 1 : -1;


    const tickLine = tickGroup.querySelector('line');
    if(tickLine) {
      tickLine.setAttribute('x1', 0);
      tickLine.setAttribute(
        'x2',
        (this.tickPosition === 'outside' ? -this.tickLength : this.tickLength) * orientation
      );
    }



    const label = tickGroup.querySelector('text');
    label.setAttribute(
      'text-anchor',
      this.labelPosition === 'outside'
        ? ~orientation
          ? 'end'
          : 'start'
        : ~orientation
        ? 'start'
        : 'end'
    );
    label.setAttribute(
      'x',
      (this.labelPosition === 'outside' ? -this.tickLength : 0) * orientation
    );
    label.setAttribute(
      'dx',
      `${(this.labelPosition === 'outside' ? -5 : 5) * orientation}px`
    );
    label.setAttribute(
      'dy',
      this.labelPosition === 'outside' ? '0.25em' : '-0.3em'
    );
    label.setAttribute('fill', this.stroke);
  };

  this.draw = () => {
    this._name = coords.y;
    // console.log('Y AXIS this.name', this.name)
    name = this.parentNode.scales[coords.y][this.name].getName();

    if (!this.parentNode.scales[coords.y][name]) {
      return this.parentNode;
    }
    const { _margins, scales, width, height } = this.parentNode;

    this.g.setAttribute('id', `${name}Axis-${this.id()}`);
    this._classNames.forEach(d => this.g.classList.add(d));

    const axisX =
      this.orientation === DEFAULT_ORIENTATION[this._name] ? _margins.left : width - _margins.right;
    this.g.setAttribute('transform', `translate(${axisX},0)`);
    if(this._label) {
      this._label.tickIndex = -1;
    }

    const ticks = scales[coords.y][name].ticks(this._fixedTicks || ticksNumber * 2, this._interval);
    if(this._label && this._label.position === 'last') {
      ticks.reverse();
    }
    this._ticks = ticks
      .map((tick, i , arr) => {
        tick.position = scales[coords.y][name](tick.value);
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
      this.labelPosition === 'outside' ? this.strokeWidth : 0
    );

    axisLine.setAttribute('x1', 0);
    axisLine.setAttribute('x2', 0);
    axisLine.setAttribute('y1', _margins.top);
    axisLine.setAttribute('y2', height - _margins.bottom);

    // if no axis remove the axis line after creating it
    if (!this.showAxisLine) {
      axisLine.remove();
    }

    const title = this.attr('title') ? this.attr('title')() : null;
    if(!isNull(title)) {
      let axisTitleText = this.g.querySelector('text.title');
      if(isNull(axisTitleText)) {
        axisTitleText = create('text');
        axisTitleText.classList.add('title');
      }
      axisTitleText.textContent = title;

      const orientation =
        this.orientation === DEFAULT_ORIENTATION[this._name] ? 1 : -1;

      let x = (this.labelPosition === 'outside' ? this.tickLength : 0) * orientation;

      axisTitleText.setAttribute('x', x)
      axisTitleText.setAttribute('y', _margins.top)
      axisTitleText.setAttribute('dy', this.labelPosition === 'outside' ? '0.9em' : '-0.9em')
      axisTitleText.setAttribute('dx', this.labelPosition === 'outside' ? `${5 * orientation}px` : `${-2 * orientation}px`)



      axisTitleText.setAttribute('text-anchor', ~orientation ? 'start' : 'end');
      // axisTitleText.setAttribute('text-anchor','start');

      // axisTitleText.setAttribute(
      //   'text-anchor',
      //   this.tickPosition === 'outside'
      //     ? ~orientation
      //       ? 'end'
      //       : 'start'
      //     : ~orientation
      //     ? 'start'
      //     : 'end'
      // );

      this.g.appendChild(axisTitleText);
    }

    const isLog = scales[coords.y][name].isLog();
    this.g.querySelectorAll('g').forEach(d => {
      const tickName = d.getAttribute('data-id');

      const tick = this._ticks.find(tick => tickName === `tick-${name}-${tick}`);

      if(!tick) {
        d.remove();
      }
    })
    generateTicks.call(this, this._ticks, name, (tickGroup, tick) => {
      // console.log('generateTick', name, tick)
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
