const fullNameInput = document.getElementById("profile-fullName");
const emailInput = document.getElementById("profile-email");
const phoneInput = document.getElementById("profile-phone");

const countryInput = document.getElementById("profile-country");
const addressInput = document.getElementById("profile-address");
const passwordInput = document.getElementById("profile-password");

const controlButton = document.getElementById("controlButton");

let savedFullName = "";
let savedEmail = "";
let savedPhone = "";
let savedCountry = "";
let savedAddress = "";
let savedPassword = "";

function toggleInputs() {
    if (fullNameInput.disabled) {
        fullNameInput.disabled = false;
        emailInput.disabled = false;
        phoneInput.disabled = false;
        countryInput.disabled = false;
        addressInput.disabled = false;
        passwordInput.disabled = false;
        controlButton.innerText = "Сохранить";
    } else {
        fullNameInput.disabled = true;
        emailInput.disabled = true;
        phoneInput.disabled = true;
        countryInput.disabled = true;
        addressInput.disabled = true;
        passwordInput.disabled = true;
        savedFullName = fullNameInput.value;
        savedEmail = emailInput.value;
        savedPhone = phoneInput.value;
        savedCountry = countryInput.value;
        savedAddress = addressInput.value;
        savedPassword = passwordInput.value;

        controlButton.innerText = "Редактировать профиль";

        showPopup();
    }
}

//Модальное окно позже отнести в утил
function showPopup() {
    const popup = document.querySelector(".popup");
    if (popup) {
        popup.style.display = "block";
        setTimeout(function () {
            popup.style.display = "none";
        }, 2000); // Скрыть через 2 секунды
    }
}

// Сохранение текста при обновлении страницы
window.addEventListener("beforeunload", function (e) {
    if (!fullNameInput.disabled) {
        localStorage.setItem("savedFullName", savedFullName);
        localStorage.setItem("savedEmail", savedEmail);
        localStorage.setItem("savedPhone", savedPhone);
        localStorage.setItem("savedCountry", savedCountry);
        localStorage.setItem("savedAddress", savedAddress);
        localStorage.setItem("savedPassword", savedPassword);
    }
});

window.addEventListener("load", function (e) {
    const savedFullNameText = localStorage.getItem("savedFullName");
    if (savedFullNameText) {
        fullNameInput.value = savedFullNameText;
    }

    const savedEmailText = localStorage.getItem("savedEmail");
    if (savedEmailText) {
        emailInput.value = savedEmailText;
    }

    const savedPhoneText = localStorage.getItem("savedPhone");
    if (savedPhoneText) {
        phoneInput.value = savedPhoneText;
    }

    const savedCountryText = localStorage.getItem("savedCountry");
    if (savedCountryText) {
        countryInput.value = savedCountryText;
    }

    const savedAddressText = localStorage.getItem("savedAddress");
    if (savedAddressText) {
        addressInput.value = savedAddressText;
    }

    const savedPasswordText = localStorage.getItem("savedPassword");
    if (savedPasswordText) {
        passwordInput.value = savedPasswordText;
    }
});
