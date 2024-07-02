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

var optionsProgression = {
    series: [],
    chart: {
        toolbar: false,
        height: 260,
        type: 'area'
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        categories: [],
        labels: {
            style: {
                colors: Array(100).fill('white'), // Assurez-vous que toutes les étiquettes sont blanches
                fontSize: '12px', // Ajustez éventuellement la taille de la police
                fontFamily: 'Exo 2, sans serif', // Ajustez éventuellement la famille de polices
                fontWeight: 400, // Ajustez éventuellement le poids de la police
                cssClass: 'custom-xaxis-label' // Ajoutez une classe CSS personnalisée si nécessaire
            }
        }
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy'
        },
        style: {
            fontSize: '12px',
            fontFamily: 'Exo 2, sans serif',
            colors: ['blue'] // Changez ici la couleur du texte de tooltip souhaitée
        },
        onDatasetHover: {
            highlightDataSeries: true, // Activez la mise en évidence de la série de données au survol
        },
    },
    colors: ['#FFFFFF'] // Changez ici la couleur souhaitée du graphique
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

function returnChartProgression(xpData = []) {
    const dates = xpData.map(data => data.date);
    const amounts = xpData.map(data => data.amount);

    optionsProgression.series = [{
        name: 'XP',
        data: amounts
    }];
    optionsProgression.xaxis.categories = dates;

    var chart = new ApexCharts(document.querySelector("#chartProgression"), optionsProgression);
    return chart;
}

export { returnChart, returnChartProject, returnChartProgression };
