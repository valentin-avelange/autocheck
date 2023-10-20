var darkMode = true;

document.getElementById("lightMode").addEventListener("click", () => {

    if (darkMode) {
        const iconElement = lightMode.querySelector("i");
        iconElement.className = "fa-regular fa-moon";
        iconElement.style.color = "#181818";
        darkMode = false;

        document.body.style.backgroundColor = "#ffffff";
        document.getElementById("lds-dual-ring").style.borderColor = "#181818 transparent #181818 transparent";

    } else {
        const iconElement = lightMode.querySelector("i");
        iconElement.className = "fa-regular fa-sun";
        iconElement.style.color = "#ffffff";
        darkMode = true;

        document.body.style.backgroundColor = "#181818";
        document.getElementById("lds-dual-ring").style.borderColor = "#fff transparent #fff transparent";

    }
});