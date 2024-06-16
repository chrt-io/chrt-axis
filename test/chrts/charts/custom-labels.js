import * as chrt from "chrt";
import { xAxis, yAxis } from "../../../src/chrtAxis";

export default async function (container) {
  const chart = chrt
    .Chrt()
    .node(container)
    .data([2, 0, 3, 10, 4, 2, 1])
    .add(
      yAxis()
        .labelsColor((d, i) => {
          return i % 2 ? "#f00" : "#0f0";
        })
        .ticksColor((d, i) => {
          return i % 2 ? "#f00" : "#0f0";
        })
        .ticksWidth((d, i) => {
          return i % 2 ? 1 : 6;
        })
        .lineWidth(3)
        .stroke("#00f")
        .labelClass((d, i) => {
          return i % 2 ? `odd-label` : "even-label";
        }),
    )
    .add(
      xAxis()
        .labelsColor((d, i) => {
          return i % 2 ? "#336699" : "#ff6600";
        })
        .ticksColor((d, i) => {
          return i % 2 ? "#f00" : "#0f0";
        })
        .ticksWidth((d, i) => {
          return i % 2 ? 20 : 1;
        })
        .lineWidth(3)
        .stroke("#00f")
        .labelsClass("custom-x-axis-labels"),
    );
  return chart;
}
