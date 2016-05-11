// import React, { Component, PropTypes } from 'react';
import d3 from 'd3';
import 'd3-layout-timeline';

import { Template } from 'meteor/templating'

Template.timeline.onRendered(function () {
  var svg = d3.select("#timeline1")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

  var timeline = d3.layout.timeline()
    .size([1000, 300]);

  let colorScale = d3.scale.ordinal()
    .domain(["European", "Native"])
    .range(["#96abb1", "#313746"]);

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

  let timelineBands = timeline(data);

  d3.select("svg").selectAll("rect")
    .data(timelineBands)
    .enter()
    .append("rect")
    .attr("y", function (d) {
      return d.start
    })
    .attr("x", function (d) {
      return d.y
    })
    .attr("width", 30)
    .attr("height", function (d) {
      return d.end - d.start
    })
    .style("fill", function (d) {
      return colorScale(d.sphere)
    })
    .style("stroke", "black")
    .style("stroke-width", 1);
});
