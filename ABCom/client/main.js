document.addEventListener("DOMContentLoaded", function() {
  var popupForm = document.getElementById("popup-form");
  var requestCallLink = document.querySelector(".request-call a");
  var closeButton = document.getElementById("close-popup");

  function togglePopupForm() {
      popupForm.style.display = (popupForm.style.display === "block") ? "none" : "block";
  }

  requestCallLink.addEventListener("click", function(event) {
      event.preventDefault();
      togglePopupForm();
  });

  closeButton.addEventListener("click", function() {
      //togglePopupForm();
  });

  var callBackForm = document.getElementById("call-back-form");
  callBackForm.addEventListener("submit", function(event) {
      event.preventDefault();

      var firstName = callBackForm['first-name'].value;
      var lastName = callBackForm['last-name'].value;
      var email = callBackForm['email'].value;
      var PhoneNo = callBackForm['phone'].value;
      var leadSource = 'Website';
      var company = "AbCom Pvt.Ltd";

      $.ajax({
        url: "/server/abcomLead/createLead",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
            "First_Name": firstName,
            "Last_Name": lastName,
            "Email": email,
            "Phone": PhoneNo,
            "Lead_Source": leadSource,
            "Company": company
        }),
        success: function (data) {
            debugger;
            $('#leads').trigger("reset");
            $("#myModalLabel").html("Success");
            $("#message").html("Lead Created Successfully");
            $("#loader").hide();
            $('#myModal').modal('show');
        },
        error: function (error) {
            $('#leads').trigger("reset");
            $("#myModalLabel").html("Failure");
            $("#message").html("Please try again after Sometime");
            $("#loader").hide();
            $('#myModal').modal('show');
        }
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  var blurredBackground = document.querySelector(".blurred-background");

  function toggleBlurredBackground() {
      blurredBackground.classList.toggle("active");
  }

  var requestCallLink = document.querySelector(".request-call a");
  var closeButton = document.getElementById("close-popup");

  requestCallLink.addEventListener("click", function(event) {
      event.preventDefault();
      toggleBlurredBackground();
  });

  closeButton.addEventListener("click", function() {
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

