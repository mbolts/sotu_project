
    // <style>
    //     body {
    //         font-family: "Arial", sans-serif;
    //     }
        
    //     .bar {
    //         fill: #5f89ad;
    //     }
        
    //     .axis {
    //         font-size: 13px;
    //     }
        
    //     .axis path,
    //     .axis line {
    //         fill: none;
    //         display: none;
    //     }
        
    //     .label {
    //         font-size: 13px;
    //     }
    // </style>

let data = words;

//sort bars based on value
data = data.sort(function (a, b) {
    return d3.ascending(a[1], b[1]);
});

console.log(data);

//set up svg using margin conventions - we'll need plenty of room on the left for labels
var margin = {
    top: 15,
    right: 40,
    bottom: 15,
    left: 80
};

var width = window.innerWidth * 0.4 - margin.left - margin.right,
    height = width - margin.top - margin.bottom;

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
    .range([0, width])
    .domain([0, d3.max(data, d => d[1])]);

var y = d3.scaleBand()
    .rangeRound([height, 0], 0.1)
    .domain(data.map(d =>d[0]));

let color = d3.scaleSequential(d3.interpolateYlGnBu)
              .domain([d3.min(data, d => d[1]), d3.max(data, d => d[1])]);

//make y axis to show bar names
var yAxis = d3.axisLeft()
    .scale(y)
    //no tick marks
    .tickSize(0);

var gy = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

var bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("g");

//append rects
bars.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return y(d[0]);
    })
    .attr("height", y.bandwidth())
    .attr("x", 0)
    .attr("width", function (d) {
        return x(d[1]);
    })
    .style("fill", d => color(d[1]));

//add a value label to the right of each bar
bars.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return y(d[0]) + y.bandwidth() / 2 + 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function (d) {
        return x(d[1]) + 3;
    })
    .text(function (d) {
        return d[1];
    })
    .style("fill", "#696767")
    .style("font-size", "10pt");
        
