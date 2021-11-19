import { utils } from 'chrt-object';
const { createSVG: create } = utils;

export default function generateTicks(ticks,name,callback) {
  ticks.forEach((tick, i, arr) => {
    let tickGroup = this.g.querySelector(
      `[data-id='tick-${name}-${tick.value}']`
    );
    if (!tickGroup) {
      tickGroup = create('g');
      tickGroup.setAttribute('data-id', `tick-${name}-${tick.value}`);
      if(tick.isMinor) {
        tickGroup.classList.add('tick-minor');
      }

      this.g.appendChild(tickGroup);


      const tickLine = create('line');
      tickLine.setAttribute('stroke', this.stroke()(tick,i,arr))
      tickLine.setAttribute('stroke-width', this.strokeWidth()(tick,i,arr));
      tickGroup.appendChild(tickLine);


    }
    if(callback) {
      callback.call(null, tickGroup, tick, i, arr);
    }
  });
}
