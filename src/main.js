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

const width = 900 - margin.left - margin.right;
const height = 900 - margin.top - margin.bottom;

const drawTree = (dataset) => {
  const hierarchy = d3
    .hierarchy(dataset)
    .sum((data) => data.volume)
    .sort((a, b) => a.volume - b.volume);

  const treemap = d3.treemap().size([width, height]).padding(2);
  const root = treemap(hierarchy);

  d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .append("g")
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("x", ({ x0 }) => x0)
    .attr("y", ({ y0 }) => y0)
    .attr("width", ({ x0, x1 }) => x1 - x0)
    .attr("height", ({ y0, y1 }) => y1 - y0)
    .attr("fill", ({ data }) => d3.interpolatePRGn(data.maturity));
};
const formattedData = formatData("chart title", data);
drawTree(formattedData);
