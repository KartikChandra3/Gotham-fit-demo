// Gotham Progress Chart
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    
    // Batman skyline data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const weightData = [185, 182, 178, 175, 173, 170];
    const muscleData = [32, 33, 34, 35, 36, 37];
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Weight (lbs)',
                    data: weightData,
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
                    data: muscleData,
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
                    }
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
            }
        }
    });
});
