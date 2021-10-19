import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'

const data = [
  {
    y: 'a',
    x: 10
  },
  {
    y: 'b',
    x: 14
  },
  {
    y: 'c',
    x: 14
  },
  {
    y: 'd',
    x: 22
  },
  {
    y: 'e',
    x: 22
  }
];

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .size(600, 200)
    .data(data)
    .y({scale:'ordinal'})
    .add(xAxis().zero('b'))
    .add(yAxis())
  
  return chart
}
