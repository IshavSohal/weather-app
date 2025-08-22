import { weatherInfo } from "./weatherInfo";
import "./styles.css";

const API_KEY = "G35A7KUSNGHMNNDQGXVDVNWBH"; // free tier, nice try lol
const dataUnits = "metric";
const weatherData = {};

const submitButton = document.querySelector("#submit");
const locationInput = document.querySelector("#location");

submitButton.addEventListener("click", () => {
    if (locationInput.value) {
        getWeatherData(locationInput.value);
        locationInput.value = "";
    }
});

const getWeatherData = async (location) => {
    try {
        const reqUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${dataUnits}&key=${API_KEY}&contentType=json`;
        const res = await fetch(reqUrl);
        const resJson = await res.json();
        processWeatherData(resJson);
    } catch (error) {
        console.error(error);
    }
};

const processWeatherData = (data) => {
    weatherData.currentConditions = { ...data.currentConditions, description: data.description };
    weatherData.days = data.days;
    weatherData.address = data.address;
    weatherData.timezone = data.timezone;
    weatherData.alerts = data.alerts;
    weatherData.resolvedAddress = data.resolvedAddress;
    weatherInfo(weatherData);
};

getWeatherData("Toronto");
