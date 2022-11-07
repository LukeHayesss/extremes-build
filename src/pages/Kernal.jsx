import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import React from 'react';
import data3 from '../data/temp_doy.csv';
import data4 from '../data/fcvars.csv';

const node = document.createElement('div');

    // set the dimensions and margins of the graph
    const margin = { top: 60, right: 60, bottom: 100, left: 70 },
        width = 860 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
        .select(node)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);


    // get the data
    Promise.all([d3.csv(data3), d3.csv(data4)])
        .then(([tempDoy, nextTemp]) => {

            // Compute todays temperature
            const todayTempC = kelvin2celsius(nextTemp[0].tmax)

            // Create array of doy temperatures (units)
            var doyTempC = tempDoy.map(function (d) {
                return kelvin2celsius(+d.tmax)
            })


            // Compute temperature values 
            const temp_range = d3.extent(doyTempC);
            const temp_values = d3.range(Math.floor(temp_range[0]) - 5, Math.ceil(temp_range[1]) + 5, 1);
            console.log(temp_range)

            // Compute kernel density estimation
            const kde = kernelDensityEstimator(kernelEpanechnikov(1), temp_values);
            const density = kde(doyTempC.map(function (d) { return +d; }));
            const dens_range = d3.extent(density, function (d) { return +d[1]; });
            console.log(density, 'density')

            // add the x Axis
            const x = d3.scaleLinear()
                .domain(d3.extent(temp_values, function (d) { return +d; }))
                .range([0, width]);
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))
                .call(g => g.select(".domain").remove());

            // add the y Axis
            const y = d3.scaleLinear()
                .range([height, 0])
                .domain(dens_range);

            // Plot the PDF and style it
            svg.append("path")
                .attr("class", "pdf_curve")
                .datum(density)
                .style("fill", "darkGray")
                .attr("d", d3.line()
                    .curve(d3.curveBasis)
                    .x(function (d) { return x(d[0]); })
                    .y(function (d) { return y(d[1]); })
                );

            // Append the line for todays temperature
            svg.append("line")
                .attr("class", "nextTemp")
                .attr("x1", x(todayTempC))  //<<== change your code here
                .attr("y1", y(dens_range[0]))
                .attr("x2", x(todayTempC))  //<<== and here
                .attr("y2", y(dens_range[1]))
            svg.append("text")
                .attr("y", x(todayTempC) - 5)  //<<== change your code here
                .attr("x", y(dens_range[1]))  //<<== and here
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .text("Next 24h temperature: " + todayTempC.toFixed(1) + "°C")
                .style("font-size", "24px")
                // .style("fill", "pink")
                .classed('todayColor', true);

            svg.append("line")
                .attr("class", "ptileTemp")
                .attr("x1", x(d3.quantile(doyTempC, 0.05)))  //<<== change your code here
                .attr("y1", y(dens_range[0]))
                .attr("x2", x(d3.quantile(doyTempC, 0.05)))  //<<== and here
                .attr("y2", y(dens_range[1]))

            svg.append("line")
                .attr("class", "ptileTemp")
                .attr("x1", x(d3.quantile(doyTempC, 0.95)))  //<<== change your code here
                .attr("y1", y(dens_range[0]))
                .attr("x2", x(d3.quantile(doyTempC, 0.95)))  //<<== and here
                .attr("y2", y(dens_range[1]))

            svg.append("line")
                .attr("class", "ptileTemp")
                .attr("x1", x(d3.quantile(doyTempC, 0.5)))  //<<== change your code here
                .attr("y1", y(dens_range[0]))
                .attr("x2", x(d3.quantile(doyTempC, 0.5)))  //<<== and here
                .attr("y2", y(dens_range[1]))

            svg.append("text")
                .attr("y", x(d3.quantile(doyTempC, 0.05)) - 5)  //<<== change your code here
                .attr("x", y(dens_range[1]))  //<<== and here
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .text("5th percentile: " + d3.quantile(doyTempC, 0.05).toFixed(1) + "°C")
                .style("font-size", "24px")

            svg.append("text")
                .attr("y", x(d3.quantile(doyTempC, 0.95)) - 5)  //<<== change your code here
                .attr("x", y(dens_range[1]))  //<<== and here
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .text("95th percentile: " + d3.quantile(doyTempC, 0.95).toFixed(1) + "°C")
                .style("font-size", "24px")

            svg.append("text")
                .attr("y", x(d3.quantile(doyTempC, 0.5)) - 5)  //<<== change your code here
                .attr("x", y(dens_range[1]))  //<<== and here
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .text("50th percentile: " + d3.quantile(doyTempC, 0.5).toFixed(1) + "°C")
                .style("font-size", "24px")
                // .style("fill", "pink")

            svg.append("text")
                .attr("class", "xaxis_title")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height + margin.top - 10)
                .text("Temperature (°C)")
                .style("font-size", "24px")
        });


    // Function to compute density
    function kernelDensityEstimator(kernel, X) {
        return function (V) {
            return X.map(function (x) {
                return [x, d3.mean(V, function (v) { return kernel(x - v); })];
            });
        };
    }

    function kernelEpanechnikov(k) {
        return function (v) {
            return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
    }

    function kelvin2celsius(k) {
        return k - 273.15;
    }

const RD3Component = rd3.Component;
class Kernal extends React.Component {
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
export default Kernal;