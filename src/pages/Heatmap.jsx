import React, { useEffect, useRef } from "react";
import * as d3 from 'd3';
import { useD3 } from "../hooks/useD3";

function RandomNumbers() {
    return Array.from({length:12}, () => Math.floor(Math.random() * 100) * 1)
}
const data = [
    {Day: 'Mon', Frequency: {AM: RandomNumbers(), PM: RandomNumbers()}},
    {Day: 'Tues', Frequency: {AM: RandomNumbers(), PM: RandomNumbers()}},
    {Day: 'Weds', Frequency: {AM: RandomNumbers(), PM: RandomNumbers()}},
    {Day: 'Thu', Frequency: {AM: RandomNumbers(), PM: RandomNumbers()}},
    {Day: 'Fri', Frequency: {AM: RandomNumbers(), PM: RandomNumbers()}},
    {Day: 'Sat', Frequency: {AM: RandomNumbers(), PM: RandomNumbers()}},
    {Day: 'Sun', Frequency: {AM: RandomNumbers(), PM: RandomNumbers()}},
]

const Heatmap = () => {

const Chart = useRef();

const Dimensions = {
    width: 1000,
    height: 600,
    margin: {top: 130, left: 50, bottom: 70, right: 0}
}

const rectSize = 30;

const colors = [
{Range: '1-20', Color: '#FFFFFF'},
{Range: '21-40', Color: '#FFF7DF'},
{Range: '41-60', Color: '#FFE7BE'},
{Range: '61-80', Color: '#FFC14D'},
{Range: '81-100', Color: '#FF0000'},
]

function colorAssign(d) {
    if (d <= 100 && d > 80) return '#FF0000'
    else if (d <= 80 && d > 60) return '#FFC14D'
    else if (d <= 60 && d > 40) return '#FFC14D'
    else if (d <= 40 && d > 20) return '#FFF7DF'
    else return '#FFFFFF'
}

useEffect(() => {

    const svg = d3.select(Chart.current)
    .attr('width', Dimensions.width)
    .attr('height', Dimensions.height)

    const x = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, Dimensions.width])

    //days label
    svg.append('g')
    .selectAll('text')
    .data(data)
    .join('text')
    .text(d => `${d.Day}`)
    .attr('x', (d, i) => x (i) + Dimensions.margin.left)
    .attr('y', Dimensions.height - Dimensions.margin.bottom)
    .attr('fill', 'black')
    .style('font-size', 14)

    //draw blocks
    data.forEach((day, i) => {
        //AM
        svg.append('g')
        .selectAll('rect')
        .data(day.Frequency.AM)
        .join('rect')
        .attr('x', x(i) + Dimensions.margin.left)
        .attr('y', (d, j) => j * (rectSize + 2) + Dimensions.margin.top)
        .attr('width', rectSize)
        .attr('height', rectSize)
        .attr('fill', d => colorAssign(d))

        //PM
        svg.append('g')
        .selectAll('rect')
        .data(day.Frequency.PM)
        .join('rect')
        .attr('x', x(i) + Dimensions.margin.left + rectSize + 2)
        .attr('y', (d, j) => j * (rectSize + 2) + Dimensions.margin.top)
        .attr('width', rectSize)
        .attr('height', rectSize)
        .attr('fill', d => colorAssign(d))
    })
    //title
    svg.append('text')
    .text('Basic Heatmap')
    .attr('x', Dimensions.width/2 - 50)
    .attr('y', Dimensions.height/10)
    .attr('fill', 'black')
    .style('font-size', 30)
})

return (
<div>
    <svg ref={Chart}></svg>
</div>
)

}

export default Heatmap;