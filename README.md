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
import Chrt from 'chrt-core';
import { xAxis, yAxis } from 'chrt-axis';

Chrt()
    .data([1,2,3,4,5,6])
    .add(
        xAxis()
    )
    .add(
        yAxis()
    )
```

### Vanilla HTML
In vanilla HTML, `chrt-axis` can be imported as an ES module, (i.e. from Skypack):

```html
<div id="chart"></div>

<script type="module">

import Chrt from 'https://cdn.skypack.dev/chrt-core';
import {xAxis, yAxis} from 'https://cdn.skypack.dev/chrt-axis';

const chart = Chrt()
  .data([1,2,3,4,5,6])
  .add(xAxis())
  .add(yAxis())

document
    .querySelector('#chart')
    .appendChild(chart.node())

</script>
```

### Script Tag
For legacy environments, you can load the `chrt` UMD bundle from an npm-based CDN such as [jsdelivr](https://www.jsdelivr.com/package/npm/chrt):
```html
<div id="chart"></div>
<script src="https://cdn.jsdelivr.net/npm/chrt@latest/dist/chrt.min.js"></script>
<script>

    chrt.Chrt()
        .node(document.getElementById('chart'))
        .data([0,1,2,3,4,5])
        .add(
            chrt.xAxis()
        )
        .add(
            chrt.yAxis()
        )
</script>
```

## API Reference
* [xAxis](#xaxis)
* [yAxis](#yaxis)
* [chrtAxisRange](#chrtaxisrange)
* [chrtAxisTitle](#chrtaxistitle)

### xAxis
X Axis (`xAxis`) runs horizontally and it can be oriented at the bottom or top of the chart.

#### `xAxis([tickCount[, scaleName]])`
When `xAxis` is added without arguments, `chrt` builds a default axis with a computed number of ticks based on the x scale. Example usage:
```js
Chrt()
    .add(
        xAxis()
    )
```

When `xAxis` is added with `count`, `chrt` builds a default axis with a suggested number of ticks based on the x scale. Example usage:
```js
Chrt()
    .add(
        xAxis(5)
    )
```

When `xAxis` is added with a `scaleName`, `chrt` builds an axis by computing the ticks based on the custom scale called `scaleName`. Example usage:
```js
Chrt()
    .add(
        xAxis(10, 'customScaleName')
    )
```

#### `xAxis.width([widthValue])`
If `widthValue` is specified, it sets the thickness of the Axis line accordingly. If `widthValue` is `null`, this function will return the thickness of the line of the Axis. If `widthValue` is a `Number` or a `function`, `width` will set the thickness of the line of the Axis. Example usage:
```js
Chrt()
    .add(
        xAxis()
            .width(2)
    )
```

#### `xAxis.color([colorValue])`
If `colorValue` is specified, it sets the color of the Axis line accordingly. If `colorValue` is `null`, this function will return the color of the line of the Axis. If `colorValue` is a `String` or a `function`, `color` will set the color of the line of the Axis. Example usage:
```js
Chrt()
    .add(
        xAxis()
            .color('#f00')
    )
```

#### `xAxis.showAxis([show])`
If `show` is specified, it sets visibility the Axis accordingly. If `show` is `null`, this function will return the current visibility of the Axis. If `show` is a `Boolean` or a `function`, `showAxis` will define whether the Axis is visible or not. Example usage:
```js
Chrt()
    .add(
        xAxis()
            .showAxis(false)
    )
```

#### `xAxis.hideAxis()`
Shortcut for `showAxis(false)`, when called on the Axis it will hide the axis. Example usage:
```js
Chrt()
    .add(
        xAxis()
            .hideAxis()
    )
```

#### `xAxis.orient()`
Sure, here are the API specs for `xAxis.orient()`:

### `xAxis.orient([orientation])`
Sets the orientation of the X axis. If no argument is passed, the current orientation is returned.

```js
// Set the orientation of the X axis to "top"
xAxis.orient("top");

