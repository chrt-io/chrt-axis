import * as chrt from 'chrt';
import { xAxis, yAxis } from '../../../src/chrtAxis'
const now = 1637187609690;
const data = [
  {
    x: +new Date(now - 2 * 24 * 60 * 60 * 1000),
    y: 22
  },
  {
    x: now,
    y: 38,
  }];

// console.log(data)

export default async function(container) {
  const chart = chrt.Chrt()
  //  .data(data)
    .node(container)
    .x({scale:'time'})
    .add(xAxis()
      .interval('day')
      .format(d => new Intl.DateTimeFormat('en-US', {day: 'numeric'}).format(d))
    )
    .add(
      yAxis()
    )
    .add(chrt.chrtLine().data(data))

  return chart;
}
