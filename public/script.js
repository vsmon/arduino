async function postData() {
  try {
    const result = await axios({
      headers: { "Content-Type": "application/json" },
      method: "POST",
      url: "http://localhost:3000/switch",
      data: {
        command: "on/off"
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function getData() {
  try {
    const result = await axios.get("http://localhost:3000/temperatura");
    const { data } = result;
    document.getElementById("texto").innerText = `STATUS LED: ${
      data[data.length - 1].status
    }`;
  } catch (error) {
    console.log(error);
  }
}

function repeat() {
  setInterval(getData, 1000);
}

repeat();
