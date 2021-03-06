import * as chrt from 'chrt';
import { xAxis } from '../../../src/chrtAxis'
const seconds = 10;
const data = new Array(seconds).fill(1).map((d,i) => {
  return {
    x: new Date(2021,0,1,1,0,i),
    y: Math.sin((i % 360) / Math.PI) * 100,
  }
})

/*
second: DURATION_SECOND,
minute: DURATION_SECOND * 60,
hour = UNITS.minute * 60;

day = UNITS.hour * 24;

bidiurnal: UNITS.day * 2,
week: UNITS.day * 7,
fortnight: UNITS.day * 14,
month: UNITS.day * 30, // depending on year/month
year: UNITS.day * 365, // depending on year
*/

export default async function(container) {
  const chart = chrt.Chrt()
    .size(800,200)
    .data(data)
    .node(container)
    .x({scale:'time'})
    .add(xAxis()
      .interval('seconds')
      .format(d => new Intl.DateTimeFormat('en-US', {minute:'numeric', second: 'numeric'}).format(d))
    )

  return chart;
}
