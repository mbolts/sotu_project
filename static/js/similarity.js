
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

const party = {
    'Unaffiliated': 'grey',
    'Federalist': 'black',
    'Democratic-Republican': '#27c514', // green
    'Democratic': 'blue',
    'Whig': '#e8ce3b', // yellow
    'Republican': 'red'
};


d3.csv('/sim_matrix.csv').then(function(data){
    console.log(data); 

    const margin = { top: 175, right: 10, bottom: 10, left: 175 },
          gridSize = 18,
          number_of_pres = 44,
          width = gridSize * number_of_pres,
          height = gridSize * number_of_pres,          
          legendElementWidth = gridSize * 2;
          
        
    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right + 'px')
        .attr('height', height + margin.top + margin.bottom + 'px')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    const pres1LablesGroup = svg.append('g');

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

    const pres2LablesGroup = svg.append('g');

    const president2Labels = pres2LablesGroup.selectAll(".president2Label")
        .data(presidents)
        .enter()
        .append("text")
            .text(d => d)
            .attr("x", 3)
            .attr("y", (d, i) => i * gridSize + 5)
            .style("text-anchor", "left")
            .attr("transform", "translate(" + gridSize / 2 + ", 0), rotate(-90)")
            .attr("class", "president2Label mono axis");

    const numFormat = d3.format('r');


    const colorScale = d3.scaleSequential(d3.interpolateYlGnBu)
                        .domain([0.93, 1]);


    const simGroup = svg.append('g');

    const cards = simGroup.selectAll(".similarity")
        .data(data)
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
            html = `
                   ${presidents[d.pres_1 - 1]}, ${d.pres_1_party} <br>
                   ${presidents[d.pres_2 - 1]}, ${d.pres_2_party} <br>
                   Similarity: ${d.sim}
                   `;
            d3.select('#tooltip')
                .style('left', d3.event.pageX - 100 + 'px')
                .style('top', d3.event.pageY - 140 + 'px')
                .html(html)
                .style('opacity', 0.85);
          })
        .on('mouseout', function(d){
            d3.select('#tooltip')
              .style('opacity', 0);
          })
        .on('click', function(d){
          d3.select('.comparison .pres_1_name')
            .text(presidents[d.pres_1 - 1])
            .style('background-color', party[d.pres_1_party])
            .style('color', 'white');
          d3.select('.comparison .of')
            .text('of');
          d3.select('.comparison .and')
            .text('and');            
          d3.select('.comparison .pres_2_name')
            .text(presidents[d.pres_2 - 1])
            .style('background-color', party[d.pres_2_party])
            .style('color', 'white');
          d3.select(".info_zone .pres_similarity")
            .text(d.sim);
          d3.select(".info_zone")
            .style('display', 'inherit');
        });



        });















