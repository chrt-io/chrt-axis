# chrt-axis

Component for the creation of Axes in chrt. The axes define the area where the values are displayed and they help the reader to make sense of the position of the elements in the chart. Axes are based on scales (quantitative and categorical).

The component provides two types of axes: the X Axis (`xAxis`) which runs horizontally and the Y Axis (`yAxis`), which runs vertically.

A chrtAxis is formed by a set of visual elements:

- One axis line
- Ticks
- Labels
- Axis range
- Axis title

One chart can have multiple Axes, and they can be oriented (left/right and top/bottom).

## Installing

For use with Webpack, Rollup, or other Node-based bundlers, `chrt-axis` can be installed as a standalone module via a package manager such as Yarn or npm.

```bash
npm install chrt-axis chrt-core
```

`chrt-axis` can be used as part of the `chrt` package:

```bash
npm install chrt
```

`chrt-axis` is distributed as an ES module; see [Sindre Sorhus’s guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for more information.

## Usage

### ES6 / Bundlers (Webpack, Rollup, etc.)

```js
import Chrt from "chrt-core";
import { xAxis, yAxis } from "chrt-axis";

Chrt().data([1, 2, 3, 4, 5, 6]).add(xAxis()).add(yAxis());
```

### Vanilla HTML

In vanilla HTML, `chrt-axis` can be imported as an ES module, (i.e. from Skypack):

```html
<div id="chart"></div>

<script type="module">
  import Chrt from "https://cdn.skypack.dev/chrt-core";
  import { xAxis, yAxis } from "https://cdn.skypack.dev/chrt-axis";

  const chart = Chrt().data([1, 2, 3, 4, 5, 6]).add(xAxis()).add(yAxis());

  document.querySelector("#chart").appendChild(chart.node());
</script>
```

### Script Tag

For legacy environments, you can load the `chrt` UMD bundle from an npm-based CDN such as [jsdelivr](https://www.jsdelivr.com/package/npm/chrt):

```html
<div id="chart"></div>
<script src="https://cdn.jsdelivr.net/npm/chrt@latest/dist/chrt.min.js"></script>
<script>
  chrt
    .Chrt()
    .node(document.getElementById("chart"))
    .data([0, 1, 2, 3, 4, 5])
    .add(chrt.xAxis())
    .add(chrt.yAxis());
</script>
```

## API Reference

- [xAxis](#xaxis)
- [yAxis](#yaxis)
- [chrtAxisRange](#chrtaxisrange)
- [chrtAxisTitle](#chrtaxistitle)

### xAxis

X Axis (`xAxis`) runs horizontally and it can be oriented at the bottom or top of the chart.

#### `xAxis([tickCount[, scaleName]])`

When `xAxis` is added without arguments, `chrt` builds a default axis with a computed number of ticks based on the x scale. Example usage:

```js
Chrt().add(xAxis());
```

When `xAxis` is added with `count`, `chrt` builds a default axis with a suggested number of ticks based on the x scale. Example usage:

```js
Chrt().add(xAxis(5));
```

When `xAxis` is added with a `scaleName`, `chrt` builds an axis by computing the ticks based on the custom scale called `scaleName`. Example usage:

```js
Chrt().add(xAxis(10, "customScaleName"));
```

#### `xAxis.width([widthValue])`

If `widthValue` is specified, it sets the thickness of the Axis line accordingly. If `widthValue` is `null`, this function will return the thickness of the line of the Axis. If `widthValue` is a `Number` or a `function`, `width` will set the thickness of the line of the Axis. Example usage:

```js
Chrt().add(xAxis().width(2));
```

#### `xAxis.color([colorValue])`

If `colorValue` is specified, it sets the color of the Axis line accordingly. If `colorValue` is `null`, this function will return the color of the line of the Axis. If `colorValue` is a `String` or a `function`, `color` will set the color of the line of the Axis. Example usage:

```js
Chrt().add(xAxis().color("#f00"));
```

#### `xAxis.strokeWidth()` / `xAxis.stroke()`

Alternative methods for styling the axis line. These methods maintain compatibility with SVG standard attribute names.

- `strokeWidth()`: Alias for `width()`, sets the thickness of the axis line
- `stroke()`: Alias for `color()`, sets the color of the axis line

```js
// These pairs of methods are equivalent
xAxis().strokeWidth(2); // same as xAxis().width(2)
xAxis().stroke("#f00"); // same as xAxis().color("#f00")
```

#### `xAxis.showAxis([show])`

If `show` is specified, it sets visibility the Axis accordingly. If `show` is `null`, this function will return the current visibility of the Axis. If `show` is a `Boolean` or a `function`, `showAxis` will define whether the Axis is visible or not. Example usage:

```js
Chrt().add(xAxis().showAxis(false));
```

#### `xAxis.hideAxis()`

Shortcut for `showAxis(false)`, when called on the Axis it will hide the axis. Example usage:

```js
Chrt().add(xAxis().hideAxis());
```

#### `xAxis.orient([orientation])`

Sets the orientation of the X axis. If no argument is passed, the current orientation is returned.

```js
// Set the orientation of the X axis to "top"
xAxis().orient("top");

// Get the current orientation of the X axis
const currentOrientation = xAxis.orient();
console.log(currentOrientation); // Output: "top"
```

Note: The `yAxis` object also has an `orient()` method with similar usage.

#### `xAxis.format()`

Sets the formatting function for the labels in the x-axis. The function takes one argument, the value of the tick, and returns the formatted string for that value.

```js
xAxis.format(
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format,
);
```

#### `.minor([show])`

Enables or disables minor ticks.

```javascript
xAxis().minor(true);
```

#### `.minorTicks([count])`

Defines the number of minor ticks between each major tick.

```javascript
xAxis().minorTicks(3);
```

#### `.minorLabels([show])`

Enables or disables labels for minor ticks.

```javascript
xAxis().minorLabels(false);
```

#### `xAxis.zero()`

Sets the vertical position of the x-axis line relative to the origin of the chart. By default, the x-axis line is positioned at the value 0 on the y-axis.
`value` is the value representing the y-coordinate of the x-axis line. If not provided, the line will be positioned at the y-coordinate of the minimum value of the y-axis scale.

**Usage Example:**
Suppose you have a chart that displays the number of sales of a product over time. The y-axis represents the number of sales, and the x-axis represents the time. The x-axis line is currently positioned at 0 on the y-axis, which is the default value. You want to position the x-axis line at the value 100 on the y-axis instead. You can do this using the `xAxis.zero()` function as follows:

```js
// set the vertical position of the x-axis line to 100 on the y-axis
xAxis.zero(100);
```

#### `.label([text])`

Sets or gets the label for the axis.

```javascript
xAxis().label("X Axis Label");
```

#### `xAxis.interval([value])`

Sets the interval between ticks for time-based axes. This is particularly useful when working with time series data.

Accepted values:

- `"seconds"`: Show ticks at second intervals
- `"minutes"`: Show ticks at minute intervals
- `"hours"`: Show ticks at hour intervals
- `"day"`: Show ticks at day intervals
- `"bidiurnal"`: Show ticks every 2 days
- `"week"`: Show ticks at week intervals
- `"fortnight"`: Show ticks every 2 weeks
- `"month"`: Show ticks at month intervals
- `"year"`: Show ticks at year intervals

```js
// Show ticks at monthly intervals
xAxis
  .interval("month")
  .format((d) =>
    new Intl.DateTimeFormat("en-US", { month: "short" }).format(d),
  );

// Show ticks at hourly intervals
xAxis
  .interval("hours")
  .format((d) =>
    new Intl.DateTimeFormat("en-US", { hour: "numeric" }).format(d),
  );

// Show ticks at daily intervals
xAxis
  .interval("day")
  .format((d) =>
    new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(d),
  );
```

#### Time Formatting Examples

When working with time-based axes, you can combine `interval()` and `format()` to create customized date/time displays. Here are common formatting patterns:

```js
// Format seconds
xAxis.interval("seconds").format((d) =>
  new Intl.DateTimeFormat("en-US", {
    minute: "numeric",
    second: "numeric",
  }).format(d),
);

// Format minutes
xAxis.interval("minutes").format((d) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(d),
);

// Format hours
xAxis.interval("hours").format((d) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
  }).format(d),
);

// Format days
xAxis.interval("day").format((d) =>
  new Intl.DateTimeFormat("en-US", {
    day: "numeric",
  }).format(d),
);

// Format weeks
xAxis.interval("week").format((d) =>
  new Intl.DateTimeFormat("en-US", {
    week: "numeric",
  }).format(d),
);

// Format months
xAxis.interval("month").format((d) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(d),
);

// Format years
xAxis.interval("year").format((d) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  }).format(d),
);

// Custom complex format
xAxis.interval("day").format((d) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d),
);
```

#### `xAxis.title([titleText])`

Sets or gets the title for the axis.

```javascript
xAxis().title("Main X Axis");
```

### Ticks

#### `xAxis.ticks([count])`

If `count` is specified, it suggests the count for the number of ticks the Axis accordingly. If `count` is `null`, this function will return the list of the ticks the Axis. If `count` is a `Number` or a `function`, `ticks` will define a suggested count for the number of ticks in the Axis that will be calculated by the axis scale.

```js
Chrt().add(xAxis().ticks(10));
```

#### `xAxis.ticksColor([color])`

Sets the color of the ticks to the specified `color` value, or returns the current tick color if `color` is not provided.

```js
// Set the color of ticks using a function
xAxis.ticksColor((d, i) => {
  if (i % 2 === 0) {
    return "red";
  } else {
    return "blue";
  }
});

// Get the current color of ticks
const currentColor = xAxis.ticksColor();
```

#### `xAxis.ticksWidth([width])`

Sets the thickness of the ticks to the specified `width` value, or returns the current tick width if `width` is not provided.

```js
// Set the width of ticks using a function
xAxis.ticksWidth((d, i) => {
  if (i % 2 === 0) {
    return 2;
  } else {
    return 1;
  }
});

// Get the current width of ticks
const currentWidth = xAxis.ticksWidth();
```

#### `xAxis.setTickLength([tickLength])`

If `tickLength` is specified, it sets the length of the ticks of the Axis accordingly. If `tickLength` is `null`, this function will return the length of the ticks of the Axis. If `tickLength` is a `Number` or a `function`, `setTickLength` will set the length of the ticks of the Axis. Example usage:

```js
Chrt().add(xAxis().setTickLength(5));
```

#### `xAxis.setTickPosition([tickPosition])`

If `tickPosition` is specified, it sets the position of the ticks of the Axis accordingly. If `tickPosition` is `null`, this function will return the current position of the ticks of the Axis. If `tickPosition` is a `String` or a `function`, `setTickPosition` will set the length of the ticks of the Axis. The accepted values of `tickPosition` are `inside` and `outside` (default position). Example usage:

```js
Chrt().add(xAxis().setTickPosition("inside").setTickPosition("outside"));
```

#### `xAxis.showTicks([filter])`

Shows or hides the ticks on the axis based on the parameter passed. The parameter can be a function, a boolean value, a number, or an array of values. When a function is passed, it is used to filter the ticks based on their data and index. When a boolean value is passed, all ticks are either shown or hidden. When a number is passed, only the tick with the corresponding value is shown. When an array of values is passed, only the ticks with values in the array are shown.

Example usage:

Show every other tick:

```js
axis.showTicks((d, i) => i % 2 === 0);
```

Show all ticks:

```js
axis.showTicks(true);
```

Hide all ticks:

```js
axis.showTicks(false);
```

Show only the tick with value 10:

```js
xAxis().showTicks(10);
```

Show only ticks with values 10, 20, and 30:

```js
xAxis().showTicks([10, 20, 30]);
```

#### `xAxis.hideTicks()`

Hides the ticks on the axis based on the parameter passed. It is essentially the opposite of the `showTicks()` function. The parameter can be a function, a boolean value, a number, or an array of values. When a function is passed, it is used to filter the ticks based on their data and index. When a boolean value is passed, all ticks are either shown or hidden. When a number is passed, only the tick with the corresponding value is shown. When an array of values is passed, only the ticks with values in the array are shown.

Example usage:

Hide every other tick:

```js
xAxis.hideTicks((d, i) => i % 2 === 0);
```

Hide all ticks:

```js
xAxis.hideTicks(true);
```

Show all ticks:

```js
xAxis.hideTicks(false);
```

Hide only the tick with value 10:

```js
xAxis.hideTicks(10);
```

Hide ticks with values 10, 20, and 30:

```js
xAxis.hideTicks([10, 20, 30]);
```

#### `xAxis.filter([filter])` / `xAxis.filterTicks([filter])`

Alternative methods to `showTicks()`, these methods provide a more explicit way to filter ticks. Both `filter()` and `filterTicks()` are aliases and perform the same function as `showTicks()`. The parameter can be a function, a boolean value, a number, or an array of values.

Example usage:

Filter ticks using a function:

```js
// Show only even-indexed ticks
xAxis.filter((d, i) => i % 2 === 0);
// or
xAxis.filterTicks((d, i) => i % 2 === 0);
```

Filter using a boolean:

```js
// Show all ticks
xAxis.filter(true);
// Hide all ticks
xAxis.filter(false);
```

Filter by specific value:

```js
// Show only the tick with value 10
xAxis.filter(10);
```

Filter using an array of values:

```js
// Show only ticks with values 10, 20, and 30
xAxis.filter([10, 20, 30]);
```

Note: `filter()`, `filterTicks()`, and `showTicks()` all perform the same operation. `filter()` and `filterTicks()` are provided as more semantically explicit alternatives to `showTicks()`.

#### `xAxis.firstTick([show])`

Shows or hides the first tick on the axis. If `show` is `true`, only the first tick is shown and all other ticks are hidden. If `show` is `false`, only the first tick is hidden and all other ticks are shown.

Example usage:

Show the first tick:

```js
xAxis.firstTick();
```

Hide the first tick:

```js
xAxis.firstTick(false);
```

Note that if you want to customize the appearance of the first tick (e.g., make it a different color or size), you can use the `ticksColor()`, `ticksLength()` and `ticksWidth()` functions to apply a different style to the first tick.

#### `xAxis.lastTick([show])`

Shows or hides the last tick on the axis. If `show` is `true`, only the last tick is shown and all other ticks are hidden. If `show` is `false`, only the last tick is hidden and all other ticks are shown.

Example usage:

Show the last tick:

```js
xAxis.lastTick();
```

Hide the last tick:

```js
xAxis.lastTick(false);
```

#### `xAxis.firstAndLastTicks()`

Shows or hides both the first and the last ticks on the axis. If `show` is `true`, only the first and last ticks are shown and all other ticks are hidden. If `show` is `false`, only the first and last ticks are hidden and all other ticks are shown.

Example usage:

Show the first and last ticks:

```js
xAxis.firstAndLastTicks();
```

Hide the first and last ticks:

```js
xAxis.firstAndLastTicks(false);
```

#### `.minor([show])`

Enables or disables minor ticks.

```javascript
xAxis().minor(true);
```

#### `xAxis.minorTicks([count])`

Defines the number of minor ticks between each major tick.

```javascript
yAxis.minorTicks(3);
```

### Labels

#### `xAxis.labels([labels])`

Sets or gets the labels for the axis.

- If `labels` is not provided (`null` or `undefined`): Returns the current labels array
- If `labels` is provided: Sets fixed labels for the axis and returns the axis instance

```js
// Get current labels
const currentLabels = xAxis.labels();

// Set fixed labels
xAxis.labels(["A", "B", "C", "D"]);
```

#### `xAxis.labelsOffset([offset])`

Sets the offset distance of labels from their default position. Can accept a single number or an array of [x, y] coordinates.

```js
// Set equal offset in both directions
xAxis.labelsOffset(10);

// Set different x and y offsets
xAxis.labelsOffset([5, 10]);

// Set offset using a function
xAxis.labelsOffset((d, i) => [i * 2, i * 2]);
```

#### `xAxis.labelsPadding([padding])`

Sets the padding space between labels and ticks. This is different from offset as it affects the spacing between the tick and its label.

```js
// Set padding to 10 pixels
xAxis.labelsPadding(10);
```

#### `xAxis.labelsPosition([position])`

Sets the position of all labels relative to the axis. Alternative to `setLabelPosition()`.

```js
// Position labels inside
xAxis.labelsPosition("inside");

// Position labels outside (default)
xAxis.labelsPosition("outside");
```

#### `xAxis.labelsColor([color])`

Sets the color of the axis labels. Can be a static color or a function that returns colors.

```js
// Set all labels to red
xAxis.labelsColor("#ff0000");

// Set alternating colors
xAxis.labelsColor((d, i) => (i % 2 ? "#ff0000" : "#0000ff"));

// Set color based on value
xAxis.labelsColor((d) => (d > 50 ? "#ff0000" : "#0000ff"));
```

#### `xAxis.labelClass([className])` / `xAxis.labelsClass([className])`

Sets or gets the CSS class(es) for the axis labels. Can be used to style labels using CSS.

```js
// Set a single class
xAxis.labelClass("custom-label");

// Set class using a function
xAxis.labelClass((d, i) => (i % 2 ? "odd-label" : "even-label"));
```

#### `xAxis.showLabels`

Controls the visibility of labels.

```javascript
yAxis.showLabels(false);
```

#### `xAxis.hideLabels`

Hides the labels on the axis.

```javascript
xAxis().hideLabels();
```

#### `xAxis.minorLabels([show])`

Enables or disables labels for minor ticks.

```javascript
xAxis().minorLabels(false);
```

#### `xAxis.firstLabel([show])`

Shows or hides the first label on the axis.

```javascript
xAxis().firstLabel(false);
```

#### `xAxis.lastLabel([show])`

Shows or hides the last label on the axis.

```javascript
yAxis.lastLabel(true);
```

#### `xAxis.firstAndLastLabels`

Shows or hides the first and last labels on the axis.

```javascript
xAxis().firstAndLastLabels(false);
```

#### `xAxis.labelOffset([offset])`

Sets the offset of the axis label from the axis line.

```javascript
yAxis.labelOffset(15);
```

#### `.labelsColor([color])`

Sets or retrieves the color of axis labels.

```javascript
xAxis().labelsColor("#444");
```

#### `.labelsClass([className])`

Assigns a CSS class to the labels.

```javascript
yAxis.labelsClass("axis-label");
```

#### `.labelsPadding([padding])`

Sets padding between the labels and the ticks.

```javascript
xAxis().labelsPadding(5);
```

### yAxis

Y Axis (`yAxis`) runs vertically and it can be oriented at the left or right of the chart.

### chrtAxisRange

### chrtAxisTitle
