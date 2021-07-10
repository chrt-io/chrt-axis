import * as chrt from 'chrt';
import {xAxis,yAxis} from '~/chrtAxis'
// import Chrt from 'chrt-core'

const data = [
  {
    x: 'a',
    y: 10
  },
  {
    x: 'b',
    y: 14
  },
  {
    x: 'c',
    y: 14
  },
  {
    x: 'd',
    y: 22
  }
];

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .size(600, 200)
    .data(data)
    .x({scale:'ordinal'})
    .y({scale:'linear'})
    .add(xAxis())
    .add(yAxis())

  return chart
}
