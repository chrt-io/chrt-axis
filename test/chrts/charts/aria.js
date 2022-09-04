import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'
import chrtAxisTitle from '../../../src/chrtAxisTitle'

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .data([2,0,3,10,4,2,1])
    .add(
      yAxis()
        .title('title y')
        .aria('aria label Y')
        .add(
          chrtAxisTitle('Y axis title')
          .align('right')
          .valign('top')
          .offset({x: 30, y: 15})
          .color('#f00')
          .aria('custom Y Axis Title')
        )
    )
    .add(
      xAxis()
        .title('title x')
        //.aria('aria label X')
        .add(
          chrtAxisTitle('X axis title')
            .align('right')
            .valign('top')
            .offset({x: -5, y: -15})
            .color('#f00')
        )
    )
  // console.log(chart)
  return chart
}
