/* import axios from 'axios' */

function myFunction() {
  setInterval(postData, 2000);
}

async function postData() {
  /* const temperatura = Math.floor(Math.random() * 100);
  const result = await axios({
    headers: { "Content-Type": "application/json" },
    method: "POST",
    url: "http://localhost:3000/temperature",
    data: {
      temperatura
    }
  }); */

  const response = await axios.get("http://localhost:3000/temperature");
  console.log(response);
  document.getElementById(
    "temperature"
  ).innerHTML = `TEMP: ${response.data.temperature} ºC`;

  myChart.data.labels.push(response.data.temperature + "ºC");
  myChart.data.datasets.map(item => item.data.push(response.data.temperature));
  myChart.update();
}

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["TEMP"],
    datasets: [
      {
        label: "Temperatura",
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});

myFunction();
