import * as d3 from "d3";
import formatData from "./formatData";
import data from "./data.json";

console.log("raw data: ", data);

const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50,
};

const width = 1100 - margin.left - margin.right;
const height = 1100 - margin.top - margin.bottom;

const drawTree = (dataset) => {
  const hierarchy = d3
    .hierarchy(dataset)
    .sum((data) => data.volume)
    .sort((a, b) => a.volume - b.volume);

  const treemap = d3.treemap().size([width, height]).padding(2);
  const root = treemap(hierarchy);

  const chartSvg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // prettier-ignore
  const cell = chartSvg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d.x0},${d.y0})`)

  cell
    .append("rect")
    .attr("width", ({ x0, x1 }) => x1 - x0)
    .attr("height", ({ y0, y1 }) => y1 - y0)
    .attr("fill", ({ data }) => d3.interpolatePRGn(data.maturity));

  cell
    .append("text")
    .attr("text-anchor", "middle")
    .attr("width", ({ x1, x0 }) => x1 - x0)
    .attr("height", ({ y1, y0 }) => y1 - y0)
    .attr("font-size", ({ x1, x0, y0, y1 }) => Math.min(x1 - x0, y1 - y0) / 6)
    .selectAll("tspan")
    .data(({ data }) => data.name.split(/(?=[A-Z][^A-Z])/g))
    .enter()
    .append("tspan")
    .style("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("dy", "2em")
    .attr("x", function () {
      const parentData = d3.select(this.parentNode).datum();
      return (parentData.x1 - parentData.x0) / 2;
    })

    .text((d) => d);
};
const formattedData = formatData("chart title", data);
drawTree(formattedData);
