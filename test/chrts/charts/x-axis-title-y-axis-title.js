import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'
import chrtAxisTitle from '../../../src/chrtAxisTitle'

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .data([2,0,3,10,4,2,1])
    .add(
      yAxis()
        .add(
          chrtAxisTitle('Y axis title')
          .align('right')
          .valign('top')
          .offset({x: 10, y: 15})
          .color('#f00')
        )
    )
    .add(
      xAxis()
        .add(
          chrtAxisTitle('X axis title')
            .align('right')
            .valign('top')
            .offset({x: -5, y: -5})
            .color('#f00')
        )
    )
  return chart
}
