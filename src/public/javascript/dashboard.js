ventasSemanalesGrafica()

async function ventasSemanalesGrafica() {
  const response = await axios.get('http://localhost:4000/db/obtenerVentasS');
  console.log(response.data)

  const barrasLabel = response.data.map(item => new Date(item.fecha).toLocaleDateString());
  const barrasDatos = response.data.map(item => item.total);

  const barChartCtx = document.getElementById('barChart').getContext('2d');
  new Chart(barChartCtx, {
    type: 'bar',
    data: {
      labels: barrasLabel,
      datasets: [{
        label: 'Ventas',
        data: barrasDatos,
        backgroundColor: '#0d6efd',
      }]
    },
    options: {
      responsive: true,
    }
  });
}