        let margin = 30, width = 1000, height = 500, rValues = [2,15];
        let circles, xScale, yScale, xAxis, yAxis;

        let svg = d3.select('#chart')
            .append('svg')
            .attr('width', width + 'px')
            .attr('height', height + 'px');


    d3.json('/word_counts.json').then(function(data){
        console.log(data);

        circles = svg.selectAll('.dot')
            .data(data['data'])
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx',100)
            .attr('cy',100)
            .attr('r',10)
            .style('opacity', 1);
    });