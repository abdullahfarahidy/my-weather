/* Global Variables */
const generate = document.getElementById("generate");
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const apiKey = "&appid=08f9450fa5833be14086c68939a49232&units=imperial";
const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";

//Get the date
let d = new Date();
let newdate = d.toString();

// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  // get user input values
  const newZip = zip.value;
  const newcontent = feelings.value;
  getWeather(baseURI, newZip, apiKey)
    .then(function (userData) {
      // add data to POST request
      postData('/add', { date: newdate, temp: userData.main.temp, newcontent })
    }).then(function (newData) {
      // call updateUI to update browser content
      updateUI()
    })
}

/* Function to GET Web API Data*/
const getWeather = async (baseURI, newZip, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURI + newZip + apiKey);
  try {
    // userData equals to the result of fetch function
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.newcontent
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};

const divs = document.querySelectorAll('div');

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    // show icons on the page
   divs.forEach(div => div.style.opacity = '1');
    // update new entry values
    document.getElementById('date').innerHTML =  "Date : "+ allData.date;
    document.getElementById('temp').innerHTML =  "Temperature: " + allData.temp;
    document.getElementById('content').innerHTML =  "it is really: " + allData.content;
  }
  catch (error) {
    console.log("error", error);
  }
};