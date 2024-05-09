"use strict";

const express = require("express");
const axios = require("axios");
const app = express();
const catalyst = require("zcatalyst-sdk-node");

// Middleware to parse JSON bodies
app.use(express.json());

// Function to get the access token
async function getToken() {
    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Cookie": "6e73717622=3bcf233c3836eb7934b6f3edc257f951; _zcsr_tmp=df202f9d-4623-472e-9888-fdd6664b40c5; iamcsr=df202f9d-4623-472e-9888-fdd6664b40c5",
                "Content-Type": "application/json"
            },
            redirect: "follow"
        };

        const response = await axios.post("https://accounts.zoho.in/oauth/v2/token?refresh_token=1000.7cc2afd50f1d05480f5c0c7820b2b567.2d4cacc6d531d342d25a3e40afe12ed1&client_secret=3400670ec93be315228dec25c6c2e22dc2ef51ef6b&grant_type=refresh_token&client_id=1000.TYQPFK7LHAK1KOJCDKNT3M7MOT546J", {}, requestOptions);
        const data = response.data;
        const accessToken = data.access_token;
        return accessToken;
    } catch (error) {
        console.error("Failed to get access token:", error);
        throw new Error("Failed to get access token");
    }
}

// Function to create a lead
async function createLead(createData) {
  try {
    const token = await getToken();
    console.log("Access Token:", token);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Zoho-oauthtoken " + token);
    myHeaders.append("Content-Type", "application/json");
		console.log("this is data",createData,typeof(createData));

    const raw = JSON.stringify({
      "data": [createData]
    });

    const requestOptions = {
      method: "POST",
      mode: 'no-cors',
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const response = await fetch("https://www.zohoapis.in/crm/v6/Leads", requestOptions);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Route handler for creating a lead
app.post("/createLead", async (req, res) => {
    const catalystApp = catalyst.initialize(req);

    const createData = req.body;
		console.log("Here is the data ",createData);

    try {
        const token = await getToken();
        console.log("Access Token:", token);

        const result = await createLead(createData);
        console.log("Lead created successfully:", result);

        res.status(200).json({ message: "Lead created successfully" });
    } catch (error) {
        console.error("Error creating lead:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = app;
