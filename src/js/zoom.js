import * as d3 from "d3";

const isChrome = navigator.userAgent.indexOf("Chrome") !== -1;

export default function zoomFunc() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const svg = d3.select("#svg");
  const svgGroup = d3.select("#svgGroup");

  function zoomed() {
    const scale = d3.event.transform.k || 1;
    const x = d3.event.transform.x || 0;
    const y = d3.event.transform.y || 0;
    if (isChrome) {
      svgGroup.attr("transform", `translate(${x},${y})scale(${scale})`);
    } else {
      svgGroup.attr("transform", `translate(${x} ${y}) scale(${scale})`);
    }
  }

  const zoomListener = d3
  .zoom()
  .scaleExtent([0.1, 3])
  .on("zoom", zoomed);

  const zoomer = svg
  .append("rect")
  .attr("width", '100%')
  .attr("height", '100%')
  .style("fill", "none")
  .style("pointer-events", "all")
  .call(zoomListener);
}
