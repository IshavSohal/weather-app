import { format } from "date-fns";
import { alertModal } from "./alertModal";
import { extraDetails } from "./extraDetails";

const sameDay = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

// Component for displaying weather data
export const weatherInfo = async (data) => {
    const date = new Date(data.currentConditions.datetimeEpoch * 1000);

    // Gets current hour based on the timezone of the requested location
    const currHour = data.currentConditions.datetime.split(":")[0];
    const sunriseHour = data.currentConditions.sunrise.split(":")[0];
    const sunsetHour = data.currentConditions.sunset.split(":")[0];
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const daysOfWeekLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weatherInfoDiv = document.querySelector("#weather-info");
    weatherInfoDiv.innerHTML = "";

    const timeOfDay = +currHour >= sunsetHour || +currHour < sunriseHour ? "night" : "day";
    const conditions = data.currentConditions.conditions.toLowerCase().includes("clear")
        ? "clear"
        : data.currentConditions.conditions.toLowerCase().includes("rain")
          ? "rain"
          : data.currentConditions.conditions.toLowerCase().includes("partial")
            ? "partly-cloudy"
            : data.currentConditions.conditions.toLowerCase().includes("cloud") ||
                data.currentConditions.conditions.toLowerCase().includes("overcast")
              ? "cloudy"
              : "clear";

    if (conditions === "rain") {
        const rainImg = await import(`./images/rain.jpg`);
        document.body.style.backgroundImage = `url('${rainImg.default}')`;
    } else {
        const backgroundImg = await import(`./images/${conditions}-${timeOfDay}.jpg`);
        document.body.style.backgroundImage = `url('${backgroundImg.default}')`;
    }

    // Add currentWeatherShort div
    const currentWeatherShort = document.createElement("div");
    currentWeatherShort.setAttribute("class", "currentWeatherShort");

    const locationName = document.createElement("h2");
    locationName.setAttribute("class", "locationName");
    locationName.style.textAlign = "center";
    locationName.textContent = data.resolvedAddress[0].toUpperCase() + data.resolvedAddress.slice(1);
    currentWeatherShort.appendChild(locationName);

    const currDate = document.createElement("h3");

    currDate.textContent = format(date, "MM/dd/yyyy");
    currentWeatherShort.appendChild(currDate);

    const currTemperature = document.createElement("div");
    currTemperature.setAttribute("class", "temperature");
    currTemperature.textContent = `${Math.round(data.currentConditions.temp)}°C`;
    currentWeatherShort.appendChild(currTemperature);

    const currConditions = document.createElement("div");
    currConditions.textContent = data.currentConditions.conditions;
    currentWeatherShort.appendChild(currConditions);

    weatherInfoDiv.appendChild(currentWeatherShort);

    // Add alerts div, if there are any alerts to display
    if (data.alerts.length > 0) {
        const alerts = document.createElement("div");
        alerts.setAttribute("class", "alerts");

        const alertsTitle = document.createElement("h3");
        alertsTitle.textContent = "Alerts";
        alerts.appendChild(alertsTitle);

        for (let i = 0; i < data.alerts.length; i++) {
            const alertData = data.alerts[i];
            const alert = document.createElement("div");
            alert.setAttribute("class", "alert");

            const alertTitle = document.createElement("h4");
            alertTitle.textContent = alertData.headline[0].toUpperCase() + alertData.headline.slice(1);
            alert.appendChild(alertTitle);

            const alertEnd = document.createElement("div");
            const alertEndDate = new Date(alertData.endsEpoch * 1000);
            if (sameDay(date, alertEndDate)) {
                const minutesLeft = alertEndDate.getMinutes() - date.getMinutes();
                const hoursLeft = alertEndDate.getHours() - date.getHours() - (minutesLeft < 0 ? 1 : 0);
                const hoursLeftText = hoursLeft > 0 ? `${hoursLeft} hours and` : "";
                alertEnd.textContent = `Ends in ${hoursLeftText} ${Math.abs(minutesLeft)} minutes`;
            } else {
                alertEnd.textContent = `Ends on ${daysOfWeekLong[alertEndDate.getDay()]}`;
            }
            alert.appendChild(alertEnd);

            alert.addEventListener("click", () => {
                const modal = alertModal(alertData);
                modal.showModal();
            });

            alerts.appendChild(alert);
        }
        weatherInfoDiv.appendChild(alerts);
    }

    // Add currentWeatherLong div
    const currWeatherLong = document.createElement("div");
    currWeatherLong.setAttribute("class", "horizontalDataContainer");

    const currDescription = document.createElement("div");
    currDescription.textContent = data.currentConditions.description;
    currWeatherLong.appendChild(currDescription);

    const hourlyForecast = document.createElement("div");
    hourlyForecast.setAttribute("class", "horizontalData");

    let hoursData = [];

    hoursData.push(...data.days[0].hours.slice(currHour));
    hoursData.push(...data.days[1].hours.slice(0, 24 - hoursData.length));

    for (let i = 0; i < hoursData.length; i++) {
        const hourData = hoursData[i];
        const weatherData = document.createElement("div");
        weatherData.setAttribute("class", "weatherData");

        const timeDiv = document.createElement("div");

        const timeValue = +hourData.datetime.split(":")[0];
        timeDiv.textContent =
            timeValue === 12
                ? `${timeValue}PM`
                : timeValue > 12
                  ? `${timeValue - 12}PM`
                  : timeValue === 0
                    ? `${12}AM`
                    : `${timeValue}AM`;
        weatherData.appendChild(timeDiv);

        const hourIcon = document.createElement("img");
        hourIcon.style.width = "35px";
        hourIcon.style.height = "35px";
        const iconSvg = await import(`./icons/${hourData.icon}.svg`);
        hourIcon.src = iconSvg.default;
        weatherData.appendChild(hourIcon);

        const hourTemperature = document.createElement("div");
        hourTemperature.textContent = `${Math.round(hourData.temp)}°C`;
        weatherData.appendChild(hourTemperature);

        hourlyForecast.appendChild(weatherData);
    }
    currWeatherLong.appendChild(hourlyForecast);

    weatherInfoDiv.appendChild(currWeatherLong);

    // Add longTermForecast div
    const longTermForecastContainer = document.createElement("div");
    longTermForecastContainer.setAttribute("class", "horizontalDataContainer");

    const longTermTitle = document.createElement("h3");
    longTermTitle.textContent = "15 day forecast";
    longTermForecastContainer.appendChild(longTermTitle);

    const longTermForecast = document.createElement("div");
    longTermForecast.setAttribute("class", "horizontalData");
    // longTermForecast.style.gap = "50px";

    for (let i = 0; i < data.days.length; i++) {
        const dayData = data.days[i];
        const dayForecast = document.createElement("div");
        dayForecast.setAttribute("class", "dayForecast");

        const dayOfWeek = document.createElement("div");
        dayOfWeek.textContent = daysOfWeek[new Date(dayData.datetimeEpoch * 1000).getDay()];
        dayForecast.appendChild(dayOfWeek);

        const dayIcon = document.createElement("img");
        dayIcon.style.height = "35px";
        dayIcon.style.width = "35px";
        const iconSvg = await import(`./icons/${dayData.icon}.svg`);
        dayIcon.src = iconSvg.default;
        dayForecast.appendChild(dayIcon);

        const dayLowTemp = document.createElement("div");
        dayLowTemp.textContent = `L: ${Math.round(dayData.tempmin)}°C`;
        dayForecast.appendChild(dayLowTemp);

        const dayHighTemp = document.createElement("div");
        dayHighTemp.textContent = `H: ${Math.round(dayData.tempmax)}°C`;
        dayForecast.appendChild(dayHighTemp);

        longTermForecast.appendChild(dayForecast);
    }
    longTermForecastContainer.appendChild(longTermForecast);
    weatherInfoDiv.appendChild(longTermForecastContainer);

    // Add extra div
    const extra = await extraDetails(data.currentConditions);
    weatherInfoDiv.appendChild(extra);

    document.body.appendChild(weatherInfoDiv);
};
