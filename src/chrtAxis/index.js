import chrtAxis from './chrtAxis';
export { default as xAxis } from './xAxis';
export { default as yAxis } from './yAxis';

export default function(name) {
  return new chrtAxis(name);
}
