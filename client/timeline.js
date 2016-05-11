// import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import 'd3-layout-timeline';

import {Template} from 'meteor/templating'

let data = [
  {
    name: "American Revolutionary War",
    start: "4/19/1775",
    end: "9/3/1783",
    sphere: "European"
  },
  {
    name: "Cherokee–American wars",
    start: "01/01/1776",
    end: "12/31/1795",
    sphere: "Native"
  }
];

let start = "1/1/1775";
let end = "1/1/1785";

var timeAxis = d3.time.scale()
  .domain([new Date(start), new Date(end)])
  .nice(d3.time.year)
  .range([0, 1000]);

Template.timeline.onRendered(function () {
  let svg = d3.select("#timeline1")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

  let timeline = d3.layout.timeline()
    .size([1000, 300])
    .extent([start, end]);

  let colorScale = d3.scale.ordinal()
    .domain(["European", "Native"])
    .range(["orange", "blue"]);

  let timelineBands = timeline(data);

  svg.append("g")
    .attr("width", "90%")
    .selectAll("rect")
    .data(timelineBands)
    .enter()
    .append("rect")
    .attr("y", d => d.start)
    .attr("x", d => d.y)
    .attr("width", 30)
    .attr("height", d => d.end - d.start)
    .style("fill", d => colorScale(d.sphere))
    .style("stroke", "black")
    .style("stroke-width", 1);

  svg.append("g")
    .attr("width", "10%")
    .attr("class", "time axis")
    .call(d3.svg.axis().scale(timeAxis).orient("right"));
});
