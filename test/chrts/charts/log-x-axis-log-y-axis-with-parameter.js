import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'

const data = [
  {
    x: 5,
    y: 10
  },
  {
    x: 0,
    y: 1
  },
  {
    x: 944,
    y: 1020
  },
  {
    x: 500,
    y: 220000
  }
];

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .size(600, 200)
    .data(data)
    .x({domain:[1,10000], scale:'log'})
    .y({domain:[1,100000],scale:'log'})
    .add(xAxis(2))
    .add(yAxis(2))
  return chart
}
