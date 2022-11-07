import rd3 from 'react-d3-library'
import * as d3 from 'd3'
import React from 'react';
import data5 from '../data/temp_current_year.csv';
import data6 from '../data/bounds.csv';
import data7 from '../data/fcvars.csv';

const node = document.createElement('div')

// set the dimensions and margins of the graph
const margin = { top: 80, right: 30, bottom: 30, left: 60 },
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

//Read the data
Promise.all([d3.csv(data5), d3.csv(data6), d3.csv(data7)])
.then(([yearTemp, yearBounds, nextTemp]) => {
    const dataTemp = yearTemp.map(function (d) {
        return { date: d3.timeParse("%Y-%m-%d")(d.time), tmax: kelvin2celsius(d.tmax), tmin: kelvin2celsius(d.tmin) }
    })
    const dataBounds = yearBounds.map(function (d) {
        return {
            date: d3.timeParse("%Y-%m-%d")(d.doy), tmax: d.tmax, tmin: d.tmin, quantile: d.quantile
        }
    })

    const quantiles = d3.group(dataBounds, d => d.quantile); // nest function allows to group the calculation per level of a factor
    const q01 = quantiles.get("0.1")
    const q05 = quantiles.get("0.5")
    const q09 = quantiles.get("0.9")

    function getTmaxQuantiles(qb, qt) {
        return {
            date: qb.map(d => d.date), q01: qb.map(d => kelvin2celsius(d.tmax)), q09: qt.map(d => kelvin2celsius(d.tmax))
        }
    }

    function getTminQuantiles(qb, qt) {
        return {
            date: qb.map(d => d.date), q01: qb.map(d => kelvin2celsius(d.tmin)), q09: qt.map(d => kelvin2celsius(d.tmin))
        }
    }

    const boundsTmax = getTmaxQuantiles(q01, q09)
    const boundsTmin = getTminQuantiles(q01, q09)


    const mixedTmax = boundsTmax.date.map(function (d, i) {
        return { date: d, q01: boundsTmax.q01[i], q09: boundsTmax.q09[i] }
    })

    const mixedTmin = boundsTmin.date.map(function (d, i) {
        return { date: d, q01: boundsTmin.q01[i], q09: boundsTmin.q09[i] }
    })

    const ymin = Math.min(d3.min(dataTemp, d => d.tmin), d3.min(mixedTmin, d => d.q01), kelvin2celsius(nextTemp[0].tmin)) - 5
    const ymax = Math.max(d3.max(dataTemp, d => d.tmax), d3.max(mixedTmax, d => d.q09), kelvin2celsius(nextTemp[0].tmax)) + 5

    const today = new Date()
    // Add X axis --> it is a date format
    const x = d3.scaleTime()
        .domain(d3.extent(q05, d => d.date))
        .range([0, width]);
        
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(fc.axisBottom(x).tickFormat(d3.timeFormat("%b")).tickCenterLabel(true))
        .call(g => g.select(".domain").remove());
    // Add Y axis
    const y = d3.scaleLinear()
        .domain([ymin, ymax])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove());

    svg.append("text")
        .attr("class", "plot_title")
        .attr("x", width / 2)
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .text("Temperature (°C) in " + new Date().getFullYear());

    const opacityDecorate = selection => {
        selection.attr('opacity', 0.2);
    };

    const gridline = fc
        .annotationSvgGridline()
        .xScale(x)
        .yScale(y)
        .xDecorate(opacityDecorate)
        .yDecorate(opacityDecorate);

    svg.call(gridline)

    // Show Medians
    svg.append("path")
        .datum(q05)
        .attr("class", "medianTmin")
        .attr("fill", "none")
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(kelvin2celsius(d.tmin)))
        )
    svg.append("path")
        .datum(q05)
        .attr("class", "medianTmax")
        .attr("fill", "none")
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(kelvin2celsius(d.tmax)))
        )
    // Show intervals
    svg.append("path")
        .datum(mixedTmin)
        .attr("class", "boundsTmin")
        .attr("d", d3.area()
            .x(d => x(d.date))
            .y0(d => y(d.q01))
            .y1(d => y(d.q09))
        )
    svg.append("path")
        .datum(mixedTmax)
        .attr("class", "boundsTmax")
        .attr("d", d3.area()
            .x(d => x(d.date))
            .y0(d => y(d.q01))
            .y1(d => y(d.q09))
        )

    // Show this year lines
    svg.append("path")
        .datum(dataTemp)
        .attr("class", "yearTmin")
        .attr("fill", "none")
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(d.tmin))
        )
    svg.append("path")
        .datum(dataTemp)
        .attr("class", "yearTmax")
        .attr("fill", "none")
        .attr("d", d3.line()
            .x(d => x(d.date))
            .y(d => y(d.tmax))
        )


    svg.append('g')
        .selectAll("dot")
        .data(nextTemp)
        .enter()
        .append("circle")
        .attr("class", "nextTmin")
        .attr("cx", function (d) { return x(today); })
        .attr("cy", function (d) { return y(kelvin2celsius(d.tmin)); })
        .attr("r", 4)

    svg.append('g')
        .selectAll("dot")
        .data(nextTemp)
        .enter()
        .append("circle")
        .attr("class", "nextTmax")
        .attr("cx", function (d) { return x(today); })
        .attr("cy", function (d) { return y(kelvin2celsius(d.tmax)); })
        .attr("r", 4)
}
)
function kelvin2celsius(k) {
return k - 273.15;
}

const RD3Component = rd3.Component;
class LineDate extends React.Component {
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
export default LineDate;