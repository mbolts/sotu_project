
const configGraph = {
    margin: 50,
    width: 1000,
    height: 500,
};
let circles, xScale, yScale, xAxis, yAxis;


const svg = d3.select('#chart')
   .append("div")
   .classed("svg-container-count", true) //container class to make it responsive
   .append("svg")
   .attr("preserveAspectRatio", "xMinYMin meet")
   .attr("viewBox", "0 0 1000 500")
   .classed("svg-content-responsive", true);

d3.json('/word_counts.json').then(function (data) {
    console.log(data);

    // Assign colors to the parties
    let party = {
        'Unaffiliated': 'grey',
        'Federalist': 'black',
        'Democratic-Republican': '#27c514', // green
        'Democratic': 'blue',
        'Whig': '#ffe761', // yellow
        'Republican': 'red'
    };

    yMin = d3.min(data.data, d => d.words_per);
            
    yMax = d3.max(data.data, d => d.words_per);

    xMin = d3.min(data.data, d => d.first_year);
            
    xMax = d3.max(data.data, d => d.first_year);

    console.log(xMax, xMin);

    xScale = d3.scaleTime()
               .domain([new Date(xMin, 0, 0), new Date(xMax, 0, 0)])
               .range([configGraph.margin + 15, 
                configGraph.width - configGraph.margin - 15]) // Range of scale
                ;

    yScale = d3.scaleLinear()
                .domain([yMax, yMin]) // Input values to scale
                .range([configGraph.margin + 15, 
                configGraph.height - configGraph.margin - 15]) // Range of scale
                ;

    circles = svg.selectAll('.counts')
        .data(data.data)
        .enter()
        .append('circle')
        .attr('class', 'counts')
        .attr('cx', d => xScale(new Date(d.first_year, 0, 0)))
        .attr('cy', d => yScale(d.words_per))
        .attr('r',10)
        .attr('fill', d => party[d.party])
        .on('mouseover', function(d){
            html = `
                President: ${d.name} <br>
                Year: ${d.first_year} <br>
                Average Words: ${d3.format(".0f")(d.words_per)} <br>
                Total Words: ${d.total}
            `;
            d3.select('#tooltip')
                .style('left', d3.event.pageX - 100 + 'px')
                .style('top', d3.event.pageY - 140 + 'px')
                .html(html)
                .style('opacity', 0.85);
        })

        .on('mouseout', function(){
            d3.select('#tooltip')
                .style('left', '-1000px')
                .style('opacity', 0);
        });

    format = d3.timeFormat("%Y");

    // Create the x and y axis
    xAxis = d3.axisBottom(xScale)
              .ticks(xMax / 100);


    yAxis = d3.axisLeft(yScale);


    // Add the x and y axis to the svg element and assign them a class
    xAxisG = svg.append('g')
        .attr('id', 'xAxis')
        .attr('class', 'axis');

    yAxisG = svg.append('g')
        .attr('id', 'yAxis')
        .attr('class', 'axis');

    // Put the x and y axis on the screen
    xAxisG.call(xAxis)
        .attr('transform', `translate(0,${configGraph.height - configGraph.margin})`); // First number is x axis move, second number is y axis move

    yAxisG.call(yAxis)
        .attr('transform', 'translate(50,0)'); // First number is x axis move, second number is y axis move
});














