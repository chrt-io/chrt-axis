import * as chrt from 'chrt';
import { xAxis, yAxis } from '../../../src/chrtAxis';

export default async function (container) {
  const chart = chrt
    .Chrt()
    .node(container)
    .data([2, 0, 3, 10, 4, 2, 1])
    .add(
      yAxis()
        .orient('right')
        .labelsPosition('inside')
        .ticksPosition('inside')
        .labelsPadding(0)
        .labelsOffset((tick, i) => [0, 0]),
    )
    .add(
      xAxis(),
      // .orient('top'),
      // .labelsPosition('outside')
      // .ticksPosition('outside')
      // .labelsPadding(0),
    );
  return chart;
}
