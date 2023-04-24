import { utils } from 'chrt-object';
const { createSVG: create } = utils;

export default function generateLabels(labels, name, callback) {
  labels.forEach((d, i, arr) => {
    const dataID = encodeURIComponent(`label-${name}-${d.value}`)
    let labelGroup = this.g.querySelector(
      `[data-id='${dataID}']`
    );
    if (!labelGroup) {
      labelGroup = create('g');
      labelGroup.setAttribute('data-id', dataID);
      if (d.isMinor) {
        labelGroup.classList.add('label-minor');
      }

      this.g.appendChild(labelGroup);

      const label = create('text')
      label.textContent = this.format()?.(d.value, i, arr);
      const color = this.labelsColor()(d.value, i, arr) ?? this.stroke()();
      label.setAttribute('fill', color)
      labelGroup.appendChild(label);
    }
    if (callback) {
      callback(labelGroup, d, i, arr);
    }
  });
}
