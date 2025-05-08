import React, { useEffect } from "react";
import "./App.css";
import * as d3 from "d3";

function App() {
  useEffect(() => {
    const visHolder = d3.select(".visHolder");
    const containerWidth = parseInt(visHolder.style("width"));
    const data = [
      { year: "2010", gdp: 15.2 },
      { year: "2011", gdp: 16.5 },
      { year: "2012", gdp: 18.0 },
      { year: "2013", gdp: 19.4 },
      { year: "2014", gdp: 20.0 },
      { year: "2015", gdp: 21.5 },
      { year: "2016", gdp: 22.7 },
      { year: "2017", gdp: 24.1 },
      { year: "2018", gdp: 25.4 },
      { year: "2019", gdp: 26.8 },
    ];

    visHolder.selectAll("*").remove();
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const tooltip = d3
      .select(".visHolder")
      .append("div")
      .attr("id", "tooltip")
      .style("opacity", 0);

    const overlay = d3
      .select(".visHolder")
      .append("div")
      .attr("class", "overlay")
      .style("opacity", 0);

    const svg = d3
      .select(".visHolder")
      .append("svg")
      .attr(
        "viewBox",
        `0 0 ${width + margin.left + margin.right} ${
          height + margin.top + margin.bottom
        }`
      )
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("responsive-svg", true)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, width])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.gdp)])
      .range([height, 0]);

    // X-Axis
    svg
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .attr("opacity", 1);

    // Y-Axis
    svg
      .append("g")
      .attr("id", "y-axis")
      .call(d3.axisLeft(yScale))
      .attr("opacity", 0)
      .transition()
      .duration(1000)
      .attr("opacity", 1);

    // Labels
    // X Label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle")
      .attr("class", "axis-label")
      .style("opacity", 0)
      .transition()
      .delay(500)
      .duration(1000)
      .style("opacity", 1)
      .text("Year");

    // Y Label
    svg
      .append("text")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("class", "axis-label")
      .style("opacity", 0)
      .transition()
      .delay(500)
      .duration(1000)
      .style("opacity", 1)
      .text("GDP (Billion $)");

    // Gradient
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#33adff")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#007acc")
      .attr("stop-opacity", 1);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-date", (d) => d.year)
      .attr("data-gdp", (d) => d.gdp)
      .attr("x", (d) => xScale(d.year))
      .attr("y", (d) => yScale(d.gdp))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.gdp))
      .style("fill", "url(#bar-gradient)")
      .style("cursor", "pointer")
      .style("filter", "brightness(1)") // Make bars normal brightness initially
      .on("mouseover", function (event, d) {
        const [x, y] = d3.pointer(event);

        d3.select(this)
          .transition()
          .duration(200)
          .style(
            "filter",
            "drop-shadow(0 0 10px #33adff) drop-shadow(0 0 15px #00ffff)"
          );

        overlay
          .style("opacity", 0.3)
          .style("left", `${x + margin.left}px`)
          .style("top", `${y}px`)
          .style("height", `${height - yScale(d.gdp)}px`)
          .style("width", `${xScale.bandwidth()}px`);

        tooltip
          .style("opacity", 0.9)
          .html(
            `<strong>Year:</strong> ${d.year}<br><strong>GDP:</strong> ₹ ${d.gdp
              .toFixed(1)
              .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")} Billion`
          )
          .style("left", `${x + margin.left + 10}px`)
          .style("top", `${yScale(d.gdp) + margin.top - 10}px`)
          .attr("data-date", d.year);
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).style("filter", "none");

        tooltip.style("opacity", 0);
        overlay.style("opacity", 0);

        // Remove glow effect when hover ends
        d3.select(this).style("filter", "brightness(1)");
      });
  }, []);

  return (
    <div className="App">
      <div className="visHolder">
        <h2 className="chart-title">Nepal GDP Bar Chart</h2>
      </div>
    </div>
  );
}

export default App;
