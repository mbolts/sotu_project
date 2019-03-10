// var data = {};



// const svg = d3.select('#chart')
//     .append('svg')
//     .attr('width', '1000px')
//     .attr('height', '800px');

data = d3.json("/decade_speeches").then(function (data) {
    console.log(data);

    // console.log(d3.hierarchy(data));
    // console.log(d3.hierarchy(data).children);

    // rMin = d3.min(data, d => d[1]);
    // rMax = d3.max(data, d => d[1]);

    // xMin = d3.min(data, d => d[1]);
    // yMax = d3.max(data, d => d[1]);

    // console.log(rMax, rMin);

    // rScale = d3.scaleLinear()
    //            .domain([rMin, rMax])
    //            .range([10,25]);

    // bubbles = svg.selectAll('.bubble')
    //              .data(data)
    //              .enter()
    //              .append('circle')
    //              .attr('class', 'bubble')
    //              .attr('cx', 100)
    //              .attr('cy', 100)
    //              .attr('r', d => rScale(d[1]))
    //              .text(d => d[0]);



// Cluster nodes from https://blockbuilder.org/giorgi-ghviniashvili/e08ef6f8e5e71795756dbcff2cb7c413
const decades = [1790, 1800, 1810, 1820, 1830, 1840, 1850, 1860,
                 1870, 1880, 1890, 1900, 1910, 1920, 1930, 1940,
                 1950, 1960, 1970, 1980, 1990, 2000, 2010];

const m = decades.length, // number of distinct clusters
      n = m * 50; // total number of nodes

const width = 50 * m,
      height = 25 * m,
      padding = 1.5, // separation between same-color nodes
      clusterPadding = 3, // separation between different-color nodes
      maxRadius = 15;

xMax = d3.max(data.children, d => d.name);
xMin = d3.min(data.children, d => d.name);


const numScale = d3.scaleLinear()
                   .domain([0, m-1])
                   .range([0,1]);

const xScale = d3.scaleLinear()
                .domain([xMax, xMin])
                .range([50, width - 50]);

const color = d3.scaleSequential(d3.interpolateSpectral)
              .domain([0,1]);

let node, svg, force, root;

// Initialize the clusters
const clusters = new Array(m);

// Make random data
let nodes = d3.range(n).map(function() {
  var i = Math.floor(Math.random() * m),
      r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
      d = {cluster: i, radius: r};
  if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
  return d;
});

root = d3.hierarchy(data);
console.log(root);

root = d3.hierarchy({
    values: d3.nest()
              .key(d => d.name)
              .entries(data.children)
            }, function(d) {return d.values;})
            .sum(function(d) {return d.count;});

console.log(root);
// var root = d3.hierarchy({
//     values: d3.nest()
//     .key(function(d) { return d.cluster; })
//     .entries(nodes)}, function(d) { return d.values; 
//   })
//   .sum(function(d) { return d.radius * d.radius; })
// console.log(root.children);
  // .sum(function(d) { return d.radius * d.radius; })

// Use the pack layout to initialize node positions.
d3.pack(root)
   .size([width, height]);

force = d3.forceSimulation(root['children'])
        .force('center', d3.forceCenter().x(width / 2).y(height / 2))
        .force('collide', d3.forceCollide().radius(d => d.radius + 10))
    .on("tick", tick)

svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

node = svg.selectAll("circle")
    .data(data['children'])
  .enter()
    .append("circle")
    .attr('cx', d => xScale(d.name))
    .attr('cy', height / 2)
    .attr('r', 10)
    .style("fill", function(d) { return color(numScale(d.count)); })
    .text((d)=>d.name);
//     .call(force.drag);
// console.log(node);

node.transition()
    .duration(750)
    .delay(function(d, i) { return i * 5; })
    .attrTween("r", function(d) {
      var i = d3.interpolate(0, d.radius);
      return function(t) { return d.radius = i(t); };
    });

function tick() {
  node
    .each(cluster(.2))
    .each(collide(.5))
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });
}

// Move d to be adjacent to the cluster node.
function cluster(alpha) {
  return function(d) {
    var cluster = clusters[d.cluster];
    if (cluster === d) return;
    var x = d.x - cluster.x,
        y = d.y - cluster.y,
        l = Math.sqrt(x * x + y * y),
        r = d.radius + cluster.radius;
    if (l != r) {
      l = (l - r) / l * alpha;
      d.x -= x *= l;
      d.y -= y *= l;
      cluster.x += x;
      cluster.y += y;
    }
  };
}

// Resolves collisions between d and all other circles.
function collide(alpha) {
  var quadtree = d3.quadtree()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .extent([[0, 0], [width, height]])
    .addAll(nodes);
  
  return function(d) {
    var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}
});
