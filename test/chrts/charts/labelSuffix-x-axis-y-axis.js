import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .margins({right: 50})
    .data([0,1,3,10,4,2,0,1,3,10])
    .add(yAxis().label('%', {position:'all'}))
    .add(xAxis().label('$', {position:'first'}))
    .add(xAxis().orient('top').label('$', {position:'last'}))
    .add(yAxis().orient('right').label('$', {value: 5}))

  return chart
}
