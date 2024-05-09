var express = require('express');
var app = express();
var catalyst = require('zcatalyst-sdk-node');
app.use(express.json());
app.use(express.static('public'));
const tableName = 'AlienCity'; // The table created in the Data Store
const columnName = 'CityName'; // The column created in the table
 
app.post('/alien', (req, res) => {
    var cityJson = req.body;
    console.log(req.body)
    var catalystApp = catalyst.initialize(req);
    getDataFromCatalystDataStore(catalystApp, cityJson.city_name).then(cityDetails => {
        if (cityDetails.length == 0) {
            console.log("Alien alert!");
            var rowData = {}
            rowData[columnName] = cityJson.city_name;
 
            var rowArr = [];
            rowArr.push(rowData);
            // Inserts the city name as a row in the Catalyst Data Store table
            catalystApp.datastore().table(tableName).insertRows(rowArr).then(cityInsertResp => {
                res.send({
                    "message": "Thanks for reporting!"
                });
            }).catch(err => {
                console.log(err);
                sendErrorResponse(res);
            })
        } else {
            res.send({
                "message": "Looks like you are not the first person to encounter aliens in this city! Someone has already reported an alien encounter here!"
            });
        }
    }).catch(err => {
        console.log(err);
        sendErrorResponse(res);
    })
});
 
app.get('/alien', (req, res) => {
    var city = req.query.city_name;
 
    // Initializing Catalyst SDK
    var catalystApp = catalyst.initialize(req);
    getDataFromCatalystDataStore(catalystApp, city).then(cityDetails => {
        if (cityDetails.length == 0) {
            res.send({
                "message": "Hurray! No alien encounters in this city yet!",
                "signal": "negative"
            });
        } else {
            res.send({
                "message": "Uh oh! Looks like there are aliens in this city!",
                "signal": "positive"
            });
        }
    }).catch(err => {
        console.log(err);
        sendErrorResponse(res);
    })
});
 
 
function getDataFromCatalystDataStore(catalystApp, cityName) {
    return new Promise((resolve, reject) => {
        // Queries the Catalyst Data Store table
        catalystApp.zcql().executeZCQLQuery("Select * from " + tableName + " where " + columnName + "='" + cityName + "'").then(queryResponse => {
            resolve(queryResponse);
        }).catch(err => {
            reject(err);
        })
    });
 
}
 
function sendErrorResponse(res) {
    res.status(500);
    res.send({
        "error": "Internal server error occurred. Please try again in some time."
    });
}
 
app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000, () => {
})
 
module.exports = app;