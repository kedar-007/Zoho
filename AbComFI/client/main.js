document.addEventListener("DOMContentLoaded", function() {
  var popupForm = document.getElementById("popup-form");
  var requestCallLink = document.querySelector(".request-call a");
  var closeButton = document.getElementById("close-popup");
  var blurredBackground = document.querySelector(".blurred-background");

  function togglePopupForm() {
      popupForm.style.display = (popupForm.style.display === "block") ? "none" : "block";
  }

  function toggleBlurredBackground() {
      blurredBackground.classList.toggle("active");
  }

  requestCallLink.addEventListener("click", function(event) {
      event.preventDefault();
      togglePopupForm();
      toggleBlurredBackground();
  });

  closeButton.addEventListener("click", function() {
      togglePopupForm();
      toggleBlurredBackground();
  });

  var callBackForm = document.getElementById("call-back-form");
  callBackForm.addEventListener("submit", function(event) {
      event.preventDefault();

      // Close the popup form immediately
      togglePopupForm();

      // Show a responsive message
      $('#myModal').modal('show');
      $("#myModalLabel").html("Success");
      $("#message").html("Thank you! A salesperson will connect with you within 3 hours.");
      
      // Create lead in the backend
      var firstName = callBackForm['first-name'].value;
      var lastName = callBackForm['last-name'].value;
      var email = callBackForm['email'].value;
      var ctype = callBackForm['customer-type'].value;
      var phoneNo = callBackForm['phone'].value;
      var leadSource = 'Website';
      var company = "AbCom Pvt.Ltd";

      axios.post("/server/abcomLead/createLead", {
          "First_Name": firstName,
          "Last_Name": lastName,
          "Email": email,
          "Phone": phoneNo,
          "Lead_Source": leadSource,
          "Company": company,
          "Customer_Type": ctype
      })
      .then(function (response) {
          console.log("Lead created successfully:", response.data);
          // You can add additional logic here if needed
      })
      .catch(function (error) {
          console.error("Error creating lead:", error);
          // Handle lead creation error if necessary
      });

      // Reset the form
      $('#leads').trigger("reset");
      // Deactivate the blurred background
      toggleBlurredBackground();
  });
});

function redirectToGoogleReviews() {
  window.location.href = 'https://www.google.com/search?hl=en-IN&gl=in&q=ABCOM+Private+Limited,+Shiv+Shakti+Industrial+Premises,+NM+Joshi+Marg,+near+Lodha+Excelus,+Lower+Parel+East,+Mumbai,+Maharashtra+400011&ludocid=9741344362669445747&lsig=AB86z5WcoVws07iKw0kiFWw2gg64#lrd=0x3be7cee9b3d8b57d:0x8730351603aa9273,3';
}

function startCountup(element, target) {
  var current = 0;
  var step = Math.ceil(target / 100);

  var countupInterval = setInterval(function() {
      if (current >= target) {
          clearInterval(countupInterval);
          element.innerText = target;
      } else {
          current += step;
          element.innerText = current;
      }
  }, 10);
}

var totalCustomersElement = document.getElementById('total-customers');
var satisfiedCustomersElement = document.getElementById('satisfied-customers');
var totalCitiesElement = document.getElementById('total-cities');
var yearStartedElement = document.getElementById('year-started');

startCountup(totalCustomersElement, 4578);
startCountup(satisfiedCustomersElement, 8990);
startCountup(totalCitiesElement, 28);
startCountup(yearStartedElement, 2015);

function openContactForm() {
  window.open('contact_form.html', '_blank');
}

function initMap() {
    // Coordinates for the location
    var location = { lat: 40.7128, lng: -74.0060 }; // Example coordinates for New York City

    // Create a map object and specify the DOM element for display
    var map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15 // Adjust the zoom level as needed
    });

    // Create a marker and set its position
    var marker = new google.maps.Marker({
        map: map,
        position: location,
        title: 'Our Location' // Optional title for the marker
    });
}

// --------------------------------------------------------------------------------------
// Read more button function (contact_us.html page)
document.addEventListener('DOMContentLoaded', function () {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const readLessBtn = document.querySelector('.read-less-btn');
    const readMoreSection = document.querySelector('.read-more-section');

    readMoreBtn.addEventListener('click', function () {
        readMoreSection.style.display = 'block';
        readMoreBtn.style.display = 'none';
        readLessBtn.style.display = 'inline-block';
    });

    readLessBtn.addEventListener('click', function () {
        readMoreSection.style.display = 'none';
        readMoreBtn.style.display = 'inline-block';
        readLessBtn.style.display = 'none';
    });
});

