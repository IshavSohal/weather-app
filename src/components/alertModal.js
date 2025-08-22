export const alertModal = (alertData) => {
    const modal = document.querySelector("dialog.alertModal");
    modal.innerHTML = "";

    const alertTitle = document.createElement("h1");
    alertTitle.textContent = "Alert";
    modal.appendChild(alertTitle);

    const alertType = document.createElement("h2");
    alertType.textContent = alertData.headline[0].toUpperCase() + alertData.headline.slice(1);
    modal.appendChild(alertType);

    const alertDescription = document.createElement("div");
    alertDescription.textContent = alertData.description;
    modal.appendChild(alertDescription);

    const closeButtonContainer = document.createElement("div");
    closeButtonContainer.setAttribute("class", "closeButtonContainer");
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
        modal.close();
    });
    closeButtonContainer.appendChild(closeButton);
    modal.appendChild(closeButtonContainer);

    return modal;
};
