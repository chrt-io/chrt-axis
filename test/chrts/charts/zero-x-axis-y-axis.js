import * as chrt from 'chrt';
import {xAxis,yAxis} from '~/chrtAxis'

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .data([0,1,3,10,4,2,0,1,3,10])
    .add(yAxis().zero(5))
    .add(xAxis().zero(5))

  return chart
}
