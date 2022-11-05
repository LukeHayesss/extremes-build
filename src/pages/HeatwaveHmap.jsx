import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import React from 'react';
import data1 from '../data/hwcs_current_year.csv';

const node = document.createElement('div');

    // set the dimensions and margins of the graph
    const margin = { top: 80, right: 30, bottom: 30, left: 30 },
        width = 990 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
        .select(node)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv(data1).then(function (data) {
        const hmdata = data.map(function (d0) {
            return {
                month: d3.timeParse("%Y-%m-%d")(d0.time).getMonth(),
                day: d3.timeParse("%Y-%m-%d")(d0.time).getDate(),
                EHF: d0.EHF,
                ECF: d0.ECF
            }
        })

        const myDays = Array.from({ length: 31 }, (_, i) => i + 1)
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
            .attr("y", -30)
            .attr("text-anchor", "middle")
            .text("Heat and cold waves in " + new Date().getFullYear());

        // Build color scale
        var colorScale = d3.scaleLinear()
            .domain([0, 10])
            .range([0, 1])

        svg.selectAll()
            .data(hmdata)
            .join("rect")
            .attr("x", function (d) { return x(d.day) })
            .attr("y", function (d) { return y(myMonths[d.month]) })
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) { return d.EHF > 0 ? d3.interpolateYlOrRd(colorScale(d.EHF)) : "none" })
            .style("stroke", "none")

        svg.selectAll()
            .data(hmdata)
            .join("rect")
            .attr("x", function (d) { return x(d.day) })
            .attr("y", function (d) { return y(myMonths[d.month]) })
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) { return d.ECF > 0 ? d3.interpolateBuPu(colorScale(d.ECF)) : "none" })
            .style("stroke", "none")

        var bar = svg
            .selectAll(".hmlabel")
            .data(hmdata)
            .enter()
            .append("g")
            .attr("class", "hmlabel")
            .attr("transform", `translate(${x.bandwidth() / 2},${y.bandwidth() / 2})`);
        bar
            .append("text")
            .attr("x", (d) => x(d.day))
            .attr("y", (d) => y(myMonths[d.month]))
            .attr("dy", ".35em")
            .text((d) => d.EHF > 0 ? parseInt(d.EHF) : "");
        bar
            .append("text")
            .attr("x", (d) => x(d.day))
            .attr("y", (d) => y(myMonths[d.month]))
            .attr("dy", ".35em")
            .text((d) => d.ECF > 0 ? parseInt(d.ECF) : "");
    });

const RD3Component = rd3.Component;
class HeatwaveHmap extends React.Component {
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
export default HeatwaveHmap;