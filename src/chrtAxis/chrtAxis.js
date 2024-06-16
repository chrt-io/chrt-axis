import {
  lineColor,
  lineWidth,
  setTickLength,
  setTickPosition,
  setLabelPosition,
  labelsColor,
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
  labelsOffset,
  labelsPadding,
  labelsClass,
  orient,
  format,
  minor,
  minorTicks,
  minorLabels,
  zero,
  // hideZero,
  label,
  interval,
  title,
} from "./lib";
import chrtObject from "chrt-object";

const DEFAULT_LINE_WIDTH = 1;
const DEAULT_LINE_COLOR = "#000";
const DEAULT_TICK_TEXT_COLOR = "#000";
const TICK_LENGTH = 5;
const TICK_POSITION = "outside";
const LABEL_POSITION = "outside";

function chrtAxis(name) {
  chrtObject.call(this);
  this.type = "axis";
  this.updater = true;

  this.name = name;
  this.attr("stroke", DEAULT_LINE_COLOR);
  this.attr("strokeWidth", DEFAULT_LINE_WIDTH);
  this.attr("labelsColor", null);
  this.attr("labelsOffset", [0, 0]);
  this.attr("labelsPadding", 0);
  this.attr("labelsClass", null);
  this.attr("ticksColor", null);
  this.attr("ticksWidth", DEFAULT_LINE_WIDTH);
  this.attr("ticksLength", TICK_LENGTH);
  this.attr("ticksPosition", TICK_POSITION);
  this.attr("labelsPosition", LABEL_POSITION);
  this.attr("interval", null);
  this.attr("labelFormat", (d) => d);
  // this.tickTextColor = DEAULT_TICK_TEXT_COLOR;
  this.attr("showAxisLine", true);
  this.attr("zero", null);
  this.ticksFilter = null;
  this.labelsFilter = null;
  this.attr("showMinorLabels", false);
  this.attr("showMinorTicks", false);
  this._ticks = [];
  this._fixedTicks = null;

  this._classNames = ["chrt-axis"];

  this.draw = () => {
    return this;
  };
}

chrtAxis.prototype = Object.create(chrtObject.prototype);
chrtAxis.prototype.constructor = chrtAxis;
chrtAxis.parent = chrtObject.prototype;

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
  filterLabels: showLabels,
  labelsColor,
  labelColor: labelsColor,
  showLabels,
  hideLabels,
  firstLabel,
  lastLabel,
  firstAndLastLabels,
  labelsOffset,
  labelsPadding,
  labelOffset: labelsOffset,
  labelPadding: labelsPadding,
  labelsClass,
  labelClass: labelsClass,
  orient,
  format,
  minor,
  minorTicks,
  minorLabels,
  zero,
  label,
  interval,
  title,
});

export default chrtAxis;
