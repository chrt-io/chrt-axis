import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'
// import chrtLine from '~/chrtLine'

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
  return chrt.Chrt()
    .node(container)
    .size(600, 200)
    .x({scale:'ordinal'})
    .y({scale:'linear'})
    // .y({domain:[1,10000], scale:'log'})
    .add(xAxis())
    .add(yAxis())
    .add(
      chrt.chrtLine()
        .data(data, d => ({
          x: d.x,
          y: d.y,
        }))
        .width(0.5)
        .color('#f00')
        .opacity(0.8)
    );
}
