// Welcome message
window.onload = function () {
    alert("Welcome to Rasi Auto Electrical!");
};

// Business Hours
function showHours() {
    document.getElementById("hours").innerHTML =
    "Monday - Friday: 08:00 - 17:00<br>Saturday: 08:00 - 13:00";
}

// Service Cost Calculator
function calculateCost() {

    let service = document.getElementById("service").value;
    let result = document.getElementById("result");

    let price = 0;

    if (service === "diagnostics") {
        price = 500;
    }
    else if (service === "minor") {
        price = 1200;
    }
    else if (service === "major") {
        price = 2500;
    }

    result.innerHTML = "Estimated Cost: R" + price;
}

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("bookingForm");

    if(form){

        form.addEventListener("submit", function(event){

            event.preventDefault();

            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let carModel = document.getElementById("carModel").value;
            let serviceNeeded = document.getElementById("serviceNeeded").value;
            let message = document.getElementById("message").value;

            if(name === "" || email === "" || carModel === "" || serviceNeeded === ""){
                alert("Please fill in all required fields.");
                return;
            }

    emailjs.send(
    "service_wz2sh89",
    "template_fmkfbgp",
    {
        name: name,
        email: email,
        carModel: carModel,
        serviceNeeded: serviceNeeded,
        message: message
    }
)
.then(function(response) {
    alert("Booking submitted successfully!");
    form.reset();
})
.catch(function(error) {
    alert("Failed to send booking.");
    console.log(error);
});
        });

    }

});