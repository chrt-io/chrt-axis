import {
  lineColor,
  lineWidth,
  setTickLength,
  setTickPosition,
  setLabelPosition,
  showAxis,
  hideAxis,
  ticks,
  showTicks,
  hideTicks,
  firstTick,
  lastTick,
  firstAndLastTicks,
  labels,
  showLabels,
  hideLabels,
  firstLabel,
  lastLabel,
  firstAndLastLabels,
  orient,
  format,
  minor,
  zero,
  hideZero,
  label,
  interval,
  title,
} from './lib';
import chrtGeneric from 'chrt-object';

const DEFAULT_LINE_WIDTH = 1;
const DEAULT_LINE_COLOR = '#000';
const DEAULT_TICK_TEXT_COLOR = '#000';
const TICK_LENGTH = 5;
const TICK_POSITION = 'outside';
const LABEL_POSITION = 'outside';

function chrtAxis(name) {
  chrtGeneric.call(this);
  this.type = 'axis';
  this.updater = true;

  this.name = name;
  this.strokeWidth = DEFAULT_LINE_WIDTH;
  this.stroke = DEAULT_LINE_COLOR;
  this.tickTextColor = DEAULT_TICK_TEXT_COLOR;
  this.showAxisLine = true;
  this.ticksFilter = null;
  this.labelsFilter = null;
  this.tickLength = TICK_LENGTH;
  this.tickPosition = TICK_POSITION;
  this.labelPosition = LABEL_POSITION;
  this.labelFormat = d => d;
  this.showMinorTicks = false;
  this._zero = null;
  this.showZero = true;
  this._label = null;
  this._ticks = [];
  this._fixedTicks = null;
  this._interval = null;

  this._classNames = ['chrt-axis'];

  this.draw = () => {
    if (!this.parentNode.scales[this._coordinates][name]) {
      return this.parentNode;
    }
    return this.parentNode;
  };
}

chrtAxis.prototype = Object.create(chrtGeneric.prototype);
chrtAxis.prototype.constructor = chrtAxis;
chrtAxis.parent = chrtGeneric.prototype;

chrtAxis.prototype = Object.assign(chrtAxis.prototype, {
  width: lineWidth,
  color: lineColor,
  setTickLength,
  setTickPosition,
  setLabelPosition,
  showAxis,
  hideAxis,
  ticks,
  filterTicks: showTicks,
  filter: showTicks,
  showTicks,
  hideTicks,
  firstTick,
  lastTick,
  firstAndLastTicks,
  labels,
  filterLabels: showTicks,
  showLabels,
  hideLabels,
  firstLabel,
  lastLabel,
  firstAndLastLabels,
  orient,
  format,
  minor,
  zero,
  hideZero,
  label,
  interval,
  title,
});

export default chrtAxis;
