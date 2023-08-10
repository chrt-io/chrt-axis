import * as chrt from 'chrt';
import { xAxis, yAxis } from '../../../src/chrtAxis'

export default async function(container) {
  const chart = chrt.Chrt()
    .size(300, 300)
    .node(container)
    .x({ range: [300, 0] })
    .y({ range: [0, 300] })
    .data([2, 0, 3, 10, 4, 2, 1])
    .add(yAxis())
    .add(xAxis())
  return chart
}
