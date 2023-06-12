const submitBtn = document.querySelector("#submit-btn");
document.addEventListener("click", submitBtn, () => {
	const zipCode = document.getElementById("zipcode");
	const cityName = document.getElementById("city");
	console.log(zipCode);
	console.log(cityName);

	async function sendRequest(cityName, zipCode) {
		const response = await fetch(
			`http://localhost:1000/?cityName=${cityName}&zipCode=${zipCode}`
		);
		const jsonData = await response.json();
		return jsonData;
	}
});

//make a post request that will take a body and send info back
