async function fetchData() {
    try {
        const response = await fetch("https://a2zforall.pythonanywhere.com/api/tags");
        const data = await response.json(); 
        
        const years = Object.keys(data).sort(); // Get years: ["2023", "2024", "2025"]
        const tagNames = Object.keys(data[years[0]]); // Get top 10 tag names

        const datasets = tagNames.map(tag => ({
            label: tag,
            data: years.map(year => data[year][tag] || 0), // Get count per year
            borderColor: getRandomColor(),
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.4
        }));

        renderChart(years, datasets);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function getRandomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`; // Generates random colors
}

function renderChart(labels, datasets) {
    const ctx = document.getElementById('tagsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Tag Count'
                    }
                }
            }
        }
    });
}

fetchData();
