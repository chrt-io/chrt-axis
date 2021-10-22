import * as chrt from 'chrt';
import { xAxis, yAxis } from '../../../src/chrtAxis'
import { yAxisRange } from '../../../src/chrtAxisRange'

export default async function(container) {
  const chart = chrt.Chrt()
    .data([2,0,3,10,4,2,1])
    .node(container)
    .add(
      yAxis()
        .add(
          yAxisRange()
            .from(7)
            .to(8)
            .stroke('#aaa')
            .fill('#ddd')
          )
    )
    .add(
      yAxis()
        .orient('right')
        .add(
          yAxisRange()
            .from(1)
            .to(2)
            .stroke('#aaa')
            .fill('#ddd')
          )
    )
    .add(xAxis())

  return chart;
}
