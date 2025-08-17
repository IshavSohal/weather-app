import { Moon } from "lunarphase-js";

export const extraDetails = async (currentConditions) => {
    const extraDetails = document.createElement("div");
    extraDetails.setAttribute("class", "extraDetails");

    // Add UV index section
    const uvIndex = document.createElement("div");
    uvIndex.setAttribute("class", "uvIndex");

    const uvIndexTitle = document.createElement("h3");
    uvIndexTitle.textContent = "UV Index";
    uvIndex.appendChild(uvIndexTitle);

    const uvIndexValue = document.createElement("h2");
    uvIndexValue.textContent = currentConditions.uvindex;
    uvIndex.appendChild(uvIndexValue);

    const uvIndexDesc = document.createElement("div");
    uvIndexDesc.textContent =
        currentConditions.uvindex < 3
            ? "Low"
            : currentConditions.uvindex < 6
              ? "Moderate"
              : currentConditions.uvindex < 8
                ? "High"
                : currentConditions.uvindex >= 8
                  ? "Very High"
                  : "Moderate";
    uvIndex.appendChild(uvIndexDesc);

    const uvInfo = document.createElement("div");
    uvInfo.setAttribute("class", "uvInfo");
    const uvLow = document.createElement("span");
    uvLow.textContent = "0";
    uvInfo.appendChild(uvLow);
    const uvRange = document.createElement("div");
    uvRange.setAttribute("class", "uvRange");
    const uvDot = document.createElement("div");
    uvDot.setAttribute("class", "uvDot");
    if (currentConditions.uvindex === 10) {
        uvDot.style.right = "0%";
    } else {
        uvDot.style.left = `${currentConditions.uvindex * 10}%`;
    }
    uvRange.appendChild(uvDot);
    uvInfo.appendChild(uvRange);
    const uvHigh = document.createElement("span");
    uvHigh.textContent = "10";
    uvInfo.appendChild(uvHigh);
    uvIndex.appendChild(uvInfo);

    extraDetails.appendChild(uvIndex);

    // Add humidity section
    const humidity = document.createElement("div");
    humidity.setAttribute("class", "humidity");

    const humidityTitle = document.createElement("h3");
    humidityTitle.textContent = "Humidity";
    humidity.appendChild(humidityTitle);

    const humidityContent = document.createElement("div");
    humidityContent.setAttribute("class", "humidityContent");

    const humidityValue = document.createElement("h2");
    humidityValue.textContent = `${currentConditions.humidity}%`;
    humidityContent.appendChild(humidityValue);

    const dewPoint = document.createElement("div");
    dewPoint.textContent = `Dew point is ${currentConditions.dew}°C right now`;
    humidityContent.appendChild(dewPoint);
    humidity.appendChild(humidityContent);

    extraDetails.appendChild(humidity);

    // Add wind section
    const wind = document.createElement("div");
    wind.setAttribute("class", "wind");

    const windTitle = document.createElement("h3");
    windTitle.textContent = "Wind";
    wind.appendChild(windTitle);

    const windContainer = document.createElement("div");
    windContainer.setAttribute("class", "windContainer");

    const windInfo = document.createElement("div");
    windInfo.setAttribute("class", "windInfo");
    const windSpeed = document.createElement("div");
    windSpeed.textContent = `Wind: ${currentConditions.windspeed}km/hr`;
    windInfo.appendChild(windSpeed);
    const gustSpeed = document.createElement("div");
    gustSpeed.textContent = `Wind: ${currentConditions.windgust}km/hr`;
    windInfo.appendChild(gustSpeed);
    const windDir = document.createElement("div");
    windDir.textContent = `Direction: ${currentConditions.winddir}°`;
    windInfo.appendChild(windDir);
    windContainer.appendChild(windInfo);

    const windCompass = document.createElement("div");
    windCompass.setAttribute("class", "windCompass");
    const compassImg = document.createElement("img");
    compassImg.setAttribute("src", "https://cdn.onlinewebfonts.com/svg/img_467023.png");
    compassImg.setAttribute("class", "compass-circle");
    windCompass.appendChild(compassImg);
    const compassArrow = document.createElement("div");
    compassArrow.setAttribute("class", "arrow");
    compassArrow.style.transform = `rotate(${currentConditions.winddir}deg)`; // 180 + Degree amount
    windCompass.appendChild(compassArrow);
    windContainer.appendChild(windCompass);

    wind.appendChild(windContainer);

    extraDetails.appendChild(wind);

    // Add visibility section
    const visibility = document.createElement("div");
    visibility.setAttribute("class", "visibility");

    const visibilityTitle = document.createElement("h3");
    visibilityTitle.textContent = "Visibility";
    visibility.appendChild(visibilityTitle);

    const visibilityContent = document.createElement("div");
    visibilityContent.setAttribute("class", "visibilityContent");

    const visiblityValue = document.createElement("h2");
    visiblityValue.textContent = `${currentConditions.visibility}km`;
    visibilityContent.appendChild(visiblityValue);

    const visibilityDesc = document.createElement("div");
    visibilityDesc.textContent =
        currentConditions.visibility > 20
            ? "Perfectly clear view"
            : currentConditions.visibility > 10
              ? "Clear view"
              : "Poor visibility";
    visibilityContent.appendChild(visibilityDesc);
    visibility.appendChild(visibilityContent);

    extraDetails.appendChild(visibility);

    // Add air pressure section
    const airPressure = document.createElement("div");
    airPressure.setAttribute("class", "airPressure");

    const airPressureTitle = document.createElement("h3");
    airPressureTitle.textContent = "Air Pressure";
    airPressure.appendChild(airPressureTitle);

    const airPressureValue = document.createElement("h2");
    airPressureValue.textContent = `${currentConditions.pressure} hPa`;
    airPressure.appendChild(airPressureValue);

    extraDetails.appendChild(airPressure);

    // Add moon cycle section
    const moonCycle = document.createElement("div");
    moonCycle.setAttribute("class", "moonCycle");

    const moonCycleTitle = document.createElement("h3");
    moonCycleTitle.textContent = "Moon Cycle";
    moonCycle.appendChild(moonCycleTitle);

    const moonCycleContainer = document.createElement("div");
    moonCycleContainer.setAttribute("class", "moonCycleContainer");

    const moonCycleImg = document.createElement("h2");
    moonCycleImg.textContent = Moon.lunarPhaseEmoji();
    moonCycleImg.style.fontSize = "60px";
    moonCycleContainer.appendChild(moonCycleImg);

    const moonCycleDesc = document.createElement("div");
    moonCycleDesc.textContent = Moon.lunarPhase();
    moonCycleContainer.appendChild(moonCycleDesc);
    moonCycle.appendChild(moonCycleContainer);

    extraDetails.appendChild(moonCycle);

    // Add sunrise/sunset section
    const sunRiseSet = document.createElement("div");
    sunRiseSet.setAttribute("class", "sunRiseSet");

    const sunRiseSetTitle = document.createElement("h3");
    sunRiseSetTitle.textContent = "Sunrise and sunset";
    sunRiseSet.appendChild(sunRiseSetTitle);

    const sunriseContainer = document.createElement("div");
    sunriseContainer.setAttribute("class", "sunrise");
    const sunriseImg = document.createElement("img");
    const sunriseSvg = await import(`../icons/sunrise.svg`);
    sunriseImg.src = sunriseSvg.default;
    sunriseContainer.appendChild(sunriseImg);
    const sunriseTimeDiv = document.createElement("h3");
    const sunriseTimeArray = currentConditions.sunrise.split(":");
    sunriseTimeDiv.textContent = `${sunriseTimeArray[0].slice(1)}:${sunriseTimeArray[1]} AM`; // Assuming that sunrise is before 10AM
    sunriseContainer.appendChild(sunriseTimeDiv);
    sunRiseSet.appendChild(sunriseContainer);

    const sunsetContainer = document.createElement("div");
    sunsetContainer.setAttribute("class", "sunset");
    const sunsetImg = document.createElement("img");
    const sunsetSvg = await import(`../icons/sunset.svg`);
    sunsetImg.src = sunsetSvg.default;
    sunsetContainer.appendChild(sunsetImg);
    const sunsetTimeDiv = document.createElement("h3");
    const sunsetTimeArray = currentConditions.sunset.split(":");
    sunsetTimeDiv.textContent = `${sunsetTimeArray[0] - 12}:${sunsetTimeArray[1]} PM`; // Assuming sunset is between 1pm and 11:59pm (inclusive)
    sunsetContainer.appendChild(sunsetTimeDiv);
    sunRiseSet.appendChild(sunsetContainer);

    extraDetails.appendChild(sunRiseSet);

    return extraDetails;
};
