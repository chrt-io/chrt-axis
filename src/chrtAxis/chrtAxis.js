import {
  lineColor,
  lineWidth,
  setTickLength,
  setTickPosition,
  setLabelPosition,
  labelColor,
  ticksColor,
  ticksWidth,
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
  // hideZero,
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
  this.attr('stroke', DEAULT_LINE_COLOR);
  this.attr('strokeWidth', DEFAULT_LINE_WIDTH);
  this.attr('labelsColor', DEAULT_LINE_COLOR);
  this.attr('ticksColor', DEAULT_LINE_COLOR);
  this.attr('ticksWidth', DEFAULT_LINE_WIDTH);
  this.attr('ticksLength', TICK_LENGTH);
  this.attr('ticksPosition', TICK_POSITION);
  this.attr('labelsPosition', LABEL_POSITION);
  this.attr('interval', null);
  this.attr('labelFormat', d => d);
  this.tickTextColor = DEAULT_TICK_TEXT_COLOR;
  this.attr('showAxisLine', true);
  this.attr('zero', null);
  this.ticksFilter = null;
  this.labelsFilter = null;
  // this.tickPosition = TICK_POSITION;
  // this.labelPosition = LABEL_POSITION;
  // this.labelFormat = d => d;
  this.attr('showMinorTicks', false);
  // this._label = null;
  this._ticks = [];
  this._fixedTicks = null;


  this._classNames = ['chrt-axis'];

  this.draw = () => {
    return this;
  };

}

chrtAxis.prototype = Object.create(chrtGeneric.prototype);
chrtAxis.prototype.constructor = chrtAxis;
chrtAxis.parent = chrtGeneric.prototype;

chrtAxis.prototype = Object.assign(chrtAxis.prototype, {
  width: lineWidth,
  strokeWidth: lineWidth,
  lineWidth,
  color: lineColor,
  stroke: lineColor,
  setTickLength,
  ticksLength: setTickLength,
  tickLength: setTickLength,
  setTickPosition,
  setLabelPosition,
  tickPosition: setTickPosition,
  labelPosition: setLabelPosition,
  ticksPosition: setTickPosition,
  labelsPosition: setLabelPosition,
  showAxis,
  hideAxis,
  ticksColor,
  ticksWidth,
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
  labelColor,
  showLabels,
  hideLabels,
  firstLabel,
  lastLabel,
  firstAndLastLabels,
  orient,
  format,
  minor,
  zero,
  // hideZero,
  label,
  interval,
  title,
});

export default chrtAxis;
