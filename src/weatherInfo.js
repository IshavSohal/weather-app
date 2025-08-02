import { format } from "date-fns";

//TODO: create a map between current weather + time of day and background images + theme colours

// Component for displaying weather data
export const weatherInfo = (data) => {
    console.log("data");
    console.log(data);
    const weatherInfoDiv = document.querySelector("#weather-info");

    // Set background of document based on weather and time of day

    // TODO: Add currentWeatherShort div
    const currentWeatherShort = document.createElement("div");
    currentWeatherShort.setAttribute("class", "currentWeatherShort");

    const locationName = document.createElement("h2");
    locationName.setAttribute("class", "locationName");
    locationName.textContent = data.resolvedAddress;
    currentWeatherShort.appendChild(locationName);

    const currDate = document.createElement("h3");
    const date = new Date(data.currentConditions.datetimeEpoch * 1000);
    currDate.textContent = format(date, "MM/dd/yyyy");
    currentWeatherShort.appendChild(currDate);

    const currTemperature = document.createElement("div");
    currTemperature.textContent = data.temp;
    currentWeatherShort.appendChild(currTemperature);

    const currDescription = document.createElement("div");
    currDescription.textContent = data.currentConditions.description;
    currentWeatherShort.appendChild(currDescription);

    weatherInfoDiv.appendChild(currentWeatherShort);

    // TODO: Add alerts div, if there are any alerts to display
    if (data.alerts.length > 0) {
        const alerts = document.createElement("div");
        alerts.setAttribute("class", "alerts");

        const alertsTitle = document.createElement("h3");
        alertsTitle.textContent = "Alerts";

        for (let alertData in data.alerts) {
            const alert = document.createElement("div");
            alert.setAttribute("class", "alert");

            const alertTitle = document.createElement("h4");
            alertTitle.textContent = alertData.headline;
            alert.appendChild(alertTitle);

            const alertEnd = document.createElement("div");
            alertEnd.textContent = `(${alertData.ends})`;
            alert.appendChild(alertEnd);

            alerts.appendChild(alert);
        }
    }

    // TODO: Add currentWeatherLong div

    // TODO: Add longTermForecast div

    // TODO: Add extra div
};
