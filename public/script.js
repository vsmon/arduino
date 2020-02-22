async function postData() {
  try {
    const result = await axios({
      headers: { "Content-Type": "application/json" },
      method: "POST",
      url: "/switch",
      data: {
        command: "on/off"
      }
    });
  } catch (error) {
    console.log(error);
  }
}
let temperature = 0;
let humidity = 0;
async function getData() {
  try {
    const response = await axios.get("/temperature");
    const { data } = response;

    const pressureHpa = data.pressure / 100;
    const statusLed = data.status_led ? "ON" : "OFF";

    temperature = data.temperature.toFixed(2);
    humidity = data.humidity.toFixed(2);
    pressure = pressureHpa.toFixed(2);
    altitude = data.altitude.toFixed(2);

    document.getElementById(
      "temperature"
    ).innerText = `Temperature: ${temperature} ºC`;

    document.getElementById("humidity").innerText = `Humidity: ${humidity} %`;

    document.getElementById("pressure").innerText = `Pressure: ${pressure} hPa`;

    document.getElementById(
      "altitude"
    ).innerText = `Altitude: ${altitude} m (Metros)`;

    document.getElementById("led").innerText = `LED: ${statusLed}`;

    /* myChart.data.labels.push(
      response.data.temperature + "ºC",
      response.data.humidity + "%"
    );
    myChart.data.datasets.map(item => {
      if (item.label === "Temperature") {
        item.data.push(response.data.temperature);
      } else {
        item.data.push(response.data.humidity);
      }
    });

    myChart.update(); */
  } catch (error) {
    console.log(error);
  }
}

function repeat() {
  setInterval(getData, 1000);
}
//Grafico do google
google.charts.load("current", { packages: ["gauge"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Label", "Value"],
    ["Temperature", 80],
    ["Humidity", 55],
    ["Pressure", 55],
    ["Altitude", 55]
  ]);

  var options = {
    width: 380,
    height: 520,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5
  };

  var chart = new google.visualization.Gauge(
    document.getElementById("chart_div")
  );

  data = data;
  chart.draw(data, options);

  setInterval(function() {
    data.setValue(0, 1, temperature);
    chart.draw(data, options);
  }, 1000);
  setInterval(function() {
    data.setValue(1, 1, humidity);
    chart.draw(data, options);
  }, 1000);
  setInterval(function() {
    data.setValue(2, 1, pressure);
    chart.draw(data, options);
  }, 1000);
  setInterval(function() {
    data.setValue(3, 1, altitude);
    chart.draw(data, options);
  }, 1000);
}

//Grafico do chart js
/* const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["TEMP", "HUM"],
    datasets: [
      {
        label: "Temperature",
        fill: false,
        data: [],
        backgroundColor: ["rgba(255, 99, 132, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 2
      },
      {
        label: "Humidity",
        fill: false,
        data: [],
        backgroundColor: ["rgba(0,0,153,0.2)"],
        borderColor: ["rgba(0,0,153,0.2)"],
        borderWidth: 2
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
}); */

repeat();
