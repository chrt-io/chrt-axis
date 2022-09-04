import { utils } from 'chrt-object';
const { createSVG: create } = utils;

export default function generateTicks(ticks,name,callback) {
  ticks.forEach((tick, i, arr) => {
    const dataID = escape(`tick-${name}-${tick.value}`);
    let tickGroup = this.g.querySelector(
      `[data-id='${dataID}']`
    );
    if (!tickGroup) {
      tickGroup = create('g');
      tickGroup.setAttribute('data-id', dataID);
      if(tick.isMinor) {
        tickGroup.classList.add('tick-minor');
      }

      this.g.appendChild(tickGroup);

      const tickLine = create('line');
      const color = this.ticksColor()(tick,i,arr) ?? this.stroke()();
      tickLine.setAttribute('stroke', color)
      tickLine.setAttribute('stroke-width', this.strokeWidth()(tick,i,arr));
      tickGroup.appendChild(tickLine);
    }
    if(callback) {
      callback(tickGroup, tick, i, arr);
    }
  });
}
