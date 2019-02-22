let margin = 30, width = 1000, height = 500, rValues = [2,15];
let circles, xScale, yScale, xAxis, yAxis;

let svg = d3.select('#chart')
    .append('svg')
    .attr('width', width + 'px')
    .attr('height', height + 'px');


d3.json('/pres_sim.json').then(function(data){
        console.log(data['data']);

        // let matrix = [];
        // let nodes = data['data'].nodes;
        // let total_items = nodes.length;

    // Assign colors to the parties
    // let party = {
    //     'Unaffiliated': 'grey',
    //     'Federalist': 'black',
    //     'Democratic-Republican': '#27c514', // green
    //     'Democratic': 'blue',
    //     'Whig': '#ffe761', // yellow
    //     'Republican': 'red'
    // }


    xScale = d3.scaleLinear()
                .domain([1790, 2019]) // Input values to scale
                .range([margin + 15, width - margin - 15]) // Range of scale
                ;

    yScale = d3.scaleLinear()
                .domain([0,1]) // Input values to scale
                .range([margin + 15, height-margin-15]) // Range of scale
                ;

        circles = svg.selectAll('.dot')
            .data(data['data'])
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx',10)
            .attr('cy',10)
            .attr('r',10)
            .attr('fill', 'green');


        // Create the x and y axis
        xAxis = d3.axisBottom(xScale)
                    .tickValues([new Date(1790), new Date(2019)]);

        yAxis = d3.axisLeft(yScale)
                    .tickValues([0,1]);


        // Add the x and y axis to the svg element and assign them a class
        xAxisG = svg.append('g')
                    .attr('id', 'xAxis')
                    .attr('class', 'axis');

        yAxisG = svg.append('g')
                    .attr('id', 'yAxis')
                    .attr('class', 'axis');

        // Put the x and y axis on the screen
        xAxisG.call(xAxis)
                .attr('transform', 'translate(0,' + (height-margin)+ ')') // First number is x axis move, second number is y axis move
                ;

        yAxisG.call(yAxis)
                .attr('transform', 'translate(30,0)') // First number is x axis move, second number is y axis move
                ;
    });














