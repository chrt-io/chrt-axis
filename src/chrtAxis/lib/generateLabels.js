import { utils } from "chrt-object";
const { createSVG: create } = utils;

function createSVGWithWrappedText(textContent, maxWidth, options) {
  // Create the foreignObject element
  const foreignObject = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "foreignObject",
  );
  foreignObject.setAttribute("width", `${maxWidth}px`);
  foreignObject.setAttribute("height", "100%");
  foreignObject.style.overflow = "visible";

  // Create the XHTML div element
  const div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
  div.style.wordWrap =
    typeof textContent === "number" ? "no-wrap" : "break-word";
  div.style.maxWidth = `${maxWidth}px`;
  div.style.width = `${maxWidth}px`;
  div.style.padding = `0 0.5em`;
  div.style.textAlign = options.align ?? "center";
  div.style.color = options.color ?? "inherit";
  // div.style.transform = "translateX(-50%)";
  div.textContent = textContent;
  div.innerText = textContent;
  if (options.class) {
    div.classList.add(options.class);
  }

  // console.log("createSVGWithWrappedText", textContent, maxWidth, options);

  // Append elements to build the hierarchy
  foreignObject.appendChild(div);

  return foreignObject;
}

export default function generateLabels(labels, name, options = {}, callback) {
  labels.forEach((d, i, arr) => {
    const dataID = encodeURIComponent(`label-${name}-${d.value}`);
    let labelGroup = this.g.querySelector(`[data-id='${dataID}']`);
    if (!labelGroup) {
      labelGroup = create("g");
      labelGroup.setAttribute("data-id", dataID);
      if (d.isMinor) {
        labelGroup.classList.add("label-minor");
      }
      // console.log("generateLabels", d, this);
      this.g.appendChild(labelGroup);
      // console.log("CLASS", this.labelsClass()(d, i, arr));
      const label = createSVGWithWrappedText(
        this.format()?.(d.value, i, arr),
        options.getTickDistance ? options.getTickDistance(d, i) : 100,
        {
          ...options,
          color:
            this.labelsColor()(d, i, arr) ??
            this.ticksColor()(d, i, arr) ??
            this.stroke()(),
          class: this.labelsClass()(d, i, arr),
        },
      );
      labelGroup.appendChild(label);
    }
    if (callback) {
      callback(labelGroup, d, i, arr);
    }
  });
}
