import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'

export default async function(container) {
  const chart = chrt.Chrt()
    .margins({
      left: 40,
      right: 40,
      top: 40,
      bottom: 40,
    })
    .node(container)
    .data([2,0,3,10,4,2,1])
    .add(
      yAxis()
        .labelsPadding(10)
    )
    .add(
      yAxis()
        .orient('right')
        .labelsPadding(10)
    )
    .add(
      xAxis()
        .labelsPadding(10)
    )
    .add(
      xAxis()
        .orient('top')
        // .labelsPadding(10)
        .labelsOffset((d,i) => [i,i])
    )
  return chart
}
