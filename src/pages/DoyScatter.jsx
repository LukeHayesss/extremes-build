import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import React from 'react';
import data8 from '../data/scatter_temp_doy.csv';
import data9 from '../data/scatter_fcvars.csv';

const node = document.createElement('div')

// set the dimensions and margins of the graph
const margin = { top: 10, right: 60, bottom: 61, left: 60 },
width = 1060 - margin.left - margin.right,
height = 660 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
.select(node)
.append("svg")
//add mobile-friendly attribute
.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

Promise.all([d3.csv(data8), d3.csv(data9)])
.then(([doyTemp, nextTemp]) => {
    const climTemp = doyTemp.map(function (d) {
        return { year: d.year, tmax: kelvin2celsius(d.tmax), 
            tmin: kelvin2celsius(d.tmin), tmed: kelvin2celsius(d.tmed) }
    })
    const ymin = Math.floor(Math.min(d3.min(climTemp, d => d.tmax), 
    kelvin2celsius(nextTemp[0].tmax))) - 1;
    const ymax = Math.ceil(Math.max(d3.max(climTemp, d => d.tmax), 
    kelvin2celsius(nextTemp[0].tmax))) + 1;
    const yearExtent = d3.extent(climTemp, d => d.year)

    const q10 = d3.quantile(climTemp.filter(isBasePeriod), 0.1, d => d.tmax)
    const q90 = d3.quantile(climTemp.filter(isBasePeriod), 0.9, d => d.tmax)

    var yval = climTemp.map(function (d) { return parseFloat(d.tmax); });
    var xval = climTemp.map(function (d) { return parseFloat(d.year); });

    var lr = linearRegression(yval, xval);
    console.log(lr, 'LR');

    // Add X axis
    const x = d3.scaleLinear()
        .domain([Number(yearExtent[0]) - 2, (Number(yearExtent[1]) + 2)])
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([ymin, ymax])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y))

    svg.append("text")
        .attr("class", "plot_title")
        .attr("x", width / 2)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .style("font-family", "Rubik")
        .style("font-size", '34px')
        .text("Tmax at this time of the year");


    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(climTemp)
        .join("circle")
        .attr("cx", function (d) { return x(d.year); })
        .attr("cy", function (d) { return y(d.tmax); })
        .attr("r", 1.5)
        .style("fill", "gray")
        .attr("opacity", 0.5)

    svg.append('g')
        .selectAll("dot")
        .data(nextTemp)
        .join("circle")
        .attr("cx", x(new Date().getFullYear()))
        .attr("cy", y(kelvin2celsius(nextTemp[0].tmax)))
        .attr("r", 3)
        .style("fill", "red")

    svg.append("text")
        .attr("x", x(new Date().getFullYear() + 0.2))
        .attr("y", y(kelvin2celsius(nextTemp[0].tmax) - 2))  //<<== and here
        .attr("text-anchor", "end")
        .text("today: " + Number(kelvin2celsius(nextTemp[0].tmax)).toFixed(1) + "°C")
        .style("fill", "red")
        .style("font-family", 'rubik')
        .style("font-size", '24px')
        .style("font-weight", '600')

    const myLine = ([[yearExtent[0], Number(yearExtent[0]) * lr.slope + lr.intercept], 
    [yearExtent[1], Number(yearExtent[1]) * lr.slope + lr.intercept]])

    svg.append("path")
        .datum(myLine)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .attr("stroke-dasharray", "5,5")
        .attr("d", d3.line()
            .x(function (d) { return x(d[0]) })
            .y(function (d) { return y(d[1]) })
        )

    svg.append("path")
        .datum(([[yearExtent[0], q10], [yearExtent[1], q10]]))
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .attr("stroke-dasharray", "5,5")
        .attr("d", d3.line()
            .x(function (d) { return x(d[0]) })
            .y(function (d) { return y(d[1]) })
        )
    svg.append("path")
        .datum(([[yearExtent[0], q90], [yearExtent[1], q90]]))
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .attr("stroke-dasharray", "5,5")
        .attr("d", d3.line()
            .x(function (d) { return x(d[0]) })
            .y(function (d) { return y(d[1]) })
        )

    svg.append("text")
        .attr("x", x(yearExtent[0]))
        .attr("y", y(Number(q10) + 1))  //<<== and here
        .attr("text-anchor", "start")
        .style("font-family", "rubik")
        .style("font-size", '24px')
        .style("font-weight", '600')
        .text("10th percentile: " + q10.toFixed(1) + "°C")

    svg.append("text")
        .attr("x", x(yearExtent[0]))
        .attr("y", y(Number(q90) + 1))  //<<== and here
        .attr("text-anchor", "start")
        .style("font-family", "rubik")
        .style("font-size", '24px')
        .style("font-weight", '600')
        .text("90th percentile: " + q90.toFixed(1) + "°C")

    svg.append("text")
        .attr("x", x(yearExtent[0]))
        .attr("y", y(Number(yearExtent[1]) * lr.slope + lr.intercept + 1))  //<<== and here
        .attr("text-anchor", "start")
        .style("font-family", "rubik")
        .style("font-size", '24px')
        .style("font-weight", '600')
        .text("Trend: " + (lr.slope * 10).toFixed(1) + "°C/decade")

}
);
function kelvin2celsius(k) {
return k - 273.15;
}
function linearRegression(y, x) {

var lr = {};
var n = y.length;
var sum_x = 0;
var sum_y = 0;
var sum_xy = 0;
var sum_xx = 0;
var sum_yy = 0;

for (var i = 0; i < y.length; i++) {

    sum_x += x[i];
    sum_y += y[i];
    sum_xy += (x[i] * y[i]);
    sum_xx += (x[i] * x[i]);
    sum_yy += (y[i] * y[i]);
}

lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
lr['intercept'] = (sum_y - lr.slope * sum_x) / n;
lr['r2'] = Math.pow((n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);

return lr;

};

function isBasePeriod(x) {
return x.year >= 1981 && x.year <= 2010;
}

const RD3Component = rd3.Component;
class DoyScatter extends React.Component {
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
export default DoyScatter;