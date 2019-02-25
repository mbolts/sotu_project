
presidents = ['George Washington', 'John Adams', 'Thomas Jefferson', 
              'James Madison', 'James Monroe', 'John Quincy Adams', 
              'Andrew Jackson', 'Martin van Buren', 'William Henry Harrison', 
              'John Tyler', 'James K. Polk', 'Zachary Taylor', 
              'Millard Fillmore', 'Franklin Pierce', 'James Buchanan', 
              'Abraham Lincoln', 'Andrew Johnson', 'Ulysses S. Grant', 
              'Rutherford B. Hayes', 'James A. Garfield', 'Chester A. Arthur', 
              'Grover Cleveland', 'Benjamin Harrison', 'William McKinley', 
              'Theodore Roosevelt', 'William Howard Taft', 'Woodrow Wilson', 
              'Warren G. Harding', 'Calvin Coolidge', 'Herbert Hoover', 
              'Franklin D. Roosevelt', 'Harry S. Truman', 'Dwight D. Eisenhower', 
              'John F. Kennedy', 'Lyndon B. Johnson', 'Richard Nixon', 
              'Gerald Ford', 'Jimmy Carter', 'Ronald Reagan', 
              'George H. W. Bush', 'Bill Clinton', 'George W. Bush', 
              'Barack Obama', 'Donald Trump'];


d3.csv('/sim_matrix.csv').then(function(data){
    console.log(data); 

    const margin = { top: 150, right: 40, bottom: 50, left: 140 },
          gridSize = 20,
          number_of_pres = 44
          width = gridSize * number_of_pres,
          height = gridSize * number_of_pres,          
          legendElementWidth = gridSize*2;
          
        
    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right + 'px')
        .attr('height', height + margin.top + margin.bottom + 'px')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    const pres1LablesGroup = svg.append('g')

    const president1Labels = pres1LablesGroup.selectAll(".president1Label")
        .data(presidents)
        .enter()
        .append("text")
            .text(d => d)
            .attr("x", 0)
            .attr("y", (d, i) => i * gridSize)
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", "president1Label mono axis");

    const pres2LablesGroup = svg.append('g')

    const president2Labels = pres2LablesGroup.selectAll(".president2Label")
        .data(presidents)
        .enter()
        .append("text")
            .text(d => d)
            .attr("x", 0)
            .attr("y", (d, i) => i * gridSize)
            .style("text-anchor", "left")
            .attr("transform", "translate(" + gridSize / 2 + ", 0), rotate(-90)")
            .attr("class", "president2Label mono axis");

    const numFormat = d3.format('r');


    const colorScale = d3.scaleSequential(d3.interpolateYlGnBu)
                        .domain([0.93, 1]);


    const simGroup = svg.append('g');

    const cards = simGroup.selectAll(".similarity")
        .data(data, d => d.pres_1+':'+d.pres_2)
        .enter()
        .append("rect")
            .attr("x", d => (d.pres_2 - 1) * gridSize)
            .attr("y", d => (d.pres_1 - 1) * gridSize)
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "similarity bordered")
            .attr("width", gridSize)
            .attr("height", gridSize)
            .style("fill", d => colorScale(d.sim))
        .on('mouseover', function(d){
            svg.append('rect')
                .attr('id', 'tooltip-rect'+d.pres_1+d.pres_2)
                .attr('x', d.pres_2 * gridSize)
                .attr('y', d.pres_1 * gridSize)
                .attr('width', gridSize * 7)
                .attr('height', gridSize)
                .attr('fill', 'orange')
                .style('opacity', .85);
            svg.append('text')
                .attr('id', 'tooltip'+d.pres_1+d.pres_2)
                .attr('x', d.pres_2 * gridSize)
                .attr('y', d.pres_1 * gridSize + gridSize - 2)
                .text('Similarity: ' + numFormat(d.sim))
                .style('opacity', .85);
          })
        .on('mouseout', function(d){
            d3.select('#tooltip'+d.pres_1+d.pres_2).remove();
            d3.select('#tooltip-rect'+d.pres_1+d.pres_2).remove();
          });

          // cards.transition().duration(1000)
          //     .style("fill", function(d) { return colorScale(d.value); });

        cards.select("title")
            .text(d => d.sim)
          
        cards.exit().remove();

    const legend = svg.selectAll(".legend")
              .data(data.concat(colorScale), function(d) { return d; });

          legend.append("rect").enter()
              .attr("class", "legend");

          legend
            .attr("x", gridSize)
            .attr("y", height + gridSize)
            .attr("width", gridSize)
            .attr("height", gridSize / 2)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "≥ " + Math.round(d); })
            .attr("x", function(d, i) { return gridSize * i; })
            .attr("y", height + gridSize);

          legend.exit().remove();

        });















