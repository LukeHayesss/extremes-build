import rd3 from 'react-d3-library';
import * as d3 from 'd3';
import React from 'react';
import data3 from '../data/maxmin_temp_doy.csv';
import data4 from '../data/maxmin_fcvars.csv';
import '../d3Styles/d3.css'

const node = document.createElement('div');

// set the dimensions and margins of the graph
const margin = { top: 10, right: 60, bottom: 100, left: 70 },
width = 1060 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
.select(node)
.append("svg")
//add mobile-friendly attribute
.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

// get the data
Promise.all([d3.csv(data3), d3.csv(data4)])
.then(([tempDoy, nextTemp]) => {

    // Create variable of doy temperatures (units)
    var doyTempC = tempDoy.map(function (d) {
        return { tmax: kelvin2celsius(d.tmax), tmin: kelvin2celsius(d.tmin) }
    })

    // Create variable of todays temperaturesure
    const todayTempC = nextTemp.map(function (d) {
        return { tmax: kelvin2celsius(d.tmax), tmin: kelvin2celsius(d.tmin) }
    })

    const doyTX = doyTempC.map(function (d) { return d.tmax }).sort(d3.ascending);
    const doyTN = doyTempC.map(function (d) { return d.tmin }).sort(d3.ascending);

    // Compute temperature ranges
    const temp_x = d3.extent(doyTempC, function (d) { return d.tmax; });
    const temp_n = d3.extent(doyTempC, function (d) { return d.tmin; });

    const temp_values = d3.range(Math.floor(temp_n[0]) - 5, Math.ceil(temp_x[1]) + 5, 1);
    const temp_range = d3.extent(temp_values)

    // Compute kernel density estimation
    const kde = kernelDensityEstimator(kernelEpanechnikov(1), temp_values);


    const density_x = kde(doyTempC.map(function (d) { return +d.tmax; }));
    const density_n = kde(doyTempC.map(function (d) { return +d.tmin; }));

    const dens_max = Math.max(d3.max(density_x, d => +d[1]), d3.max(density_n, d => +d[1]))

    const dens_range = d3.extent([0, dens_max])


    // add the x Axis
    const x = d3.scaleLinear()
        .domain(temp_range)
        .range([0, width])
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .select(".domain")
        .remove();

    // add the y Axis
    const y = d3.scaleLinear()
        .range([height, 0])
        .domain(dens_range);

    // Plot the PDF max and min
    svg.append("path")
        .attr("class", "pdf_curve_max")
        .datum(density_x)
        .style("fill", "darkGray")
        .style("shape-rendering", "crispEdges")
        .attr("d", d3.line()
            .curve(d3.curveBasis)
            .x(function (d) { return x(d[0]); })
            .y(function (d) { return y(d[1]); })
        );

    svg.append("path")
        .attr("class", "pdf_curve_min")
        .datum(density_n)
        .style("fill", "darkGray")
        .style("shape-rendering", "crispEdges")
        .attr("d", d3.line()
            .curve(d3.curveBasis)
            .x(function (d) { return x(d[0]); })
            .y(function (d) { return y(d[1]); })
        );

    //Append lines for today's temperatures
    svg.append("line")
        .attr("class", "nextTempX")
        .attr("x1", x(todayTempC[0].tmax))
        .attr("y1", y(dens_range[0]))
        .attr("x2", x(todayTempC[0].tmax))
        .attr("y2", y(dens_range[1]));

    svg.append("text")
        .attr("y", x(todayTempC[0].tmax) - 5)  //<<== change your code here
        .attr("x", y(dens_range[1]))  //<<== and here
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .text("Next 24h: " + todayTempC[0].tmax.toFixed(1) + "°C")
        .style("font-family", 'rubik')
        .style("font-size", '24px')
        .style("font-weight", '600')
        .classed('todayColorX', true);

    svg.append("line")
        .attr("class", "nextTempN")
        .attr("x1", x(todayTempC[0].tmin))
        .attr("y1", y(dens_range[0]))
        .attr("x2", x(todayTempC[0].tmin))
        .attr("y2", y(dens_range[1]));


    svg.append("text")
        .attr("y", x(todayTempC[0].tmin) - 5)  //<<== change your code here
        .attr("x", y(dens_range[1]))  //<<== and here
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .style("font-family", 'rubik')
        .style("font-size", '24px')
        .style("font-weight", '600')
        .text("Next 24h: " + todayTempC[0].tmin.toFixed(1) + "°C")
        .classed('todayColorN', true);

    // Append lines for 5th and 95th percentiles
    svg.append("line")
        .attr("class", "ptileTempX")
        .attr("x1", x(d3.quantile(doyTX, 0.05)))  //<<== change your code here
        .attr("y1", y(dens_range[0]))
        .attr("x2", x(d3.quantile(doyTX, 0.05)))  //<<== and here
        .attr("y2", y(dens_range[1]))

    svg.append("line")
        .attr("class", "ptileTempX")
        .attr("x1", x(d3.quantile(doyTX, 0.95)))  //<<== change your code here
        .attr("y1", y(dens_range[0]))
        .attr("x2", x(d3.quantile(doyTX, 0.95)))  //<<== and here
        .attr("y2", y(dens_range[1]))

    svg.append("text")
        .attr("y", x(d3.quantile(doyTX, 0.05)) - 5)  //<<== change your code here
        .attr("x", y(dens_range[1]))  //<<== and here
        .attr("text-anchor", "start")
        .attr("transform", "translate(0," + (height - 10) + "),rotate(-90)")
        .text("5th perc: " + d3.quantile(doyTX, 0.05).toFixed(1) + "°C")
        .style("font-family", 'rubik')
        .style("font-size", '24px')
        .style("font-weight", '600')
        .classed('ptileTextX', true)

    svg.append("text")
        .attr("y", x(d3.quantile(doyTX, 0.95)) - 5)  //<<== change your code here
        .attr("x", y(dens_range[1]))  //<<== and here
        .attr("text-anchor", "start")
        .attr("transform", "translate(0," + (height - 10) + "),rotate(-90)")
        .text("95th perc: " + d3.quantile(doyTX, 0.95).toFixed(1) + "°C")
        .style("font-family", 'rubik')
        .style("font-size", '24px')
        .style("font-weight", '600')
        .classed('ptileTextX', true);

    svg.append("line")
        .attr("class", "ptileTempN")
        .attr("x1", x(d3.quantile(doyTN, 0.05)))  //<<== change your code here
        .attr("y1", y(dens_range[0]))
        .attr("x2", x(d3.quantile(doyTN, 0.05)))  //<<== and here
        .attr("y2", y(dens_range[1]))

    svg.append("line")
        .attr("class", "ptileTempN")
        .attr("x1", x(d3.quantile(doyTN, 0.95)))  //<<== change your code here
        .attr("y1", y(dens_range[0]))
        .attr("x2", x(d3.quantile(doyTN, 0.95)))  //<<== and here
        .attr("y2", y(dens_range[1]))

    svg.append("text")
        .attr("y", x(d3.quantile(doyTN, 0.05)) - 5)  //<<== change your code here
        .attr("x", y(dens_range[1]))  //<<== and here
        .attr("text-anchor", "start")
        .attr("transform", "translate(0," + (height - 10) + "),rotate(-90)")
        .text("5th perc: " + d3.quantile(doyTN, 0.05).toFixed(1) + "°C")
        .style("font-family", 'rubik')
        .style("font-size", '24px')
        .style("font-weight", '600')
        .classed('ptileTextN', true);

    svg.append("text")
        .attr("y", x(d3.quantile(doyTN, 0.95)) - 5)  //<<== change your code here
        .attr("x", y(dens_range[1]))  //<<== and here
        .attr("text-anchor", "start")
        .attr("transform", "translate(0," + (height - 10) + "),rotate(-90)")
        .text("95th perc: " + d3.quantile(doyTN, 0.95).toFixed(1) + "°C")
        .style("font-family", 'rubik')
        .style("font-size", '24px')
        .style("font-weight", '600')
        .classed('ptileTextN', true);

    svg.append("text")
        .attr("class", "xaxis_title")
        .attr("text-anchor", "end")
        .attr("x", width)
        //adjust margin top and style of temperature heading
        .attr("y", height + margin.top + 60)
        .style("font-family", 'rubik')
        .style("font-size", '34px')
        .style("font-weight", '600')
        .text("Temperature (°C)");
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
class KernelMaxMin extends React.Component {
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
export default KernelMaxMin;


