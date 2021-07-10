import * as chrt from 'chrt';
import { xAxis } from '~/chrtAxis'
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
    )

  return chart;
}
