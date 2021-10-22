import { createSVG as create } from '../../layout';

export default function generateLabels(labels,name,callback) {
  labels.forEach((d, i, arr) => {
    let labelGroup = this.g.querySelector(
      `[data-id='label-${name}-${d.value}']`
    );
    if (!labelGroup) {
      labelGroup = create('g');
      labelGroup.setAttribute('data-id', `label-${name}-${d.value}`);
      if(d.isMinor) {
        labelGroup.classList.add('label-minor');
      }

      this.g.appendChild(labelGroup);

      const label = create('text')
      label.textContent = this.format()?.(d.value, i, arr);
      label.setAttribute('fill', this.labelsColor()(d.value, i, arr))
      // if(d.label) {
      //   label.textContent = `${this.format()(d.value, i, arr)}${d.label.text}`;
      // }
      labelGroup.appendChild(label);
    }
    if(callback) {
      callback.call(null, labelGroup, d, i, arr);
    }
  });
}
