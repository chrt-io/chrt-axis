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
    y: 220
  }
];

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .size(600, 200)
    .data(data)
    .x({scale:'log'})
    .y({scale:'log'})
    .add(xAxis().minorTicks().minorLabels(false))
    .add(yAxis().minorTicks().minorLabels(false))
  return chart
}
