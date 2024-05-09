// Popup "Request a Call Back" form
document.addEventListener("DOMContentLoaded", function() {
    // Get the popup form element
    var popupForm = document.getElementById("popup-form");

    // Get the "Request a Call Back" link
    var requestCallLink = document.querySelector(".request-call a");

    // Get the close button inside the popup form
    var closeButton = document.getElementById("close-popup");

    // Function to toggle the visibility of the popup form
    function togglePopupForm() {
        popupForm.style.display = (popupForm.style.display === "block") ? "none" : "block";
    }

    // Event listener for the "Request a Call Back" link
    requestCallLink.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default link behavior
        togglePopupForm(); // Toggle the visibility of the popup form
    });

    // Event listener for the close button inside the popup form
    closeButton.addEventListener("click", function() {
        togglePopupForm(); // Toggle the visibility of the popup form
    });

    // Submit form handling
    var callBackForm = document.getElementById("call-back-form");
    callBackForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission
        // You can handle form submission here, like sending data to the server
        // For demonstration purposes, you can simply log the form data
        console.log("Form submitted!");
        console.log("Customer Type:", callBackForm['customer-type'].value);
        console.log("First Name:", callBackForm['first-name'].value);
        console.log("Last Name:", callBackForm['last-name'].value);
        console.log("Email:", callBackForm['email'].value);
        console.log("Phone Number:", callBackForm['phone'].value);
        // Close the popup form after submission
        togglePopupForm();
    });
});
// {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
// Blus popup form
document.addEventListener("DOMContentLoaded", function() {
    // Get the blurred background element
    var blurredBackground = document.querySelector(".blurred-background");

    // Function to toggle the visibility of the blurred background
    function toggleBlurredBackground() {
        blurredBackground.classList.toggle("active");
    }

    // Get the "Request a Call Back" link
    var requestCallLink = document.querySelector(".request-call a");

    // Get the close button inside the popup form
    var closeButton = document.getElementById("close-popup");

    // Event listener for the "Request a Call Back" link
    requestCallLink.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default link behavior
        toggleBlurredBackground(); // Toggle the visibility of the blurred background
        togglePopupForm(); // Toggle the visibility of the popup form
    });

    // Event listener for the close button inside the popup form
    closeButton.addEventListener("click", function() {
        toggleBlurredBackground(); // Toggle the visibility of the blurred background
        togglePopupForm(); // Toggle the visibility of the popup form
    });
});

// -----------------------------------------------------------------------------------------
// JavaScript function to redirect to Google reviews page
function redirectToGoogleReviews() {
    // Replace 'your_google_reviews_url' with the actual URL of your Google reviews page
    window.location.href = 'https://www.google.com/search?hl=en-IN&gl=in&q=ABCOM+Private+Limited,+Shiv+Shakti+Industrial+Premises,+NM+Joshi+Marg,+near+Lodha+Excelus,+Lower+Parel+East,+Mumbai,+Maharashtra+400011&ludocid=9741344362669445747&lsig=AB86z5WcoVws07iKw0kiFWw2gg64#lrd=0x3be7cee9b3d8b57d:0x8730351603aa9273,3';
}

// ----------------------------------------------------------------
// JavaScript to implement countup effect
function startCountup(element, target) {
    var current = 0;
    var step = Math.ceil(target / 100); // Adjust step size as needed

    var countupInterval = setInterval(function () {
        if (current >= target) {
            clearInterval(countupInterval);
            element.innerText = target;
        } else {
            current += step;
            element.innerText = current;
        }
    }, 10); // Adjust interval duration as needed
}

// Start countup for each element
var totalCustomersElement = document.getElementById('total-customers');
var satisfiedCustomersElement = document.getElementById('satisfied-customers');
var totalCitiesElement = document.getElementById('total-cities');
var yearStartedElement = document.getElementById('year-started');

startCountup(totalCustomersElement, 4578);
startCountup(satisfiedCustomersElement, 8990);
startCountup(totalCitiesElement, 28);
startCountup(yearStartedElement, 2015);

// -----------------------------------------------------------------------------------------------------------
// Contact us form
function openContactForm() {
    window.open('contact_form.html', '_blank');
}
