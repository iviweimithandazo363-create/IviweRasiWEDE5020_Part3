// Initialize EmailJS with your Public Key
// ⚠️ REPLACE 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key from your dashboard
emailjs.init("1zJ2AOujobJjnaKeW");

// Welcome message
window.onload = function () {
    showToast("Welcome to Rasi Auto Electrical!", "success");
};

// Toast notification function
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 4000);
}

// Helper to display error messages directly under inputs
function showError(inputElement, message) {
    clearError(inputElement);
    
    // Create error element matching the external CSS rule
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    
    // Insert error message after the input field components
    inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling.nextSibling.nextSibling);
    inputElement.style.borderColor = "#c62828";
}

// Helper to remove error states
function clearError(inputElement) {
    const nextEl = inputElement.nextSibling.nextSibling.nextSibling;
    if (nextEl && nextEl.className === "error-message") {
        nextEl.remove();
    }
    inputElement.style.borderColor = "";
}

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

    if (service === "diagnostics") { price = 500; }
    else if (service === "minor") { price = 1200; }
    else if (service === "major") { price = 2500; }

    result.innerHTML = "Estimated Cost: R" + price;
}

// Form Submission handling
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bookingForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let nameInput = document.getElementById("name");
            let emailInput = document.getElementById("email");
            let carModelInput = document.getElementById("carModel");
            let serviceNeededInput = document.getElementById("serviceNeeded");
            let messageInput = document.getElementById("message");

            let name = nameInput.value.trim();
            let email = emailInput.value.trim();
            let carModel = carModelInput.value.trim();
            let serviceNeeded = serviceNeededInput.value.trim();
            let message = messageInput.value.trim();

            let isValid = true;

            // Clear previous errors
            clearError(nameInput);
            clearError(emailInput);
            clearError(carModelInput);
            clearError(serviceNeededInput);

            // 1. Validate Name
            if (name === "") {
                showError(nameInput, "Name is required.");
                isValid = false;
            }

            // 2. Validate Email
            let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (email === "") {
                showError(emailInput, "Email address is required.");
                isValid = false;
            } else if (!emailPattern.test(email)) {
                showError(emailInput, "Please enter a valid email address.");
                isValid = false;
            }

            // 3. Validate Car Model
            if (carModel === "") {
                showError(carModelInput, "Car model is required.");
                isValid = false;
            }

            // 4. Validate Service
            if (serviceNeeded === "") {
                showError(serviceNeededInput, "Please specify the service you need.");
                isValid = false;
            }

            if (!isValid) {
                showToast("Please correct the errors on the form.", "error");
                return;
            }

            // Send via EmailJS
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
            .then(function (response) {
                showToast("Booking submitted successfully!", "success");
                form.reset();
            })
            .catch(function (error) {
                console.log("EmailJS Error:", error);
                showToast("Failed to send booking. Try again later.", "error");
            });
        });
    }
});