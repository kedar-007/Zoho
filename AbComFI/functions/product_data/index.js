const catalyst = require('zcatalyst-sdk-node');

module.exports = (event, context) => {
  
    const DATA = event.data; //event data
    const TIME = event.time; //event occured time

    console.log("Here is the events data",DATA);

    const catalystApp = catalyst.initialize(context);

	//Get Segment instance with segment ID (If no ID is given, Default segment is used)
	let segment = catalystApp.cache().segment();
	console.log("Here is the segment data",segment)
	// //Insert Cache using put by passing the key-value pair.
	// segment.put("LastEventOccurance", TIME.toString())
	// 	.then((cache) => {
	// 		console.log("\nInserted Cache : " + JSON.stringify(cache));
	// 		segment.get("LastEventOccurance").then((result) => {
  //               console.log("Got value : " + result);
  //               context.closeWithSuccess();
  //           });
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		context.closeWithFailure();
	// 	});

    
}
