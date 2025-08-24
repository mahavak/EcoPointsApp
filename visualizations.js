// Visualization and Charts for EcoPoints
let weeklyActivityChart = null;
let impactPieChart = null;
let carbonBreakdownChart = null;

// Initialize all charts
function initializeCharts() {
    initWeeklyActivityChart();
    initImpactPieChart();
    animateProgressBars();
}

// Weekly Activity Line Chart
function initWeeklyActivityChart() {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx) return;
    
    const weekDays = currentLanguage === 'en' 
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        : ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
    
    weeklyActivityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weekDays,
            datasets: [{
                label: t('viz.points'),
                data: [65, 78, 90, 81, 56, 95, 88],
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: t('viz.actions'),
                data: [3, 4, 5, 4, 2, 6, 5],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Impact Breakdown Pie Chart
function initImpactPieChart() {
    const ctx = document.getElementById('impactPieChart');
    if (!ctx) return;
    
    const labels = currentLanguage === 'en'
        ? ['Recycling', 'Transport', 'Energy', 'Water', 'Trees']
        : ['Recycling', 'Vervoer', 'Energie', 'Water', 'Bomen'];
    
    impactPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: [300, 250, 180, 120, 150],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)'
                ],
                borderColor: [
                    'rgb(16, 185, 129)',
                    'rgb(59, 130, 246)',
                    'rgb(245, 158, 11)',
                    'rgb(139, 92, 246)',
                    'rgb(236, 72, 153)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} pts (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Animate Progress Bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.1 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Carbon Footprint Calculator
function calculateCarbon() {
    const transport = parseFloat(document.getElementById('calcTransport').value) || 0;
    const electricity = parseFloat(document.getElementById('calcElectricity').value) || 0;
    const gas = parseFloat(document.getElementById('calcGas').value) || 0;
    const waste = parseFloat(document.getElementById('calcWaste').value) || 0;
    
    // Carbon emission factors (kg CO2)
    const factors = {
        transport: 0.12,      // kg CO2 per km (average car)
        electricity: 0.233,    // kg CO2 per kWh
        gas: 1.96,            // kg CO2 per m³
        waste: 0.467          // kg CO2 per kg waste
    };
    
    // Calculate monthly emissions
    const transportCO2 = transport * 22 * factors.transport;  // 22 working days
    const electricityCO2 = electricity * factors.electricity;
    const gasCO2 = gas * factors.gas;
    const wasteCO2 = waste * 4 * factors.waste;  // 4 weeks per month
    
    const totalCO2 = transportCO2 + electricityCO2 + gasCO2 + wasteCO2;
    const averagePersonCO2 = 833;  // Average monthly CO2 per person (10 tons/year)
    
    // Update display
    document.getElementById('carbonTotal').textContent = totalCO2.toFixed(1);
    document.getElementById('calcResult').style.display = 'block';
    
    // Comparison text
    const comparisonEl = document.getElementById('comparisonText');
    const difference = ((totalCO2 / averagePersonCO2 - 1) * 100).toFixed(0);
    
    if (totalCO2 < averagePersonCO2) {
        comparisonEl.textContent = `${Math.abs(difference)}% ${t('calc.belowAverage')}`;
        comparisonEl.style.color = '#10b981';
    } else {
        comparisonEl.textContent = `${difference}% ${t('calc.aboveAverage')}`;
        comparisonEl.style.color = '#ef4444';
    }
    
    // Create breakdown chart
    createCarbonChart(transportCO2, electricityCO2, gasCO2, wasteCO2);
    
    // Smooth scroll to result
    document.getElementById('calcResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Carbon Breakdown Chart
function createCarbonChart(transport, electricity, gas, waste) {
    const ctx = document.getElementById('carbonChart');
    if (!ctx) return;
    
    if (carbonBreakdownChart) {
        carbonBreakdownChart.destroy();
    }
    
    const labels = currentLanguage === 'en'
        ? ['Transport', 'Electricity', 'Gas', 'Waste']
        : ['Vervoer', 'Elektriciteit', 'Gas', 'Afval'];
    
    carbonBreakdownChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'kg CO₂',
                data: [transport, electricity, gas, waste],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(107, 114, 128, 0.8)'
                ],
                borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(245, 158, 11)',
                    'rgb(239, 68, 68)',
                    'rgb(107, 114, 128)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toFixed(1)} kg CO₂`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'kg CO₂ / month'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Update charts when language changes
function updateChartsLanguage() {
    if (weeklyActivityChart) {
        weeklyActivityChart.destroy();
        initWeeklyActivityChart();
    }
    if (impactPieChart) {
        impactPieChart.destroy();
        initImpactPieChart();
    }
    if (carbonBreakdownChart) {
        const transport = carbonBreakdownChart.data.datasets[0].data[0];
        const electricity = carbonBreakdownChart.data.datasets[0].data[1];
        const gas = carbonBreakdownChart.data.datasets[0].data[2];
        const waste = carbonBreakdownChart.data.datasets[0].data[3];
        createCarbonChart(transport, electricity, gas, waste);
    }
}

// Update goal progress with real data
function updateGoalProgress(goalType, current, target) {
    const goalElements = {
        recycling: document.querySelector('.recycling-progress'),
        cycling: document.querySelector('.cycling-progress'),
        energy: document.querySelector('.energy-progress')
    };
    
    const element = goalElements[goalType];
    if (element) {
        const percentage = Math.min((current / target) * 100, 100);
        element.style.width = `${percentage}%`;
        element.querySelector('.progress-text').textContent = `${Math.round(percentage)}%`;
        
        // Update progress text
        const goalItem = element.closest('.goal-item');
        const progressText = goalItem.querySelector('.goal-progress');
        progressText.textContent = `${current}/${target} ${getUnit(goalType)}`;
    }
}

function getUnit(goalType) {
    const units = {
        recycling: 'kg',
        cycling: 'km',
        energy: 'kWh'
    };
    return units[goalType] || '';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initializeCharts();
    }, 500);
});

// Export functions for global use
window.calculateCarbon = calculateCarbon;
window.updateChartsLanguage = updateChartsLanguage;
window.updateGoalProgress = updateGoalProgress;