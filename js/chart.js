// Gotham Progress Chart with Dynamic Data
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    
    // Load saved chart data or initialize
    const savedChartData = JSON.parse(localStorage.getItem('gothamFitChartData')) || {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        weightData: [185, 182, 178, 175, 173, 170],
        muscleData: [32, 33, 34, 35, 36, 37]
    };
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: savedChartData.labels,
            datasets: [
                {
                    label: 'Weight (lbs)',
                    data: savedChartData.weightData,
                    borderColor: '#f0c808',
                    backgroundColor: 'rgba(240, 200, 8, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointStyle: 'rectRot',
                    pointBackgroundColor: '#000',
                    pointBorderColor: '#f0c808',
                    pointBorderWidth: 2
                },
                {
                    label: 'Muscle Mass (%)',
                    data: savedChartData.muscleData,
                    borderColor: '#00a8e8',
                    backgroundColor: 'rgba(0, 168, 232, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointStyle: 'circle',
                    pointBackgroundColor: '#000',
                    pointBorderColor: '#00a8e8',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#e8e8e8',
                        font: {
                            family: 'Barlow',
                            weight: '600'
                        },
                        boxWidth: 12,
                        padding: 20
                    },
                    onClick: (e) => e.stopPropagation() // Disable default click behavior
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 26, 0.9)',
                    titleColor: '#f0c808',
                    bodyColor: '#e8e8e8',
                    borderColor: '#333',
                    borderWidth: 1,
                    padding: 12,
                    usePointStyle: true
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a8a8a8'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a8a8a8'
                    }
                }
            },
            onClick: (e) => addNewDataPoint(chart, e)
        }
    });
    
    // Save chart to localStorage when window closes
    window.addEventListener('beforeunload', () => {
        const chartData = {
            labels: chart.data.labels,
            weightData: chart.data.datasets[0].data,
            muscleData: chart.data.datasets[1].data
        };
        localStorage.setItem('gothamFitChartData', JSON.stringify(chartData));
    });
});

function addNewDataPoint(chart, event) {
    // Only add if clicked near the chart area
    const points = chart.getElementsAtEventForMode(event, 'nearest', { intersect: false }, true);
    if (points.length === 0) return;
    
    // Get current month
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const currentMonth = months[now.getMonth()];
    
    // Don't add if we already have this month
    if (chart.data.labels.includes(currentMonth)) return;
    
    // Add new data point (simulated progression)
    const lastWeight = chart.data.datasets[0].data.slice(-1)[0];
    const lastMuscle = chart.data.datasets[1].data.slice(-1)[0];
    
    chart.data.labels.push(currentMonth);
    chart.data.datasets[0].data.push(lastWeight - 2); // Weight decreases
    chart.data.datasets[1].data.push(lastMuscle + 0.5); // Muscle increases
    
    chart.update();
}
