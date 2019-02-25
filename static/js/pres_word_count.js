
const configGraph = {
    margin: 30,
    width: 1000,
    height: 500,
};
let circles, xScale, yScale, xAxis, yAxis;

const svg = d3.select('#chart')
    .append('svg')
    .attr('width', configGraph.width + 'px')
    .attr('height', configGraph.height + 'px');



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
    }

    yMin = d3.min(data['data'], d => d.words_per);
            
    yMax = d3.max(data['data'], d => d.words_per);

    xMin = d3.min(data['data'], d => d.first_year);
            
    xMax = d3.max(data['data'], d => d.first_year);

    xScale = d3.scaleLinear()
                .domain([xMin, xMax]) // Input values to scale
                .range([configGraph.margin + 15, 
                configGraph.width - configGraph.margin - 15]) // Range of scale
                ;

    yScale = d3.scaleLinear()
                .domain([yMax, yMin]) // Input values to scale
                .range([configGraph.margin + 15, 
                configGraph.height - configGraph.margin - 15]) // Range of scale
                ;

    circles = svg.selectAll('.dot')
        .data(data['data'])
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.first_year))
        .attr('cy', d => yScale(d.words_per))
        .attr('r',10)
        .attr('fill', d => party[d.party])
        .on('mouseover', function(d){
            html = `
                President: ${d.name} <br>
                Year: ${d.first_year} <br>
                Words: ${d.words_per} <br>
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
                .style('opacity', 0)
        });


    // Create the x and y axis
    xAxis = d3.axisBottom(xScale).tickValues([xMin, xMax]);

    yAxis = d3.axisLeft(yScale).tickValues([yMin, yMax]);


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
        .attr('transform', 'translate(30,0)'); // First number is x axis move, second number is y axis move
});














