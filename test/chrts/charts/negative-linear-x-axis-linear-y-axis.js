import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'

const data = new Array(21).fill(0).map((d,i) => ({
  x: -10 + i,
  y: -10 + i,
}));

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .size(600, 200)
    .data(data)
    .add(xAxis().zero(0))
    .add(yAxis().zero(0))
  return chart
}
