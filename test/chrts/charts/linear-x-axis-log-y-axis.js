import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .size(600, 200)
    .data([1,3,10,4,0,2,1,3,100000])
    .y({scale:'log'})
    .add(xAxis())
    .add(yAxis())
  return chart
}
