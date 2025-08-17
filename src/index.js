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
        console.log("");
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

    console.log("raw data");
    console.log(data);

    // Store the required data in weatherData
    weatherInfo(weatherData);

    // console.log(data);
    // console.log("Current conditions:");
    // console.log("Day");
    // console.log(data.currentConditions.datetime);
    // console.log("Conditions");
    // console.log(data.currentConditions.conditions);
    // console.log("Current Temp");
    // console.log(data.currentConditions.feelslike);

    // data.days.forEach((day) => {
    //     console.log(" ");
    //     console.log("Day");
    //     console.log(day.datetime);
    //     console.log("Description");
    //     console.log(day.description);
    //     console.log("Max temp");
    //     console.log(day.feelslikemax);
    //     console.log("Min temp");
    //     console.log(day.feelslikemin);
    //     console.log("Sunrise");
    //     console.log(day.sunrise);
    //     console.log("Sunset");
    //     console.log(day.sunset);
    // });
};

// getWeatherData("Brampton");
