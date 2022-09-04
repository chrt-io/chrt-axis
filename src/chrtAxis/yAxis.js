import generateTicks from './lib/generateTicks';
import generateLabels from './lib/generateLabels';
import chrtAxis from './chrtAxis';
import { DEFAULT_ORIENTATION, TICKS_DEFAULT } from '../constants';
import { ARIA_LABELS } from '../aria';
import { utils, cssDisplay } from 'chrt-object';
const { isNull, createSVG: create } = utils;

function yAxis(ticksNumber = TICKS_DEFAULT, customName = 'y') {
  if(typeof arguments[0] === 'string') {
    customName = arguments[0];
    ticksNumber = TICKS_DEFAULT;
  }
  chrtAxis.call(this, customName);

  const coords = {
    x: 'x',
    y: 'y',
  }
  // this.coord = coords.y;

  this.attr('orientation', DEFAULT_ORIENTATION[coords.y]);
  this._classNames = [...this._classNames,'chrt-y-axis'];
  this._name = 'y';

  const yAxisTick = (tickGroup, visible, orientationDirection) => {
    tickGroup.style.display = visible ? 'block' : 'none';

    const tickLength = this.attr('ticksLength')();
    const tickLine = tickGroup.querySelector('line');
    if(tickLine) {

      tickLine.setAttribute('x1', 0);
      tickLine.setAttribute(
        'x2',
        (this.attr('ticksPosition')() === 'outside' ? -tickLength : tickLength) * orientationDirection
      );
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
    }

  };

  this.draw = () => {
    if (!this.parentNode.scales[coords.y][this.name]) {
      return this.parentNode;
    }
    const { _margins, scales, width, height } = this.parentNode;

    cssDisplay.call(this, this.attr('display')());

    const orientation = this.attr('orientation')();
    const orientationDirection =
      orientation === DEFAULT_ORIENTATION[coords.y] ? 1 : -1;

    this.g.setAttribute('id', `${this.name}Axis-${this.id()}`);
    this.g.classList.remove(...this.g.classList)
    this.g.classList.add(...this._classNames);
    this.g.setAttribute('aria-label', this.ariaLabel ?? ARIA_LABELS[coords.y]);

    const axisX =
      orientation === DEFAULT_ORIENTATION[coords.y] ? _margins.left : width - _margins.right;
    this.g.setAttribute('transform', `translate(${axisX},0)`);

    const _interval = this.attr('interval')();
    const ticks = scales[coords.y][this.name].ticks(this._fixedTicks || ticksNumber * 2, _interval);
    if(this._label && this._label.position === 'last') {
      ticks.reverse();
    }
    this._ticks = ticks
      .map((tick, i , arr) => {
        tick.position = scales[coords.y][this.name](tick.value);
        let visible =
          tick.position >= _margins.top && tick.position <= (height - _margins.bottom);
        visible = visible && (this.attr('showMinorTicks')() || !tick.isMinor);

        tick.visible = visible;
        if(this.ticksFilter) {
          tick.visible = tick.visible && this.ticksFilter(tick.value, i, arr);
        }

        tick.visibleLabel = visible && (this.attr('showMinorLabels')() || !tick.isMinor);
        if(this.labelsFilter) {
          tick.visibleLabel = tick.visibleLabel && this.labelsFilter(tick.value, i, arr);
        }
        return tick;
      })
      .filter(d => d.visible || d.visibleLabel) // decrease the number of ticks rendered in the DOM

    const dataID = escape(`tick-${this.name}-axis-line`)
    let axisLine = this.g.querySelector(`line[data-id='${dataID}']`);
    if (!axisLine) {
      axisLine = create('line');
      axisLine.setAttribute('data-id', dataID);
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

    let axisLineX = isNull(_zero) ? scaleX.range[0] : scaleX(zero) - _margins.left;
    if(scaleX.transformation === 'ordinal' &&
      (isNull(_zero) || !~scaleX.domain.indexOf(zero))) {
      axisLineX = 0;
    }
    axisLineX = axisLineX - this.parentNode._padding.left;
    axisLine.setAttribute('x1', !isNaN(axisLineX) ? axisLineX : 0);
    axisLine.setAttribute('x2', !isNaN(axisLineX) ? axisLineX : 0);
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

      if(!this.ariaLabel) {
        this.g.setAttribute('aria-describedby', axisTitleText.textContent);
      }

      this.g.appendChild(axisTitleText);
    }

    this.g.querySelectorAll('g').forEach(d => {
      const tickName = d.getAttribute('data-id');

      const tick = this._ticks.find(tick => tickName === `tick-${name}-${tick}`);

      if(!tick) {
        d.remove();
      }
    })
    generateTicks.call(this, this._ticks, this.name, (tickGroup, tick) => {
      tickGroup.setAttribute('transform', `translate(0, ${tick.position})`);
      yAxisTick(tickGroup, tick.visible, orientationDirection);
    });
    const labelsPadding = this.attr('labelsPadding')() * (orientationDirection * -1);
    generateLabels.call(this, this._ticks, this.name, (labelGroup, tick) => {
      labelGroup.setAttribute('transform', `translate(${this.attr('labelsOffset')()[0] + labelsPadding}, ${tick.position + this.attr('labelsOffset')()[1]})`);
      yAxisTick(labelGroup, tick.visibleLabel, orientationDirection);
    });

    this.objects.forEach(obj => obj.draw())

    return this;
  };
}

yAxis.prototype = Object.create(chrtAxis.prototype);
yAxis.prototype.constructor = yAxis;
yAxis.parent = chrtAxis.prototype;

export default function(ticksNumber, customName) {
  return new yAxis(ticksNumber, customName);
}
