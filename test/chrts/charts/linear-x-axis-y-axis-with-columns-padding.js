import * as chrt from 'chrt';
import {xAxis,yAxis} from '~/chrtAxis'
// import {chrtColumns} from 'chrt-bars'

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .data([2,0,3,10,4,2,1])
    .add(chrt.chrtColumns())
    .add(chrt.chrtLine())
    .add(yAxis())
    .add(xAxis())

  return chart
}
