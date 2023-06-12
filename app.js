//Packages that will be used
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

//Functions to call my APIs

// -----------------------------------------------------------------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true }));
//Here created our route for URL to page.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/page.html");
});

app.post("/", function (req, res) {
	const cityName = req.body.cityName;
	const stateCode = req.body.stateCode;
	const apiKey = "8aa2656b5846fe952dc95e12ab131259";
	const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&limit=&appid=${apiKey}`;
	console.log(url);
	https.get(url, function (response) {
		response.on("data", (data) => {
			const geoData = JSON.parse(data)[0];
			console.log(geoData);
			const lat = geoData.lat;
			const lon = geoData.lon;
			const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
			https.get(url2, function (response) {
				response.on("data", (data) => {
					const jsondata = JSON.parse(data);
					console.log(jsondata, "<-----------");
					const tempature = jsondata.main.temp;
					const des = jsondata.weather[0].description;
					const icon = jsondata.weather[0].icon;
					const imageURL =
						"http://openweathermap.org/img/wn/" + icon + "@2x.png";
					console.log("Here is the Weather Currently");

					res.write(`
            
          <h1> The Tempature in ${cityName}is ${tempature} degrees</h1>
          <p>The weather description is ${des}</p>
          <img src="${imageURL}">
        `);
				});
			});
		});
	});
});
app.listen(9000);
