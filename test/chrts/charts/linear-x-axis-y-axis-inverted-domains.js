import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .x({domain:[6,0]})
    .y({domain:[10,0]})
    .data([2,0,3,10,4,2,1])
    .add(yAxis())
    .add(xAxis())
  return chart
}
