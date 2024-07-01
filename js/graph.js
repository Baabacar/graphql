var options = {
    series: [],  // Placeholder data, will be updated with actual data
    chart: {
        height: 300,
        type: 'radialBar',
        fontFamily: 'Exo 2, sans serif'
    },
    plotOptions: {
        radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
                margin: 5,
                size: '30%',
                background: 'transparent',
                image: undefined,
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    show: false,
                }
            },
            barLabels: {
                enabled: true,
                useSeriesColors: true,
                margin: 8,
                fontSize: '16px',
                formatter: function (seriesName, opts) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                },
            },
        }
    },
    colors: ['#38435c', '#000000', '#38435c', '#000000'],
    labels: [],  // Placeholder labels, will be updated with actual data
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                show: false
            }
        }
    }]
};

function returnChart(skillNames = [], skillAmounts = []) {
    options.series = skillAmounts;
    options.labels = skillNames;

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    return chart;
}

export { returnChart };
