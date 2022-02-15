import * as chrt from 'chrt';
import {xAxis,yAxis} from '../../../src/chrtAxis'

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .data([2,0,3,10,4,2,1])
    .add(
      yAxis()
        .labelsColor((d,i) => {
          return i%2 ? '#f00' : '#0f0';
        })
        .ticksColor((d,i) => {
          return i%2 ? '#f00' : '#0f0';
        })
        .stroke('#00f')
    )
    .add(
      xAxis()
        .labelsColor((d,i) => {
          return i%2 ? '#f00' : '#0f0';
        })
        .ticksColor((d,i) => {
          return i%2 ? '#f00' : '#0f0';
        })
        .stroke('#00f')
    )
  return chart
}
