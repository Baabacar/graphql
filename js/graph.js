
var optionsSkills = {
    series: [],
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
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
                },
            },
        }
    },
    colors: ['#38435c', '#000000', '#38435c', '#000000'],
    labels: [],
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                show: false
            }
        }
    }]
};

var optionsProject = {
    series: [],
    chart: {
        height: 300,
        toolbar: false,
        type: 'bar',
        fontFamily: 'Exo 2, sans serif'
    },
    plotOptions: {
        bar: {
            borderRadius: 10,
            dataLabels: {
                position: 'top',
            },
        }
    },
    dataLabels: {
        enabled: true,
        labels: {
            show: true,
            formatter: function (val) {
                let vals = val * 100
                if (vals > 1000000) {
                    return (val / 1000000).toFixed(2) + " MB";
                } else if (vals > 1000) {
                    return (val / 1000).toFixed(2) + " KB";
                }
                return val + "kB";
            }
        },
        offsetY: -20,
        style: {
            fontSize: '12px',
            colors: ["#304758"]
        }
    },
    xaxis: {
        categories: [],
        labels: {
            show: false, // This will hide the x-axis labels
        },
        position: 'top',
        axisBorder: {
            show: true
        },
        axisTicks: {
            show: true
        },
        crosshairs: {
            fill: {
                type: 'gradient',
                gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                }
            }
        },
        tooltip: {
            enabled: true,
        }
    },
    yaxis: {
        axisBorder: {
            show: true
        },
        axisTicks: {
            show: true,
        },
        labels: {
            show: false,
            formatter: function (val) {
                if (val > 1000000) {
                    return (val / 1000000).toFixed(2) + " MB";
                } else if (val > 1000) {
                    return (val / 1000).toFixed(2) + " KB";
                }
                return val + "kB";
            }
        }
    },
};

function returnChart(skillNames = [], skillAmounts = []) {
    optionsSkills.series = skillAmounts;
    optionsSkills.labels = skillNames;

    var chart = new ApexCharts(document.querySelector("#chart"), optionsSkills);
    return chart;
}

function returnChartProject(projectNames = [], projectAmounts = []) {
    optionsProject.series = [{
        name: 'Projects',
        data: projectAmounts,
    }];
    optionsProject.xaxis.categories = projectNames;

    var chart = new ApexCharts(document.querySelector("#chartproject"), optionsProject);
    return chart;
}

// var options = {
//     series: [{
//         name: 'XYZ MOTORS',
//         data: dates
//     }],
//     chart: {
//         type: 'area',
//         stacked: false,
//         height: 350,
//         zoom: {
//             type: 'x',
//             enabled: true,
//             autoScaleYaxis: true
//         },
//         toolbar: {
//             autoSelected: 'zoom'
//         }
//     },
//     dataLabels: {
//         enabled: false
//     },
//     markers: {
//         size: 0,
//     },
//     title: {
//         text: 'Stock Price Movement',
//         align: 'left'
//     },
//     fill: {
//         type: 'gradient',
//         gradient: {
//             shadeIntensity: 1,
//             inverseColors: false,
//             opacityFrom: 0.5,
//             opacityTo: 0,
//             stops: [0, 90, 100]
//         },
//     },
//     yaxis: {
//         labels: {
//             formatter: function (val) {
//                 return (val / 1000000).toFixed(0);
//             },
//         },
//         title: {
//             text: 'Price'
//         },
//     },
//     xaxis: {
//         type: 'datetime',
//     },
//     tooltip: {
//         shared: false,
//         y: {
//             formatter: function (val) {
//                 return (val / 1000000).toFixed(0)
//             }
//         }
//     }
// };

// var chart = new ApexCharts(document.querySelector("#chart"), options);
// chart.render();

export { returnChart, returnChartProject };