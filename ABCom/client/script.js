async function getToken() {
  try {
    const requestOptions = {
      method: "POST",
      mode: 'no-cors',
      headers: {
        "Cookie": "6e73717622=3bcf233c3836eb7934b6f3edc257f951; _zcsr_tmp=df202f9d-4623-472e-9888-fdd6664b40c5; iamcsr=df202f9d-4623-472e-9888-fdd6664b40c5",
        "Content-Type": "application/json"
      },
      redirect: "follow"
    };

    const response = await fetch("https://accounts.zoho.in/oauth/v2/token?refresh_token=1000.7cc2afd50f1d05480f5c0c7820b2b567.2d4cacc6d531d342d25a3e40afe12ed1&client_secret=3400670ec93be315228dec25c6c2e22dc2ef51ef6b&grant_type=refresh_token&client_id=1000.TYQPFK7LHAK1KOJCDKNT3M7MOT546J", requestOptions);
    const data = await response.json();
    const accessToken = data.access_token;
    return accessToken;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get access token");
  }
}

async function createLead() {
  try {
    const token = await getToken();
    console.log("Access Token:", token);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Zoho-oauthtoken " + token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "data": [{
        "Company": "Jinu traders",
        "Last_Name": "Rathod"
      }]
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

createLead();
