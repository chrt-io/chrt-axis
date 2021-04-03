import { isNull } from '~/helpers';
import { createSVG as create } from '~/layout';
import generateTicks from './lib/generateTicks';
import generateLabels from './lib/generateLabels';
import chrtAxis from './chrtAxis';
import { DEFAULT_ORIENTATION, TICKS_DEFAULT } from '~/constants';

function xAxis(ticksNumber = TICKS_DEFAULT, customName = 'x') {
  if(typeof arguments[0] === 'string') {
    customName = arguments[0];
    ticksNumber = TICKS_DEFAULT;
  }
  chrtAxis.call(this, customName);
  let name = this.name;
  this._name = 'x';
  this._coordinates = 'x';
  this.orientation = DEFAULT_ORIENTATION[this._name];

  const coords = {
    x: 'x',
    y: 'y',
  }

  this._classNames = [...this._classNames,'chrt-x-axis'];

  const xAxisTick = (tickGroup, visible) => {
    this._name = coords.x;
    name = this.parentNode.scales[coords.x][this.name].getName();

    tickGroup.style.display = visible ? 'block' : 'none';

    const tickLine = tickGroup.querySelector('line');

    const orientation =
      this.orientation === DEFAULT_ORIENTATION[this._name] ? 1 : -1;
    if(tickLine) {
      tickLine.setAttribute('x1', 0);
      tickLine.setAttribute('x2', 0);
      tickLine.setAttribute('y1', 0);
      tickLine.setAttribute('y2', (this.tickPosition === 'outside' ? this.tickLength : -this.tickLength) * orientation);
    }
    const label = tickGroup.querySelector('text');
    if(label) {
      label.setAttribute('text-anchor', 'middle');
      // label.setAttribute('y', this.tickLength * orientation);
      label.setAttribute(
        'y',
        (this.labelPosition === 'outside' ? this.tickLength : -this.tickLength) * orientation
      );
      label.setAttribute(
        'data-orientation',
        orientation
      );
      if(orientation > 0) {
        label.setAttribute('dy', `${this.labelPosition === 'outside' ? 1 : -0.25}em`);
      } else {
        label.setAttribute('dy', `${this.labelPosition === 'outside' ? -0.25 : 1}em`);
      }

      label.setAttribute('fill', this.stroke);
    }
  };

  this.draw = () => {
    this._name = coords.x;
    // TODO: needs improvement, name and this.name will be the same
    name = this.parentNode.scales[coords.x][this.name].getName();

    // console.log('this.name vs name', this.name, name)

    if (!this.parentNode.scales[coords.x][name]) {
      return this.parentNode;
    }

    const { _margins, width, height, scales } = this.parentNode;

    if(this._label) {
      this._label.tickIndex = -1;
    }

    const ticks = scales[coords.x][name].ticks(this._fixedTicks || ticksNumber * 2, this._interval);
    if(this._label && this._label.position === 'last') {
      ticks.reverse();
    }
    this._ticks = ticks
      .map((tick, i , arr) => {
        tick.position = scales[coords.x][name](tick.value);
        let visible = tick.position >= _margins.left && tick.position <= width - _margins.right;
        visible = visible && (this.showMinorTicks || (tick.isZero && this.showZero) || !tick.isMinor);
        visible = visible && ((!isLog) || (isLog && !tick.isMinor));

        tick.visible = visible;
        if(this.ticksFilter) {
          tick.visible = tick.visible && this.ticksFilter(tick.value, i, arr);
        }

        tick.visibleLabel = visible;
        if(this.labelsFilter) {
          tick.visibleLabel = tick.visibleLabel && this.labelsFilter(tick.value, i, arr);
        }

        tick.label = null;
        if(tick.visibleLabel && this._label) {
          if(!isNull(this._label.value) && this._label.value === tick.value) {
            tick.label = this._label;
            this._label.tickIndex = tick.index;
          }
        }

        if(tick.visibleLabel && this._label && isNull(this._label.value) && (this._label.position === 'all' || this._label.tickIndex === -1)) {
          if(!isNull(this._label.position)) {
            tick.label = this._label;
            this._label.tickIndex = tick.index;
          }
        }

        return tick;
      })
      .filter(d => d.visible || d.visibleLabel) // decrease the number of ticks rendered in the DOM

    this.g.setAttribute('id', `${name}Axis-${this.id()}`);
    this._classNames.forEach(d => this.g.classList.add(d));

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
    const scaleY = scales[coords.y][coords.y] || Object.values(scales[coords.y])[0];
    const zero = isNull(this._zero) ? scaleY.domain[0] : this._zero;
    let axisLineY = scaleY.isLog() ? scaleY.range[1] : scaleY(zero) - (height - _margins.bottom);

    if(scaleY.transformation==='ordinal' && !~scaleY.domain.indexOf(zero)) {
      axisLineY = 0;
    }
    // console.log(this._zero, '->', scaleY(this._zero),'- (',height,'-',_margins.bottom,')')
    // console.log('axisLineY', axisLineY)
    axisLine.setAttribute('y1', !isNaN(axisLineY) ? axisLineY : 0);
    axisLine.setAttribute('y2', !isNaN(axisLineY) ? axisLineY : 0);

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
        this.orientation === DEFAULT_ORIENTATION[this._name] ? -1 : 1;

      let y = (5 + this.strokeWidth) * orientation;

      axisTitleText.setAttribute('x', width - _margins.right)
      axisTitleText.setAttribute('y', y)
      axisTitleText.setAttribute('dy', `${0.9 * ~orientation}em`)
      // axisTitleText.setAttribute('dx', this.tickPosition === 'outside' ? `${5 * orientation}px` : `${-2 * orientation}px`)



      axisTitleText.setAttribute(
        'text-anchor', 'end'
      );

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

    const isLog = scales[coords.x][name].isLog();
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
    generateLabels.call(this, this._ticks, name, (tickGroup, tick) => {
      // console.log('generateTick', name, tick)
      tickGroup.setAttribute('transform', `translate(${tick.position}, 0)`);
      xAxisTick(tickGroup, tick.visibleLabel);
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
