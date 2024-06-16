import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'

const deg2rad = (deg) => deg * Math.PI / 180;

const data = Array(360).fill().map((d,i) => ({
  x: i,
  y: Math.sin(deg2rad(i))
}))

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .size(600, 200)
    .data(Array(360).fill().map((d,i) => Math.sin(deg2rad(i))))
    .x({domain:[0,360]})
    .add(
      xAxis()
        .ticks([0, 90, 180, 270, 360])
        .zero(0)

    )
    .add(yAxis(3))
  return chart
}
