# chrt-axis
Component for the creation of Axes in chrt. The axes define the area where the values are displayed and they help the reader to make sense of the position of the elements in the chart. Axes are based on scales (quantitative and categorical).

The component provides two types of axes: the X Axis (`xAxis`) which runs horizontally and the Y Axis (`yAxis`), which runs vertically.

A chrtAxis is formed by a set of visual elements:
- One axis line
- Ticks
- Labels
- Axis range

One chart can have multiple Axes, and they can be oriented (left/right and top/bottom).

## Installing
You can install chrt as a standalone module `npm install chrt-axis` or as part of the `chrt` package.
Otherwise you can download the code or use global content delivery network like UNPKG.

## Usage

### Script Tag
```
<script src="https://unpkg.com/chrt@latest/dist/chrt.min.js"></script>
<script>
    var chart = new chrt.Chrt();
</script>
```

### ES6 / Bundlers (Webpack, Rollup, etc.)
```
import Chrt from "chrt-core";
import { xAxis, yAxis } from "chrt-axis";

Chrt()
    .add(
        xAxis()
    )
    .add(
        yAxis()
    )
```

## API Reference
- xAxis
- yAxis
- chrtAxisRange

### xAxis
X Axis (`xAxis`) runs horizontally and it can be oriented at the bottom or top of the chart.

#### `xAxis`
```
Chrt()
    .add(
        xAxis()
    )
```

#### `xAxis.width(widthValue)`
If width is specified, it sets the thickness of the Axis line accordingly. If `widthValue` is `null`, this function will return the thickness of the line of the Axis. If `widthValue` is a `Number` or a `function`, `width` will set the thickness of the line of the Axis. For example:
```
Chrt()
    .add(
        xAxis()
            .width(2)
    )
```

#### `xAxis.color()`

#### `xAxis.setTickLength()`

#### `xAxis.setTickPosition()`

#### `xAxis.showAxis()`

#### `xAxis.hideAxis()`

#### `xAxis.ticks()`

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

## How to build

###  Install the dependencies
```
npm install
```

###  Build the package
```
npm build
```
### Developing
If you want to develop and see the changes reloaded live into another app you can use the watch script
```
npm run watch
```

## Use it as a module

### Method 1 - tgz package

#### Use the tgz provided in the repository
You can use the `chrt-axis-VERSION.tgz` package. The following commands will expand the chrt module in the `node_modules` folder of your project. Ready to be used with the usual `import` command:
```
cp chrt-axis-VERSION.tgz SOMEWHERE
cd myproject
npm install SOMEWHERE/chrt-axis-VERSION.tgz
```

#### Create a tgz npm package
You can create a package for testing with
```
npm pack
```
This command will create a file called `chrt-axis-VERSION.tgz` in the root folder of chrt.

### Method 2 - symlinked package

####  Create a global node module
```
npm link
```
This creates `chrt` module inside your global `node_modules` so that you can import it in your code

####  Use the module in a different app
```
npm link chrt
```
This will create a sym link to the module created in your global.

## Use it in your code
After having installed or sym-linked the node you can use it as usual
```
import {xAxis, yAxis, chrtAxisRange} from 'chrt-axis';
```



## Testing

### Unit test with Jest
Run `npm run test` to run all the tests on the code with Jest.
```
npm run test
```

To run only one test:
```
npx jest test/scales/scaleLinear.test.js
```
