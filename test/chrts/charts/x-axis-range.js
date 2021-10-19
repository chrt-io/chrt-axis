import * as chrt from 'chrt';
import { xAxis } from '../../../src/chrtAxis'
import { xAxisRange } from '../../../src/chrtAxisRange'
const days = 28;
const data = new Array(24 * days).fill(1).map((d,i) => {
  return {
    x: new Date(2021,0,Math.floor(i / 24) + 1,i % 24,0),
    y: Math.sin((i % 360) / Math.PI) * 100,
  }
})

export default async function(container) {
  const chart = chrt.Chrt()
    .data(data)
    .node(container)
    .x({scale:'time'})
    .add(xAxis()
      .interval('day')
      .format(d => new Intl.DateTimeFormat('en-US', {day: 'numeric'}).format(d))
      .add(
        xAxisRange()
          .from(new Date(2021,0,5))
          .to(new Date(2021,0,10))
          .stroke('#aaa')
          .fill('#ddd')
        )

    )

  return chart;
}
