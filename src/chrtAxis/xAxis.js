import generateTicks from "./lib/generateTicks";
import generateLabels from "./lib/generateLabels";
import chrtAxis from "./chrtAxis";
import { DEFAULT_ORIENTATION, TICKS_DEFAULT } from "../constants";
import { ARIA_LABELS } from "../aria";
import { utils, cssDisplay } from "chrt-object";
const { isNull, createSVG: create } = utils;

function xAxis(ticksNumber = TICKS_DEFAULT, customName = "x") {
  if (typeof arguments[0] === "string") {
    customName = arguments[0];
    ticksNumber = TICKS_DEFAULT;
  }
  chrtAxis.call(this, customName);
  const coords = {
    x: "x",
    y: "y",
  };
  // this.coord = coords.x;

  this.attr("orientation", DEFAULT_ORIENTATION[coords.x]);
  this._classNames = [...this._classNames, "chrt-x-axis"];
  this._name = "x";

  const xAxisTick = (tickGroup, visible, orientationDirection) => {
    tickGroup.style.display = visible ? "block" : "none";

    const tickLine = tickGroup.querySelector("line");
    const tickLength = this.attr("ticksLength")();

    if (tickLine) {
      tickLine.setAttribute("x1", 0);
      tickLine.setAttribute("x2", 0);
      tickLine.setAttribute("y1", 0);
      tickLine.setAttribute(
        "y2",
        (this.attr("ticksPosition")() === "outside"
          ? tickLength
          : -tickLength) * orientationDirection,
      );
      // tickLine.setAttribute('stroke-width', this.ticksWidth()());
    }
  };
  const xAxisLabel = (tickGroup, visible, compositePosition) => {
    const label = tickGroup.querySelector("foreignObject > div");
    if (label) {
      const tickLength = this.attr("ticksLength")();
      // horizontal centered alignment
      label.style.textAlign = "center";

      // if orientationDirection is positive, the label is below the axis
      const labelPosition = this.attr("labelsPosition")();

      // the distance from the axis is the tickLength (then the tickGroup is translated by the labelsPadding and labelsOffset )
      const y = `${
        compositePosition === "below" ? tickLength + 1 : -(tickLength + 1)
      }`;

      label.style.transform = `translate(-50%,${
        compositePosition === "below" ? `${y}px` : `calc(-100% + ${y}px)`
      })`;
    }
  };

  this.draw = () => {
    if (!this.parentNode.scales[coords.x][this.name]) {
      return this.parentNode;
    }

    cssDisplay.call(this, this.attr("display")());

    const { _margins, width, height, scales } = this.parentNode;

    const orientation = this.attr("orientation")();
    const orientationDirection =
      orientation === DEFAULT_ORIENTATION[coords.x] ? 1 : -1;

    const ticks = scales[coords.x][this.name].ticks(
      this._fixedTicks || ticksNumber * 2,
      this.attr("interval")(),
    );
    if (this._label && this._label.position === "last") {
      ticks.reverse();
    }

    this._ticks = ticks
      .map((tick, i, arr) => {
        tick.position = scales[coords.x][this.name](tick.value);
        let visible =
          tick.position >= _margins.left &&
          tick.position <= width - _margins.right;
        visible = visible && (this.attr("showMinorTicks")() || !tick.isMinor);

        tick.visible = visible;
        if (this.ticksFilter) {
          tick.visible = tick.visible && this.ticksFilter(tick.value, i, arr);
        }

        tick.visibleLabel =
          visible && (this.attr("showMinorLabels")() || !tick.isMinor);
        if (this.labelsFilter) {
          tick.visibleLabel =
            tick.visibleLabel && this.labelsFilter(tick.value, i, arr);
        }

        return tick;
      })
      .filter((d) => d.visible || d.visibleLabel); // decrease the number of ticks rendered in the DOM

    this.g.setAttribute("id", `${this.name}Axis-${this.id()}`);
    this.g.classList.remove(...this.g.classList);
    this.g.classList.add(...this._classNames);
    this.g.setAttribute("aria-label", this.ariaLabel ?? ARIA_LABELS[coords.x]);
    this.g.setAttribute("data-orientation", orientation);
    const axisY =
      orientation === DEFAULT_ORIENTATION[coords.x]
        ? height - _margins.bottom
        : _margins.top;
    this.g.setAttribute("transform", `translate(0,${axisY})`);

    const dataID = encodeURIComponent(`tick-${this.name}-axis-line`);
    let axisLine = this.g.querySelector(`line[data-id='${dataID}']`);
    if (!axisLine) {
      axisLine = create("line");
      axisLine.setAttribute("data-id", dataID);
      this.g.appendChild(axisLine);
    }

    axisLine.setAttribute("stroke", this.stroke()());
    axisLine.setAttribute("stroke-width", this.strokeWidth()());

    axisLine.setAttribute("x1", _margins.left);
    axisLine.setAttribute("x2", width - _margins.right);
    const scaleY =
      scales[coords.y][coords.y] || Object.values(scales[coords.y])[0];
    const _zero = this.attr("zero")();
    const zero = isNull(_zero) ? scaleY.domain[0] : _zero;
    let axisLineY = scaleY.isLog()
      ? scaleY.range[1]
      : scaleY(zero) - (height - _margins.bottom);
    if (
      scaleY.transformation === "ordinal" &&
      (isNull(_zero) || !~scaleY.domain.indexOf(zero))
    ) {
      axisLineY = 0;
    }
    axisLine.setAttribute("y1", !isNaN(axisLineY) ? axisLineY : 0);
    axisLine.setAttribute("y2", !isNaN(axisLineY) ? axisLineY : 0);

    // if no axis remove the axis line after creating it
    if (!this.attr("showAxisLine")()) {
      axisLine.remove();
    }

    const title = this.attr("title") ? this.attr("title")() : null;
    if (!isNull(title)) {
      let axisTitleText = this.g.querySelector("text.title");
      if (isNull(axisTitleText)) {
        axisTitleText = create("text");
        axisTitleText.classList.add("title");
      }
      axisTitleText.textContent = title;

      const orientationDirection =
        orientation === DEFAULT_ORIENTATION[coords.x] ? -1 : 1;

      let y = (5 + this.strokeWidth()()) * orientationDirection;

      axisTitleText.setAttribute("x", width - _margins.right);
      axisTitleText.setAttribute("y", y);
      axisTitleText.setAttribute("dy", `${0.9 * ~orientationDirection}em`);

      axisTitleText.setAttribute("text-anchor", "end");

      if (!this.ariaLabel) {
        this.g.setAttribute("aria-describedby", axisTitleText.textContent);
      }

      this.g.appendChild(axisTitleText);
    }

    this.g.querySelectorAll("g").forEach((d) => {
      const tickName = d.getAttribute("data-id");

      const tick = this._ticks.find(
        (tick) => tickName === `tick-${this.name}-${tick}`,
      );

      if (!tick) {
        d.remove();
      }
    });
    generateTicks.call(this, this._ticks, this.name, (tickGroup, tick) => {
      tickGroup.setAttribute("transform", `translate(${tick.position}, 0)`);
      xAxisTick(tickGroup, tick.visible, orientationDirection);
    });

    let compositePosition = "below";
    const labelPosition = this.attr("labelsPosition")();
    if (orientationDirection > 0) {
      compositePosition = labelPosition === "outside" ? "below" : "above";
    } else {
      compositePosition = labelPosition === "outside" ? "above" : "below";
    }
    const labelsPadding = this.attr("labelsPadding")();

    generateLabels.call(
      this,
      this._ticks,
      this.name,
      {
        getTickDistance: (tick, i) => {
          const nextTick = this._ticks?.[i + 1] || this._ticks?.[i - 1];
          return nextTick ? Math.abs(nextTick.position - tick.position) : 0;
        },
      },
      (labelGroup, tick, i) => {
        // labelGroup.setAttribute(
        //   'transform',
        //   `translate(${
        //     tick.position + this.attr('labelsOffset')(tick, i)[0]
        //   }, ${
        //     this.attr('labelsOffset')(tick, i)[1] +
        //     labelsPadding * (compositePosition === 'below' ? 1 : -1)
        //   })`,
        // );
        labelGroup
          .querySelector("foreignObject")
          .setAttribute(
            "x",
            tick.position + this.attr("labelsOffset")(tick, i)[0],
          );
        labelGroup
          .querySelector("foreignObject")
          .setAttribute(
            "y",
            this.attr("labelsOffset")(tick, i)[1] +
              labelsPadding * (compositePosition === "below" ? 1 : -1),
          );
        xAxisLabel(labelGroup, tick.visibleLabel, compositePosition);
      },
    );

    this.objects.forEach((obj) => obj.draw());

    return this;
  };
}

xAxis.prototype = Object.create(chrtAxis.prototype);
xAxis.prototype.constructor = xAxis;
xAxis.parent = chrtAxis.prototype;

export default function (ticksNumber, customName) {
  return new xAxis(ticksNumber, customName);
}
