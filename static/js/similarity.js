



d3.csv('/sim_matrix.csv').then(function(data){
    console.log(data);
        
    const number_of_pres = 44    

    const margin = { top: 150, right: 40, bottom: 50, left: 140 },
          gridSize = 20,
          width = gridSize * number_of_pres,
          height = gridSize * number_of_pres,          
          legendElementWidth = gridSize*2,
          buckets = 9,
          colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
          presidents = ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison', 'James Monroe', 'John Quincy Adams', 'Andrew Jackson', 'Martin van Buren', 'William Henry Harrison', 'John Tyler', 'James K. Polk', 'Zachary Taylor', 'Millard Fillmore', 'Franklin Pierce', 'James Buchanan', 'Abraham Lincoln', 'Andrew Johnson', 'Ulysses S. Grant', 'Rutherford B. Hayes', 'James A. Garfield', 'Chester A. Arthur', 'Grover Cleveland', 'Benjamin Harrison', 'William McKinley', 'Theodore Roosevelt', 'William Howard Taft', 'Woodrow Wilson', 'Warren G. Harding', 'Calvin Coolidge', 'Herbert Hoover', 'Franklin D. Roosevelt', 'Harry S. Truman', 'Dwight D. Eisenhower', 'John F. Kennedy', 'Lyndon B. Johnson', 'Richard Nixon', 'Gerald Ford', 'Jimmy Carter', 'Ronald Reagan', 'George H. W. Bush', 'Bill Clinton', 'George W. Bush', 'Barack Obama', 'Donald Trump'];
        
    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right + 'px')
        .attr('height', height + margin.top + margin.bottom + 'px')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    const president1Labels = svg.selectAll(".president1Label")
          .data(presidents)
          .enter()
          .append('g')
          .append("text")
            .text(function (d){ 
                return d; })
            .attr("x", 0)
            .attr("y", function (d, i){
                return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d){
                "president1Label mono axis"; });


    const president2Labels = svg.selectAll(".president2Label")
          .data(presidents)
          .enter()
          .append('g')
          .append("text")
            .text(function(d){ 
                return d; })
            .attr("x", 0)
            .attr("y", function (d, i){ 
                return i * gridSize; })
            .style("text-anchor", "left")
            .attr("transform", "translate(" + gridSize / 2 + ", 0), rotate(-90)")
            .attr("class", function(d, i){ 
                return "president2Label mono axis"; });


    // const heatmapChart = function(csvFile) {
    //     d3.csv(csvFile,
    //     function(d) {
    //       return {
    //         pres_1: +d.pres_1,
    //         pres_2: +d.pres_2,
    //         value: +d.sim
    //       };
    //     }).then(
    //     function(data) {
    //         console.log(data);
    const colorScale = d3.scaleSequential(d3.interpolateYlGnBu)
                        .domain([0.93, 1]);
                        // .range();

    const cards = svg.selectAll(".similarity")
              .data(data, function(d){
                return d.pres_1+':'+d.pres_2;});

          // cards.append("title");

          cards.enter().append("rect")
              .attr("x", function(d){
                return (d.pres_2 - 1) * gridSize; })
              .attr("y", function(d){ 
                return (d.pres_1 - 1) * gridSize; })
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "similarity bordered")
              .attr("width", gridSize)
              .attr("height", gridSize)
              .style("fill", function(d){
                return colorScale(d.sim);
              })
              .on('mouseover', function(d){
                // html = 'Similarity: ' + d.sim;
                svg.append('rect')
                    .attr('id', 'tooltip-rect'+d.pres_1+d.pres_2)
                    .attr('x', d.pres_2 * gridSize)
                    .attr('y', d.pres_1 * gridSize)
                    .attr('width', gridSize * 10)
                    .attr('height', gridSize)
                    .attr('fill', 'orange')
                    .style('opacity', .85);
                svg.append('text')
                    .attr('id', 'tooltip'+d.pres_1+d.pres_2)
                    .attr('x', d.pres_2 * gridSize)
                    .attr('y', d.pres_1 * gridSize + gridSize - 2)
                    .text('Similarity: ' + d.sim)
                    .style('opacity', .85)
                    ;

              })
              .on('mouseout', function(d){
                d3.select('#tooltip'+d.pres_1+d.pres_2).remove();
                d3.select('#tooltip-rect'+d.pres_1+d.pres_2).remove();
              });

          // cards.transition().duration(1000)
          //     .style("fill", function(d) { return colorScale(d.value); });

          cards.select("title")
                .text(function(d){ 
                    return d.sim; });
          
          cards.exit().remove();

    const legend = svg.selectAll(".legend")
              .data(data.concat(colorScale.quantiles()), function(d) { return d; });

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height)
            .attr("width", legendElementWidth)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "≥ " + Math.round(d); })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height + gridSize);

          legend.exit().remove();

        });



    // xScale = d3.scaleLinear()
    //             .domain([1, 44]) // Input values to scale
    //             .range([margin + 15, width - margin - 15]) // Range of scale
    //             ;

    // yScale = d3.scaleLinear()
    //             .domain([1,44]) // Input values to scale
    //             .range([margin + 15, height-margin-15]) // Range of scale
    //             ;

    // rScale = d3.scaleLinear()
    //             .domain([.9,1]) // Input values to scale
    //             .range([1, 10]) // Range of scale
    //             ;


    //     circles = svg.selectAll('.dot')
    //         .data(data)
    //         .enter()
    //         .append('circle')
    //         .attr('class', 'dot')
    //         .attr('cx',function(d){
    //             return xScale(d.pres_1);
    //         })
    //         .attr('cy',function(d){
    //             return yScale(d.pres_2);
    //         })
    //         .attr('r',function(d){
    //             return rScale(d.sim);
    //         })
    //         .attr('fill', 'green');
            


    //     // Create the x and y axis
    //     xAxis = d3.axisBottom(xScale)
    //                 .tickValues([1, 44]);

    //     yAxis = d3.axisLeft(yScale)
    //                 .tickValues([1,44]);


    //     // Add the x and y axis to the svg element and assign them a class
    //     xAxisG = svg.append('g')
    //                 .attr('id', 'xAxis')
    //                 .attr('class', 'axis');

    //     yAxisG = svg.append('g')
    //                 .attr('id', 'yAxis')
    //                 .attr('class', 'axis');

    //     // Put the x and y axis on the screen
    //     xAxisG.call(xAxis)
    //             .attr('transform', 'translate(0,' + (height-margin)+ ')') // First number is x axis move, second number is y axis move
    //             ;

    //     yAxisG.call(yAxis)
    //             .attr('transform', 'translate(30,0)') // First number is x axis move, second number is y axis move
    //             ;
    // });














