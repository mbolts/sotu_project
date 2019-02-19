let margin = 30, width = 1000, height = 500, rValues = [2,15];
let circles, xScale, yScale, xAxis, yAxis;

let svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + 'px')
    .attr('height', height + 'px');


d3.json('/word_freq.json').then(function(data){
// console.log(data);

    yMin = d3.min(data['data'], function(d) { 
            return d.count; 
        });
            
    yMax = d3.max(data['data'], function(d) { 
            return d.count; 
        }); 

    console.log(yMin, yMax);


    xScale = d3.scaleTime()
                .domain([new Date(1790, 0, 0), new Date(2019, 11, 30)]) // Input values to scale
                .range([margin + 0,width - margin]) // Range of scale
                ;

    yScale = d3.scaleLinear()
                .domain([yMax, yMin]) // Input values to scale
                .range([margin + rValues[1], height-margin-rValues[1]]) // Range of scale
                ;


    circles = svg.selectAll('.dot')
        .data(data['data'])
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx',function(d){
            return xScale(new Date(d.first_date));
        })
        .attr('cy',function(d){
            return yScale(d.count);
        })
        .attr('r', 3)
        .style('opacity', 1);
    });