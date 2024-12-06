// Function to toggle between light and dark themes
document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Switch to Light Theme' : 'Switch to Dark Theme';
 });
 
 // Chart.js code to create an impressions graph
 const ctx = document.getElementById('impressionChart').getContext('2d');
 const impressionChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2024-01-01', '2024-01-02', '2024-01-03'],
        datasets: [{
            label: 'Impressions',
            data: [1000, 1500, 2000], 
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }]
    },
    options: {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
 });