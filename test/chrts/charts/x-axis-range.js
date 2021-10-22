import * as chrt from 'chrt';
import { xAxis, yAxis } from '../../../src/chrtAxis'
import { xAxisRange } from '../../../src/chrtAxisRange'


export default async function(container) {
  const chart = chrt.Chrt()
    .data([2,0,3,10,4,2,1])
    .node(container)
    .add(xAxis()
      .add(
        xAxisRange()
          .from(1)
          .to(2)
          .stroke('#aaa')
          .fill('#ddd')
        )

    )
    .add(xAxis()
      .orient('top')
      .lineWidth(3)
      .add(
        xAxisRange()
          .from(3)
          .to(4)
          .stroke('#aaa')
          .fill('#ddd')
        )

    )
    .add(yAxis())

  return chart;
}
