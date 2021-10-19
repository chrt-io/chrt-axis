import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .data([0,1,3,10,4,2,0,1,3,10])
    .add(yAxis().minor())
    .add(xAxis().minor())

  return chart
}
