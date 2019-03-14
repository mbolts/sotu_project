

function transformCSV(data) {

  const word = data.word;
  delete data.word;
  const values = Object.keys(data).sort().map( year => {
    return data[year];
  });
  return {
    name: word,
    values
  };
}

d3.csv("/word_freq.csv", transformCSV).then(function (dataset) {

  const columns = dataset.columns;
  delete dataset.columns;

  const data = {
    series: dataset
  };

  data.dates = columns.slice(1);

  console.log(data);

  height = data.series.length * 20;
  width = height;
  overlap = 1;

  margin = ({top: 125, right: 20, bottom: 30, left: 90});

  const svg = d3.select('#chart')
   .append("div")
   .classed("svg-container-freq", true) //container class to make it responsive
   .append("svg")
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", `0 0 ${width} ${height}`)
   // .style("width", width)
   // .style("height", height)
   .classed("svg-content-responsive", true); 

xMin = d3.extent(data.dates)[0];
xMax = d3.extent(data.dates)[1];

x = d3.scaleTime()
    .domain([new Date(xMin,0,0), new Date(xMax,0,0)])
    .range([margin.left, width - margin.right]);

y = d3.scalePoint()
    .domain(data.series.map(d => d.name))
    .range([margin.top, height - margin.bottom]);

z = d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([0, -overlap * y.step()]);

color = d3.scaleSequential(d3.interpolateYlGnBu)
          .domain([0, d3.max(data.series, d => d3.extent(d.values))[1]]);


console.log(x);

xAxis = g => g
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x)
      .ticks(width / 80)
      .tickSizeOuter(0));

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(0).tickPadding(4))
    .call(g => g.select(".domain").remove());


area = d3.area()
    .curve(d3.curveBasis)
    .defined(d => !isNaN(d))
    .x((d, i) => x(new Date(data.dates[i],0,0)))
    .y0(0)
    .y1(d => z(d))

line = area.lineY1()

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  
  const group = svg.append("g")
    .selectAll("g")
    .data(data.series)
    .join("g")
      .attr("transform", d => `translate(0,${y(d.name) + 1})`);

  group.append("path")
      .attr("fill", d => color(d.values[1]))
      .attr("d", d => area(d.values))
      .style("opacity", 0.6)
      .on('mouseover', function(d){
        d3.select(this).attr('fill', '#adb5bd')
            .style('opacity', 1);

        d3.select('#tooltip')
                .style('left', d3.event.pageX + 20 + 'px')
                .style('top', d3.event.pageY - 40 + 'px')
                .html(d.name)
                .style('opacity', 0.85);
        })
      .on('mouseout', function(d){
        d3.select(this).attr('fill', color(d.values[1]))
            .style('opacity', 0.6);
        d3.select('#tooltip')
                .style('opacity', 0);
      });

  group.append("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", d => line(d.values));

});
