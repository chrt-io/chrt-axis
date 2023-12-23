import * as chrt from 'chrt';
import { xAxis, yAxis } from '../../../src/chrtAxis';

const data = [
  {
    x: 'this is label A on multiple lines, and it is very long',
    y: 'this is label X',
  },
  {
    x: 'this is label B on multiple lines',
    y: 'this is label Y',
  },
  {
    x: 'this is label C on multiple lines, and it shoduld be on four lines',
    y: 'this is label Z, and it should be on three lines',
  },
  {
    x: 'this is label D \r\n \r\n multiple lines, and it is very long',
    y: 'this is\nlabel W',
  },
];

export default async function (container) {
  const chart = chrt
    .Chrt()
    .node(container)
    .margins({ left: 120, bottom: 60 })
    .x({ scale: 'ordinal' })
    .y({ scale: 'ordinal' })
    .data(data)
    .add(xAxis())
    .add(yAxis());
  return chart;
}
