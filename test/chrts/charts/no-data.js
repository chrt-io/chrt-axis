import * as chrt from 'chrt';
import {xAxis,yAxis} from '~/chrtAxis'

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .add(yAxis())
    .add(xAxis())

  return chart
}
