import * as chrt from 'chrt';
import {xAxis,yAxis} from '~/chrtAxis'
// import Chrt from 'chrt-core'

const data = [
  {
    x: 'a',
    y: 'x'
  },
  {
    x: 'b',
    y: 'y'
  },
  {
    x: 'c',
    y: 'z'
  },
  {
    x: 'd',
    y: 'k'
  }
];

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .size(600, 200)
    .data(data)
    .x({scale:'ordinal'})
    .y({scale:'ordinal'})
    .add(xAxis().zero('z'))
    .add(yAxis().zero('b'))

  return chart
}
