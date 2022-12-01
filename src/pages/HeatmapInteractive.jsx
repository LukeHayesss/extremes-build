import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import React from 'react';
import data2 from '../data/hmap_current_year.csv';

const node = document.createElement('div');

 // set the dimensions and margins of the graph
 const margin = { top: 90, right: 60, bottom: 30, left: 60 },
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

 const myDays = Array.from({ length: 31 }, (_, i) => i + 1)
        const myMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        // Build X scales and axis:
        const x = d3.scaleBand()
            .range([0, width])
            .domain(myDays)
            .padding(0.01);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .select(".domain")
            .remove();

        svg.append("g")
            .call(d3.axisTop(x))
            .select(".domain")
            .remove();

        // Build X scales and axis:
        const y = d3.scaleBand()
            .range([0, height])
            .domain(myMonths)
            .padding(0.01);
        svg.append("g")
            .call(d3.axisLeft(y))
            .select(".domain")
            .remove();
        svg.append("g")
            .call(d3.axisRight(y))
            .attr("transform", `translate(${width}, 0)`)
            .select(".domain")
            .remove();

        svg.append("text")
            .attr("class", "plot_title")
            .attr("x", width / 2)
            .attr("y", -60)
            .attr("text-anchor", "middle")
            .style("font-family", "rubik")
            .style("font-size", '34px')
            .style("font-weight", '700')
            .text("Mean daily temperature in " + new Date().getFullYear());


        // Build color scale
        const myColor = d3.scaleQuantile()
            .domain([0, 5, 20, 40, 60, 80, 95, 100])
            .range(["#08306B", "#2171B5", "#6BAED6", "#FFFFFF", "#FCBBA1", "#FA6A4A", "#CB181D"]);

        svg.selectAll()
            .data(var0)
            .join("rect")
            .attr("x", function (d) { return x(d.day) })
            .attr("y", function (d) { return y(myMonths[d.month]) })
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) { return myColor(d.value) })
            .style("stroke", "none")

        var bar = svg
            .selectAll(".hmlabel")
            .data(var0)
            .enter()
            .append("g")
            .attr("class", "hmlabel")
            .attr("text-anchor", "middle")
            .style("font-family", "rubik")


            .attr("transform", `translate(${x.bandwidth() / 2},${y.bandwidth() / 2})`);
        bar
            .append("text")
            .attr("x", (d) => x(d.day))
            .attr("y", (d) => y(myMonths[d.month]))
            .attr("dy", ".35em")
            .text((d) => parseInt(d.value));
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