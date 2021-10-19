import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .data([0,1,3,10,4,2,0,1,3,10])
    .add(
      xAxis()
        .stroke('#f00')
        .strokeWidth(2)
        .ticksColor('#0f0')
        .ticksWidth(2)
        .labelColor('#00f')
        .tickLength(10)
        .tickPosition('inside')
        .labelPosition('inside')
    )
    .add(
      xAxis()
        .orient('top')
        .stroke('#f00')
        .strokeWidth(2)
        .ticksColor('#0f0')
        .ticksWidth(2)
        .labelColor('#00f')
        .tickLength(10)
        .tickPosition('inside')
        .labelPosition('inside')
    )
    .add(
      yAxis()
        .stroke('#f00')
        .strokeWidth(2)
        .ticksColor('#0f0')
        .ticksWidth(2)
        .labelColor('#00f')
        .tickLength(10)
        .tickPosition('inside')
        .labelPosition('inside')
        .hideAxis()
    )
    .add(
      yAxis()
        .orient('right')
        .stroke('#f00')
        .strokeWidth(2)
        .ticksColor('#0f0')
        .ticksWidth(2)
        .labelColor('#00f')
        .tickLength(10)
        .tickPosition('inside')
        .labelPosition('inside')
        .showAxis()
    )

  return chart
}