// Get the current orientation of the X axis
const currentOrientation = xAxis.orient();
console.log(currentOrientation); // Output: "top"
```

Note: The `yAxis` object also has an `orient()` method with similar usage.
#### `xAxis.format()`
 Sets the formatting function for the labels in the x-axis. The function takes one argument, the value of the tick, and returns the formatted string for that value.

 ```js
 xAxis.format(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format);
 ```
#### `xAxis.minor()`
#### `xAxis.zero()`
Sets the vertical position of the x-axis line relative to the origin of the chart. By default, the x-axis line is positioned at the value 0 on the y-axis.
`value` is the value representing the y-coordinate of the x-axis line. If not provided, the line will be positioned at the y-coordinate of the minimum value of the y-axis scale.

**Usage Example:**
Suppose you have a chart that displays the number of sales of a product over time. The y-axis represents the number of sales, and the x-axis represents the time. The x-axis line is currently positioned at 0 on the y-axis, which is the default value. You want to position the x-axis line at the value 100 on the y-axis instead. You can do this using the `xAxis.zero()` function as follows:

```js
// set the vertical position of the x-axis line to 100 on the y-axis
xAxis.zero(100);
```

#### `xAxis.hideZero()`
#### `xAxis.label()`
#### `xAxis.interval()`
#### `xAxis.title()`

### Ticks
#### `xAxis.ticks([count])`
If `count` is specified, it suggests the count for the number of ticks the Axis accordingly. If `count` is `null`, this function will return the list of the ticks the Axis. If `count` is a `Number` or a `function`, `ticks` will define a suggested count for the number of ticks in the Axis that will be calculated by the axis scale.
```
Chrt()
    .add(
        xAxis()
            .ticks(10)
    )
```

Sure! Here are the API specs for `ticksColor` and `ticksWidth`:

#### `ticksColor([color])`

Sets the color of the ticks to the specified `color` value, or returns the current tick color if `color` is not provided.

```js
// Set the color of ticks using a function
xAxis.ticksColor((d, i) => {
  if (i % 2 === 0) {
    return 'red';
  } else {
    return 'blue';
  }
});

// Get the current color of ticks
const currentColor = xAxis.ticksColor();
```

#### `ticksWidth([width])`

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
Chrt()
    .add(
        xAxis()
            .setTickLength(5)
    )
```

#### `xAxis.setTickPosition([tickPosition])`
If `tickPosition` is specified, it sets the position of the ticks of the Axis accordingly. If `tickPosition` is `null`, this function will return the current position of the ticks of the Axis. If `tickPosition` is a `String` or a `function`, `setTickPosition` will set the length of the ticks of the Axis. The accepted values of `tickPosition` are `inside` and `outside` (default position). Example usage:

```js
Chrt()
    .add(
        xAxis()
            .setTickPosition('inside')
            .setTickPosition('outside')
    )
```

#### `xAxis.filter([filter])`
#### `xAxis.showTicks([filter])`
This function shows or hides the ticks on the axis based on the parameter passed. The parameter can be a function, a boolean value, a number, or an array of values. When a function is passed, it is used to filter the ticks based on their data and index. When a boolean value is passed, all ticks are either shown or hidden. When a number is passed, only the tick with the corresponding value is shown. When an array of values is passed, only the ticks with values in the array are shown.

Example usage:  

Show every other tick:  
```js
axis.showTicks((d, i) => i % 2 === 0);
```

Show all ticks:
```
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
`hideTicks(filter)`: This function hides the ticks on the axis based on the parameter passed. It is essentially the opposite of the `showTicks()` function. The parameter can be a function, a boolean value, a number, or an array of values. When a function is passed, it is used to filter the ticks based on their data and index. When a boolean value is passed, all ticks are either shown or hidden. When a number is passed, only the tick with the corresponding value is shown. When an array of values is passed, only the ticks with values in the array are shown.

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

#### `xAxis.firstTick([show])`
This function shows or hides the first tick on the axis. If `show` is `true`, only the first tick is shown and all other ticks are hidden. If `show` is `false`, only the first tick is hidden and all other ticks are shown.

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

### Labels
#### `xAxis.labels([count])`
#### `xAxis.showLabels`
#### `xAxis.hideLabels`
#### `xAxis.firstLabel`
#### `xAxis.lastLabel`
#### `xAxis.firstAndLastLabels`
#### `xAxis.labelsColor`
#### `xAxis.labelOffset`

### yAxis
Y Axis (`yAxis`) runs vertically and it can be oriented at the left or right of the chart.

### chrtAxisRange

### chrtAxisTitle
