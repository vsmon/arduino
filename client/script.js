/* import axios from 'axios' */


function myFunction(){
    setInterval(postData, 100)
}

async function postData(){
    const temperatura = Math.floor(Math.random() * 100)
    const result = await axios({
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        url: 'http://localhost:3000/temperatura',
        data: {
            temperatura,
        }
    })

    const getTemp = await axios.get('http://localhost:3000/temperatura')

    document.getElementById('texto').innerHTML = `TEMP: ${getTemp.data[getTemp.data.length - 1]} ºC`    

    myChart.data.labels.push(getTemp.data[getTemp.data.length - 1] + 'ºC')
    myChart.data.datasets.map(item => item.data.push(getTemp.data[getTemp.data.length - 1]))
    myChart.update()
}


        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['TEMP'],
                datasets: [{
                    label: 'Temperatura',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',                        
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        
myFunction()