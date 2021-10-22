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

`chrt-axis` can be used as part of the whole `chrt` package:
```bash
npm install chrt
```

`chrt-axis` is distributed as an ES module; see [Sindre Sorhus’s guide](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for help.

## Usage

### ES6 / Bundlers (Webpack, Rollup, etc.)
```js
import Chrt from 'chrt-core';
import { xAxis, yAxis } from 'chrt-axis';

Chrt()
    .add(
        xAxis()
    )
    .add(
        yAxis()
    )
```

### Script Tag
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

## API Reference
* [xAxis](#xaxis)
* [yAxis](#yaxis)
* [chrtAxisRange](#chrtaxisrange)
* [chrtAxisTitle](#chrtaxistitle)

### xAxis
X Axis (`xAxis`) runs horizontally and it can be oriented at the bottom or top of the chart.

#### `xAxis([tickCount[, scaleName]])`
When `xAxis` is added without arguments, `chrt` builds a default axis with a computed number of ticks based on the x scale. For example:
```
Chrt()
    .add(
        xAxis()
    )
```

When `xAxis` is added with `count`, `chrt` builds a default axis with a suggested number of ticks based on the x scale. For example:
```
Chrt()
    .add(
        xAxis(5)
    )
```

When `xAxis` is added with a `scaleName`, `chrt` builds an axis by computing the ticks based on the custom scale called `scaleName`. For example:
```
Chrt()
    .add(
        xAxis(10, 'customScaleName')
    )
```

#### `xAxis.width([widthValue])`
If `widthValue` is specified, it sets the thickness of the Axis line accordingly. If `widthValue` is `null`, this function will return the thickness of the line of the Axis. If `widthValue` is a `Number` or a `function`, `width` will set the thickness of the line of the Axis. For example:
```
Chrt()
    .add(
        xAxis()
            .width(2)
    )
```

#### `xAxis.color([colorValue])`
If `colorValue` is specified, it sets the color of the Axis line accordingly. If `colorValue` is `null`, this function will return the color of the line of the Axis. If `colorValue` is a `String` or a `function`, `color` will set the color of the line of the Axis. For example:
```
Chrt()
    .add(
        xAxis()
            .color('#f00')
    )
```

#### `xAxis.setTickLength([tickLength])`
If `tickLength` is specified, it sets the length of the ticks of the Axis accordingly. If `tickLength` is `null`, this function will return the length of the ticks of the Axis. If `tickLength` is a `Number` or a `function`, `setTickLength` will set the length of the ticks of the Axis. For example:
```
Chrt()
    .add(
        xAxis()
            .setTickLength(5)
    )
```

#### `xAxis.setTickPosition([tickPosition])`
If `tickPosition` is specified, it sets the position of the ticks of the Axis accordingly. If `tickPosition` is `null`, this function will return the current position of the ticks of the Axis. If `tickPosition` is a `String` or a `function`, `setTickPosition` will set the length of the ticks of the Axis. The accepted values of `tickPosition` are `inside` and `outside` (default position). For example:
```
Chrt()
    .add(
        xAxis()
            .setTickPosition('inside')
            .setTickPosition('outside')
    )
```

#### `xAxis.showAxis([show])`
If `show` is specified, it sets visibility the Axis accordingly. If `show` is `null`, this function will return the current visibility of the Axis. If `show` is a `Boolean` or a `function`, `showAxis` will define whether the Axis is visible or not. For example:
```
Chrt()
    .add(
        xAxis()
            .showAxis(false)
    )
```

#### `xAxis.hideAxis()`
Shortcut for `showAxis(false)`, when called on the Axis it will hide the axis. For example:
```
Chrt()
    .add(
        xAxis()
            .hideAxis()
    )
```

#### `xAxis.ticks([count])`
If `count` is specified, it suggests the count for the number of ticks the Axis accordingly. If `count` is `null`, this function will return the list of the ticks the Axis. If `count` is a `Number` or a `function`, `ticks` will define a suggested count for the number of ticks in the Axis that will be calculated by the axis scale.
```
Chrt()
    .add(
        xAxis()
            .ticks(10)
    )
```

#### `xAxis.filter()`

#### `xAxis.showTicks()`

#### `xAxis.hideTicks()`

#### `xAxis.firstTick()`
#### `xAxis.lastTick()`
#### `xAxis.firstAndLastTicks()`
#### `xAxis.orient()`
#### `xAxis.format()`
#### `xAxis.minor()`
#### `xAxis.zero()`
#### `xAxis.hideZero()`
#### `xAxis.label()`
#### `xAxis.interval()`
#### `xAxis.title()`

### yAxis
Y Axis (`yAxis`) runs vertically and it can be oriented at the left or right of the chart.

### chrtAxisRange

### chrtAxisTitle
