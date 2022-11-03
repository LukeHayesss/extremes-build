import React from "react";
import * as d3 from 'd3';
import { useD3 } from "../hooks/useD3";
import data from '../data/temp_2022.csv'

const Line = () => {
    const ref = useD3(() => {
            const margin = {top: 10, right: 30, bottom: 30, left: 60 };
            const width = 460 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;


  // append the svg object to the body of the page
       const svg = d3
       .select(".plot-area")
       .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

        //read the data
        // d3.csv("../data/temp_2022.csv", function (data) {
            d3.csv(data, function(data) {console.log(data, 'BANANA')})

        // Add X axis --> it is a date format
        const x = d3
        .scaleLinear()
        .domain([1, 365])
        .range([0, width]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3
        .scaleLinear()
        .domain([0, 13])
        .range([height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        //add svg
        svg
        .append("path")
        .datum(data)
        .attr("fill", "#cce5df")
        .attr("stroke", "none")
        .attr("d", d3.area()
            .x(function (d) { return x(d.time) })
            .y0(function (d) { return y(d.tmin) })
            .y1(function (d) { return y(d.tmax) })
        )

        // Add the line
        svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d.time) })
            .y(function (d) { return y(d.tmax) })
    )})




    return (
   <svg
   ref={ref}
   style={{
    height: 500,
    width: '100%',
    marginRight: "0px",
    marginLeft: "0px",
   }}
   >
   <g className="plot-area"/>
   <g className="x-axis"/>
   <g className="y-axis"/>
   </svg>
    )}
     

export default Line;