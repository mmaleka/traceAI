// user_geolocation();
var elem = document.getElementById('form_received');
elem.style.display = 'none';

async function submitOrder() {
    console.log("taking order");
    // USER PERSONAL DETAILS
    userName = document.getElementById("userName").value;
    cellphone = document.getElementById("cellphone").value;
    email = document.getElementById("email").value;
    company = document.getElementById("company").value;

    console.log(userName, cellphone, company, email);
    // NOW PUSH THE DATA TO DATABASE AND NOTIFY USER
    BASE_URL = "https://vec4ziu7mc.execute-api.us-west-2.amazonaws.com/dev/api-traceai/trace_ai_post/"
    let payload = {
        name: userName,
        cellphone: cellphone,
        email: email,
        company: company,
    };

    let res = await axios.post(BASE_URL, payload);
    console.log(res.status);

    if (res.status == 201) {
        var form_elem = document.getElementById('order_form1');
        var intro_stuff = document.getElementById('intro_stuff');
        form_elem.style.display = 'none'
        intro_stuff.style.display = 'none'
        elem.style.display = 'block';
    } else {
        alert("invalid form data")
    }

}




function user_geolocation() {
    let apiKey = 'bdc_ca918fe3bff4410fa17b5d1efe4c5208';
    user_action_url = 'https://vec4ziu7mc.execute-api.us-west-2.amazonaws.com/dev/api-analytics/AnalyticsList/';

    params = {
        key: apiKey
    }
    axios.get('https://api.bigdatacloud.net/data/ip-geolocation?key=' + apiKey).then(resp => {
        updateUserAction(resp);
    });
}



async function updateUserAction(resp) {

    let payload = {
        page_visited: "traceAI",
        user_action: resp.data.ip + "-" + resp.data.location.city + "-" + resp.data.location.localityName,
    };

    let res = await axios.post(user_action_url, payload);
    console.log(res);

}