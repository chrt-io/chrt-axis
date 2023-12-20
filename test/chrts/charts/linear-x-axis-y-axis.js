import * as chrt from 'chrt';
import { xAxis, yAxis } from '../../../src/chrtAxis';

export default async function (container) {
  const chart = chrt
    .Chrt()
    .node(container)
    .data([2, 0, 3, 10, 4, 2, 1])
    .add(yAxis())
    .add(xAxis());
  return chart;
}
