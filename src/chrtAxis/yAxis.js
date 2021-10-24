import { isNull } from '../helpers';
import { createSVG as create } from '../layout';
import generateTicks from './lib/generateTicks';
import generateLabels from './lib/generateLabels';
import chrtAxis from './chrtAxis';
import { DEFAULT_ORIENTATION, TICKS_DEFAULT } from '../constants';

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
  this.attr('orientation', DEFAULT_ORIENTATION[this._name]);
  this._classNames = [...this._classNames,'chrt-y-axis'];

  const coords = {
    x: 'x',
    y: 'y',
  }

  const yAxisTick = (tickGroup, visible) => {
    this._name = coords.y;
    name = this.parentNode.scales[coords.y][this.name].getName();

    tickGroup.style.display = visible ? 'block' : 'none';

    const orientation = this.attr('orientation')();
    const orientationDirection =
      orientation === DEFAULT_ORIENTATION[this._name] ? 1 : -1;

    const tickLength = this.attr('ticksLength')();
    const tickLine = tickGroup.querySelector('line');
    if(tickLine) {

      tickLine.setAttribute('x1', 0);
      tickLine.setAttribute(
        'x2',
        (this.attr('ticksPosition')() === 'outside' ? -tickLength : tickLength) * orientationDirection
      );
      tickLine.setAttribute('stroke', this.ticksColor()());
    }


    const labelPosition = this.attr('labelsPosition')();

    const label = tickGroup.querySelector('text');
    if(label) {
      label.setAttribute(
        'text-anchor',
        labelPosition === 'outside'
          ? ~orientationDirection
            ? 'end'
            : 'start'
          : ~orientationDirection
          ? 'start'
          : 'end'
      );
      label.setAttribute(
        'x',
        (labelPosition === 'outside' ? -tickLength : 0) * orientationDirection
      );
      label.setAttribute(
        'dx',
        `${(labelPosition === 'outside' ? -5 : 5) * orientationDirection}px`
      );
      label.setAttribute(
        'dy',
        labelPosition === 'outside' ? '0.25em' : '-0.3em'
      );
      label.setAttribute('fill', this.labelsColor()());
    }

  };

  this.draw = () => {
    // console.log('DRAWING Y AXIS')

    this._name = coords.y;
    // console.log('Y AXIS this.name', this.name)
    name = this.parentNode.scales[coords.y][this.name].getName();

    if (!this.parentNode.scales[coords.y][name]) {
      return this.parentNode;
    }
    const { _margins, scales, width, height } = this.parentNode;

    const orientation = this.attr('orientation')();
    const orientationDirection =
      orientation === DEFAULT_ORIENTATION[this._name] ? 1 : -1;

    this.g.setAttribute('id', `${name}Axis-${this.id()}`);
    this._classNames.forEach(d => this.g.classList.add(d));

    const axisX =
      orientation === DEFAULT_ORIENTATION[this._name] ? _margins.left : width - _margins.right;
    this.g.setAttribute('transform', `translate(${axisX},0)`);
    // if(this._label) {
    //   this._label.tickIndex = -1;
    // }
    const _interval = this.attr('interval')();
    const ticks = scales[coords.y][name].ticks(this._fixedTicks || ticksNumber * 2, _interval);
    if(this._label && this._label.position === 'last') {
      ticks.reverse();
    }
    // console.log('TICKS', ticks, `scales[${coords.y}][${name}]`,scales[coords.y][name].domain, scales[coords.y][name].range)
    const isLog = scales[coords.y][name].isLog();
    this._ticks = ticks
      .map((tick, i , arr) => {
        tick.position = scales[coords.y][name](tick.value);
        let visible =
          tick.position >= _margins.top && tick.position <= (height - _margins.bottom);
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
        return tick;
      })
      .filter(d => d.visible || d.visibleLabel) // decrease the number of ticks rendered in the DOM

    // console.log('Y AXIS TICKS', ticks)

    let axisLine = this.g.querySelector(`line[data-id='tick-${name}-axis-line']`);
    if (!axisLine) {
      axisLine = create('line');
      axisLine.setAttribute('data-id', `tick-${name}-axis-line`);
      this.g.appendChild(axisLine);
    }
    const labelPosition = this.attr('labelsPosition')();
    axisLine.setAttribute('stroke', this.stroke()());
    axisLine.setAttribute(
      'stroke-width', this.strokeWidth()()
    );

    const scaleX = scales[coords.x][coords.x] || Object.values(scales[coords.x])[0];
    const _zero = this.attr('zero')();
    const zero = isNull(_zero) ? scaleX.domain[0] : _zero;
    // let axisLineX = scaleX.isLog() ? scaleX.range[0] : scaleX(zero) - _margins.left;
    let axisLineX = scaleX(zero) - _margins.left;
    // console.log(this.parentNode._padding)
    // console.log('scaleX', scaleX.transformation, scaleX.domain, 'zero', zero, _zero)
    if(scaleX.transformation === 'ordinal' &&
      (isNull(_zero) || !~scaleX.domain.indexOf(zero))) {
      axisLineX = 0;
    }
    // console.log(_zero, '->', scaleY(_zero),'- (',height,'-',_margins.bottom,')')
    // console.log('axisLineX', axisLineX)
    axisLineX = axisLineX - this.parentNode._padding.left;
    axisLine.setAttribute('x1', !isNaN(axisLineX) ? axisLineX : 0);
    axisLine.setAttribute('x2', !isNaN(axisLineX) ? axisLineX : 0);

    // axisLine.setAttribute('x1', 0);
    // axisLine.setAttribute('x2', 0);
    axisLine.setAttribute('y1', _margins.top);
    axisLine.setAttribute('y2', height - _margins.bottom);

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
      let x = (labelPosition === 'outside' ? this.tickLength : 0) * orientationDirection;

      axisTitleText.setAttribute('x', x)
      axisTitleText.setAttribute('y', _margins.top)
      axisTitleText.setAttribute('dy', labelPosition === 'outside' ? '0.9em' : '-0.9em')
      axisTitleText.setAttribute('dx', labelPosition === 'outside' ? `${5 * orientationDirection}px` : `${-2 * orientationDirection}px`)



      axisTitleText.setAttribute('text-anchor', ~orientationDirection ? 'start' : 'end');
      // axisTitleText.setAttribute('text-anchor','start');

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
      tickGroup.setAttribute('transform', `translate(0, ${tick.position})`);
      yAxisTick(tickGroup, tick.visible);
    });
    const labelsPadding = this.attr('labelsPadding')() * (orientationDirection * -1);
    generateLabels.call(this, this._ticks, name, (labelGroup, tick) => {
      // console.log('generateTick', name, tick)
      labelGroup.setAttribute('transform', `translate(${this.attr('labelsOffset')()[0] + labelsPadding}, ${tick.position + this.attr('labelsOffset')()[1]})`);
      yAxisTick(labelGroup, tick.visibleLabel);
    });

    this.objects.forEach(obj => obj.draw())

    return this; // .parentNode; // .update();
  };
}

yAxis.prototype = Object.create(chrtAxis.prototype);
yAxis.prototype.constructor = yAxis;
yAxis.parent = chrtAxis.prototype;

// export default yAxis;

export default function(ticksNumber, customName) {
  return new yAxis(ticksNumber, customName);
}
