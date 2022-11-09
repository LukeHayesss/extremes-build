import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import React from 'react';
import data2 from '../data/hmap_current_year.csv';

const node = document.createElement('div');

 // set the dimensions and margins of the graph
 const margin = { top: 30, right: 60, bottom: 31, left: 60 },

 width = 1400 - margin.left - margin.right,
 height = 630 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
 .select(node)
 .append("svg")
 //add mobile-friendly
 .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
//  .attr("width", width + margin.left + margin.right)
//  .attr("height", height + margin.top + margin.bottom)
 .append("g")
 .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv(data2).then(function (data) {
 const var0 = data.map(function (d0) {
     return {
         month: d3.timeParse("%Y-%m-%d")(d0.time).getMonth(),
         day: d3.timeParse("%Y-%m-%d")(d0.time).getDate(),
         value: d0.tmed
     }
 })

 const myGroups = Array.from({ length: 31 }, (_, i) => i + 1)
 const myMonths = [
    "Jan", 
    "Feb", 
    "Mar", 
    "Apr", 
    "May", 
    "Jun", 
    "Jul", 
    "Aug", 
    "Sep", 
    "Oct", 
    "Nov", 
    "Dec"
    ]

 // Build X scales and axis:
 const x = d3.scaleBand()
     .range([0, width])
     .domain(myGroups)
     .padding(0.01);
     svg.append("g")
     .attr("transform", `translate(0, ${height})`)
     .call(d3.axisBottom(x))
     .call(g => g.select(".domain").remove());

     svg.append("g")
     .call(d3.axisTop(x))
     .call(g => g.select(".domain").remove());

 // Build X scales and axis:
 const y = d3.scaleBand()
     .range([0, height])
     .domain(myMonths)
     .padding(0.01);
     svg.append("g")
     .call(d3.axisLeft(y))
     .call(g => g.select(".domain").remove());
     svg.append("g")
     .call(d3.axisRight(y))
     .attr("transform", `translate(${width}, 0)`)
     .call(g => g.select(".domain").remove());

 // Build color scale
 const myColor = d3.scaleQuantile()
     .domain([0, 5, 20, 40, 60, 80, 95, 100])
     .range([
        "#08306B", 
        "#2171B5", 
        "#6BAED6", 
        "#FFFFFF", 
        "#FCBBA1", 
        "#FA6A4A", 
        "#CB181D"
    ]);

 // create a tooltip
 const tooltip = d3.select(node)
     .append('div')
     .style("opacity", 0.8)
     .attr("class", "tooltip")
     .style("background-color", "black")
     .style("border", "solid")
     .style("border-width", "2px")
     .style("border-radius", "5px")
     .style("padding", "5px")
     .style("margin-bottom", '51px')

 // Three function that change the tooltip when user hover / move / leave a cell
 const mouseover = function (event, d) {
         tooltip
         .style("opacity", 1)
         d3.select(this)
         .style("stroke", "black")
         .style("opacity", 1)
 }
 const mousemove = function (event, d) {
         tooltip
         .html("The exact value of<br>this cell is: " + d.value)
         .style("left", (event.x) / 2 + "px")
         .style("top", (event.y) / 2 + "px")
 }
 const mouseleave = function (event, d) {
         tooltip
         .style("opacity", 0)
         d3.select(this)
         .style("stroke", "none")
         .style("opacity", 1)
 }

 svg.selectAll()
     .data(var0)
     .join("rect")
     .attr("x", function (d) { return x(d.day) })
     .attr("y", function (d) { return y(myMonths[d.month]) })
     .attr("width", x.bandwidth())
     .attr("height", y.bandwidth())
     .style("fill", function (d) { return myColor(d.value) })
     .style("stroke", "none")
     .on("mouseover", mouseover)
     .on("mousemove", mousemove)
     .on("mouseleave", mouseleave)
});

const RD3Component = rd3.Component;
class HeatmapInteractive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {d3: ''}
    }
    componentDidMount() {
        this.setState({d3: node});
    }
    render() {
        return (
            <div>
                <RD3Component data={this.state.d3}/>
            </div>
        )
    }
}
export default HeatmapInteractive;