import { isNull } from '../helpers';
import { createSVG as create } from '../layout';
import generateTicks from './lib/generateTicks';
import generateLabels from './lib/generateLabels';
import chrtAxis from './chrtAxis';
import { DEFAULT_ORIENTATION, TICKS_DEFAULT } from '../constants';

function xAxis(ticksNumber = TICKS_DEFAULT, customName = 'x') {
  if(typeof arguments[0] === 'string') {
    customName = arguments[0];
    ticksNumber = TICKS_DEFAULT;
  }
  chrtAxis.call(this, customName);
  let name = this.name;
  this._name = 'x';
  this._coordinates = 'x';
  this.attr('orientation', DEFAULT_ORIENTATION[this._name]);
  this._classNames = [...this._classNames,'chrt-x-axis'];

  const coords = {
    x: 'x',
    y: 'y',
  }

  const xAxisTick = (tickGroup, visible) => {
    this._name = coords.x;
    name = this.parentNode.scales[coords.x][this.name].getName();

    tickGroup.style.display = visible ? 'block' : 'none';

    const tickLine = tickGroup.querySelector('line');
    const tickLength = this.attr('ticksLength')();
    const orientation = this.attr('orientation')();
    const orientationDirection =
      orientation === DEFAULT_ORIENTATION[this._name] ? 1 : -1;
    if(tickLine) {
      tickLine.setAttribute('x1', 0);
      tickLine.setAttribute('x2', 0);
      tickLine.setAttribute('y1', 0);
      tickLine.setAttribute('y2', (this.attr('ticksPosition')() === 'outside' ? tickLength : -tickLength) * orientationDirection);
      tickLine.setAttribute('stroke', this.ticksColor()());
      tickLine.setAttribute('stroke-width', this.ticksWidth()());
    }
    const label = tickGroup.querySelector('text');
    if(label) {
      const labelPosition = this.attr('labelsPosition')();
      label.setAttribute('text-anchor', 'middle');
      // label.setAttribute('y', this.tickLength * orientationDirection);
      label.setAttribute(
        'y',
        (labelPosition === 'outside' ? tickLength : -tickLength) * orientationDirection
      );
      label.setAttribute(
        'data-orientation',
        orientationDirection
      );
      if(orientationDirection > 0) {
        label.setAttribute('dy', `${labelPosition === 'outside' ? 1 : -0.25}em`);
      } else {
        label.setAttribute('dy', `${labelPosition === 'outside' ? -0.25 : 1}em`);
      }

      label.setAttribute('fill', this.labelsColor()());
    }
  };

  this.draw = () => {
    // console.log('DRAWING X AXIS')
    this._name = coords.x;
    // TODO: needs improvement, name and this.name will be the same
    name = this.parentNode.scales[coords.x][this.name].getName();

    // console.log('this.name vs name', this.name, name)

    if (!this.parentNode.scales[coords.x][name]) {
      return this.parentNode;
    }

    const { _margins, width, height, scales } = this.parentNode;

    const orientation = this.attr('orientation')();
    const orientationDirection =
      orientation === DEFAULT_ORIENTATION[this._name] ? 1 : -1;
    // if(this._label) {
    //   this._label.tickIndex = -1;
    // }
    // console.log('ticks', scales, coords.x, name)
    const _interval = this.attr('interval')();
    const ticks = scales[coords.x][name].ticks(this._fixedTicks || ticksNumber * 2, _interval);
    if(this._label && this._label.position === 'last') {
      ticks.reverse();
    }
    const isLog = scales[coords.x][name].isLog();
    // console.log('TICKS', ticks, `scales[${coords.x}][${name}]`,scales[coords.x][name].domain, scales[coords.x][name].range)
    this._ticks = ticks
      .map((tick, i , arr) => {
        tick.position = scales[coords.x][name](tick.value);
        let visible = tick.position >= _margins.left && tick.position <= width - _margins.right;
        // visible = visible && (this.showMinorTicks || (tick.isZero && this.showZero) || !tick.isMinor);
        visible = visible && (this.attr('showMinorTicks')() || !tick.isMinor);
        visible = visible && ((!isLog) || (isLog && !tick.isMinor));

        tick.visible = visible;
        if(this.ticksFilter) {
          tick.visible = tick.visible && this.ticksFilter(tick.value, i, arr);
        }

        tick.visibleLabel = visible;
        if(this.labelsFilter) {
          tick.visibleLabel = tick.visibleLabel && this.labelsFilter(tick.value, i, arr);
        }
        // console.log('this._label', this._label)
        // tick.label = null;
        // if(tick.visibleLabel && this._label) {
        //   if(!isNull(this._label.value) && this._label.value === tick.value) {
        //     tick.label = this._label;
        //     this._label.tickIndex = tick.index;
        //   }
        // }
        //
        // if(tick.visibleLabel && this._label && isNull(this._label.value) && (this._label.position === 'all' || this._label.tickIndex === -1)) {
        //   if(!isNull(this._label.position)) {
        //     tick.label = this._label;
        //     this._label.tickIndex = tick.index;
        //     console.log('this._label', this._label)
        //     console.log('tick.label', tick)
        //   }
        // }

        return tick;
      })
      .filter(d => d.visible || d.visibleLabel) // decrease the number of ticks rendered in the DOM

    this.g.setAttribute('id', `${name}Axis-${this.id()}`);
    this._classNames.forEach(d => this.g.classList.add(d));

    const axisY =
      orientation === DEFAULT_ORIENTATION[this._name]
        ? height - _margins.bottom
        : _margins.top;
    this.g.setAttribute('transform', `translate(0,${axisY})`);

    let axisLine = this.g.querySelector(`line[data-id='tick-${name}-axis-line']`);
    if (!axisLine) {
      axisLine = create('line');
      axisLine.setAttribute('data-id', `tick-${name}-axis-line`);
      this.g.appendChild(axisLine);
    }

    axisLine.setAttribute('stroke', this.stroke()());
    axisLine.setAttribute('stroke-width', this.strokeWidth()());

    axisLine.setAttribute('x1', _margins.left);
    axisLine.setAttribute('x2', width - _margins.right);
    const scaleY = scales[coords.y][coords.y] || Object.values(scales[coords.y])[0];
    const _zero = this.attr('zero')();
    const zero = isNull(_zero) ? scaleY.domain[0] : _zero;
    let axisLineY = scaleY.isLog() ? scaleY.range[1] : scaleY(zero) - (height - _margins.bottom);
    // console.log('scaleY', scaleY.transformation, scaleY.domain, 'zero', zero, _zero)
    if(scaleY.transformation === 'ordinal' &&
      (isNull(_zero) || !~scaleY.domain.indexOf(zero))) {
      axisLineY = 0;
    }
    // console.log(_zero, '->', scaleY(_zero),'- (',height,'-',_margins.bottom,')')
    // console.log('axisLineY', axisLineY)
    axisLine.setAttribute('y1', !isNaN(axisLineY) ? axisLineY : 0);
    axisLine.setAttribute('y2', !isNaN(axisLineY) ? axisLineY : 0);

    // if no axis remove the axis line after creating it
    if (!this.attr('showAxisLine')()) {
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

      const orientationDirection = orientation === DEFAULT_ORIENTATION[this._name] ? -1 : 1;

      let y = (5 + this.strokeWidth()()) * orientationDirection;

      axisTitleText.setAttribute('x', width - _margins.right)
      axisTitleText.setAttribute('y', y)
      axisTitleText.setAttribute('dy', `${0.9 * ~orientationDirection}em`)
      // axisTitleText.setAttribute('dx', this.tickPosition === 'outside' ? `${5 * orientationDirection}px` : `${-2 * orientationDirection}px`)



      axisTitleText.setAttribute(
        'text-anchor', 'end'
      );

      // axisTitleText.setAttribute(
      //   'text-anchor',
      //   this.tickPosition === 'outside'
      //     ? ~orientationDirection
      //       ? 'end'
      //       : 'start'
      //     : ~orientationDirection
      //     ? 'start'
      //     : 'end'
      // );

      this.g.appendChild(axisTitleText);
    }

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

    const labelsPadding = this.attr('labelsPadding')() * orientationDirection;
    generateLabels.call(this, this._ticks, name, (tickGroup, tick) => {
      // console.log('generateTick', name, tick)
      tickGroup.setAttribute('transform', `translate(${tick.position + this.attr('labelsOffset')()[0]}, ${this.attr('labelsOffset')()[1] + labelsPadding})`);
      xAxisTick(tickGroup, tick.visibleLabel);
    });

    this.objects.forEach(obj => obj.draw())

    return this; // .parentNode;
  };
}

xAxis.prototype = Object.create(chrtAxis.prototype);
xAxis.prototype.constructor = xAxis;
xAxis.parent = chrtAxis.prototype;

// export default xAxis;

export default function(ticksNumber, customName) {
  return new xAxis(ticksNumber, customName);
}
