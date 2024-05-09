function getaccessTokes() {
  var token;
  const myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "_zcsr_tmp=d789bc44-dc95-4d82-9f64-88b5bfbc59b5; b266a5bf57=a711b6da0e6cbadb5e254290f114a026; iamcsr=d789bc44-dc95-4d82-9f64-88b5bfbc59b5"
  );

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://accounts.zoho.com/oauth/v2/token?refresh_token=1000.e94d1a41a6e0eb6b83b716b5e3b9ecb4.42e1835b7ec816fbeb7335cb01f81a14&client_secret=e7801223cffc4f08379e76ab549e3d8eae0e38d9b2&grant_type=refresh_token&client_id=1000.YUYUE1MA2D8KZ2XVGFR8B1TLAV9R8E",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => getData(result))
    .catch((error) => console.error(error));
}

getaccessTokes();

function getData(result) {
  const parsedData = JSON.parse(result);
  // Extract the access token
  const accessToken = parsedData.access_token;
  console.log(accessToken);
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Zoho-oauthtoken ${accessToken}`
  );
  myHeaders.append(
    "Cookie",
    "1ccad04dca=d29e417f368f50fa25b6be760117403f; _zcsr_tmp=91b897b7-8ddf-4885-9e46-986b0bca7c35; crmcsr=91b897b7-8ddf-4885-9e46-986b0bca7c35"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    responseType: "blob", // Specify response type as blob
    redirect: "follow",
  };

  fetch(
    "https://www.zohoapis.com/crm/v2/Products/4996034000004318104/photo",
    requestOptions
  )
    .then((response) => response.blob()) // Convert response to blob
    .then((blob) => {
      // Create object URL from blob
      const imageUrl = URL.createObjectURL(blob);
      console.log('here is our images', imageUrl);
      // Now imageUrl contains the URL of the image in PNG or JPEG format
      // You can use this URL to display the image in your application
    })
    .catch((error) => console.error(error));
}
