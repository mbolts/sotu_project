async function getCsv(url) {
  return await d3.csv(url)
    .then(({ name, date, total_1, total_2 }) => {
      return {name, date: date * 1000, value: +total_1 + +total_2};
    });
}


  const data = getCsv("https://gist.githubusercontent.com/chrtze/c74efb46cadb6a908bbbf5227934bfea/raw/c32d94689dd432609c55d1758d8e69c59f94f802/traffic_weekly.csv");

  const dates = d3.nest()
      .key(d => d.date)
    .entries(data)
    .map(d => new Date(+d.key))
    .sort(d3.ascending);

  const values = d3.nest()
      .key(d => d.name)
      .key(d => d.date)
      .rollup(v => v[0].value)
    .map(data);

 
   const series = values.entries().map(({key, value}) => ({
      name: key,
      values: dates.map(d => value.get(+d))
    }));

const overlap = 4;
const height = data.series.length * 17;
const width = 800;
const margin = ({top: 40, right: 20, bottom: 30, left: 120});
  const svg = d3.select('#chart').svg(800, height);

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
      .attr("fill", "#ddd")
      .attr("d", d => area(d.values));

  group.append("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("d", d => line(d.values));



x = d3.scaleTime()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])

y = d3.scalePoint()
    .domain(data.series.map(d => d.name))
    .range([margin.top, height - margin.bottom])

z = d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([0, -overlap * y.step()])

xAxis = g => g
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x)
      .ticks(width / 80)
      .tickSizeOuter(0))

yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(0).tickPadding(4))
    .call(g => g.select(".domain").remove())

area = d3.area()
    .curve(d3.curveBasis)
    .defined(d => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y0(0)
    .y1(d => z(d))

line = area.lineY1()


