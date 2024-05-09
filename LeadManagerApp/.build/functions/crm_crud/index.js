"use strict";
const express = require("express");
const http = require("https");
const app = express();
app.use(express.json());
const catalyst = require("zcatalyst-sdk-node");
const HOST = "www.zohoapis.in";
const AUTH_HOST = "https://accounts.zoho.in/oauth/v2/token";
const PORT = 443;
const axios = require("axios");
const CLIENTID = '1000.N0I4PFAVWN9CCM0OD7N51WFEQU8PWC'; // Add your client ID
const CLIENT_SECRET = '89261074e66e55294fe413e28668fb7f683b936448'; // Add your client secret

app.get("/generateToken", async (req, res) => {
    try {
        const catalystApp = catalyst.initialize(req);
        const code = req.query.code;
        let userManagement = catalystApp.userManagement();
        let userDetails = await userManagement.getCurrentUser();
        const domain = `${process.env.X_ZOHO_CATALYST_IS_LOCAL === 'true' ? "http" : "https"}://${process.env.X_ZOHO_CATALYST_IS_LOCAL === 'true' ? req.headers.host : req.headers.host.split(':')[0]}`
        console.log("Domain", domain);
        const refresh_token = await getRefreshToken(code, res, domain);
        const userId = userDetails.user_id;
        const catalystTable = catalystApp.datastore().table("Token");
        await catalystTable.insertRow({
            refresh_token,
            userId,
        });
        res.status(200).redirect(`${domain}/app/index.html`);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal Server Error. Please try again after sometime.",
            error: err,
        });
    }
});

app.get("/getUserDetails", async (req, res) => {
    try {
        const catalystApp = catalyst.initialize(req);
        const userDetails = await getUserDetails(catalystApp);
        if (userDetails.length !== 0) {
            res.status(200).send({ userId: userDetails[0].Token.userId });
        } else {
            res.status(200).send({ userId: null });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal Server Error in Getting User Details. Please try again after sometime.",
            error: err,
        });
    }
});

app.get("/crmData", async (req, res) => {
    try {
        console.log();
        const catalystApp = catalyst.initialize(req);
        const userDetails = await getUserDetails(catalystApp);
        const accessToken = await getAccessToken(catalystApp, userDetails);
        const options = {
            hostname: HOST,
            port: PORT,
            method: "GET",
            path: `/crm/v2/Leads`,
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
        };
        var data = "";
        const request = http.request(options, function(response) {
            response.on("data", function(chunk) {
                data += chunk;
            });
            response.on("end", function() {
                console.log(response.statusCode);
                res.setHeader("content-type", "application/json");
                res.status(200).send(data);
            });
        });
        request.end();
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal Server Error. Please try again after sometime.",
        });
    }
});

app.get("/crmData/:id", async (req, res) => {
    try {
        const catalystApp = catalyst.initialize(req);
        const userDetails = await getUserDetails(catalystApp);
        const accessToken = await getAccessToken(catalystApp, userDetails);
        const options = {
            hostname: HOST,
            port: PORT,
            method: "GET",
            path: `/crm/v2/Leads/${req.params.id}`,
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
        };
        var data = "";
        const request = http.request(options, function(response) {
            response.on("data", function(chunk) {
                data += chunk;
            });
            response.on("end", function() {
                res.setHeader("content-type", "application/json");
                res.status(200).send(data);
            });
        });
        request.end();
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal Server Error. Please try again after sometime.",
        });
    }
});

app.post("/crmData", async (req, res) => {
    try {
        const catalystApp = catalyst.initialize(req);
        const createData = req.body;
        const reqData = [];
        reqData.push(createData);
        const data = {
            data: reqData,
        };
        if (!createData) {
            res.status(400).send({ message: "Data Not Found" });
        }
        const userDetails = await getUserDetails(catalystApp);
        const accessToken = await getAccessToken(catalystApp, userDetails);
        const options = {
            hostname: HOST,
            port: PORT,
            method: "POST",
            path: `/crm/v2/Leads`,
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
                "Content-Type": "application/json",
            },
        };
        const request = http.request(options, function(response) {
            res.setHeader("content-type", "application/json");
            response.pipe(res);
        });
        request.write(JSON.stringify(data));
        request.end();
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal Server Error. Please try again after sometime.",
        });
    }
});

app.put("/crmData/:id", async (req, res) => {
    try {
        const catalystApp = catalyst.initialize(req);
        const updateData = req.body;
        const reqData = [];
        reqData.push(updateData);
        const data = {
            data: reqData,
        };
        if (!updateData) {
            res.status(400).send({ message: "Update Data Not Found" });
        }
        const userDetails = await getUserDetails(catalystApp);
        const accessToken = await getAccessToken(catalystApp, userDetails);
        const options = {
            hostname: HOST,
            port: PORT,
            method: "PUT",
            path: `/crm/v2/Leads/${req.params.id}`,
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
                "Content-Type": "application/json",
            },
        };
        const request = http.request(options, function(response) {
            res.setHeader("content-type", "application/json");
            response.pipe(res);
        });
        request.write(JSON.stringify(data));
        request.end();
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal Server Error. Please try again after sometime.",
        });
    }
});

app.delete("/crmData/:id", async (req, res) => {
    console.log(`/crm/v2/Leads/${req.params.id}`);
    try {
        const catalystApp = catalyst.initialize(req);
        const userDetails = await getUserDetails(catalystApp);
        const accessToken = await getAccessToken(catalystApp, userDetails);
        const options = {
            hostname: HOST,
            port: PORT,
            method: "DELETE",
            path: `/crm/v2/Leads/${req.params.id}`,
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
                "Content-Type": "application/json",
            },
        };
        const request = http.request(options, function(response) {
            res.setHeader("content-type", "application/json");
            response.pipe(res);
        });
        request.end();
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal Server Error. Please try again after sometime.",
        });
    }
});

async function getAccessToken(catalystApp, userDetails) {
    const refresh_token = userDetails[0].Token.refresh_token;
    const userId = userDetails[0].Token.userId;
    const credentials = {
        [userId]: {
            client_id: CLIENTID,
            client_secret: CLIENT_SECRET,
            auth_url: AUTH_HOST,
            refresh_url: AUTH_HOST,
            refresh_token,
        },
    };
    const accessToken = await catalystApp.connection(credentials).getConnector(userId).getAccessToken();
    return accessToken;
}

async function getRefreshToken(code, res, domain) {
    try {
        const url = `${AUTH_HOST}?code=${code}&client_id=${CLIENTID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${domain}/server/crm_crud/generateToken`;
        const response = await axios({
            method: "POST",
            url
        });
				
        return response.data.refresh_token;
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal Server Error. Please try again after sometime.",
            error: err,
        });
    }
}

async function getUserDetails(catalystApp) {
    let userDetails = await catalystApp.userManagement().getCurrentUser();
    let userDetail = await catalystApp.zcql().executeZCQLQuery(`SELECT * FROM Token where UserId=${userDetails.user_id}`);
    return userDetail;
}

module.exports = app;
