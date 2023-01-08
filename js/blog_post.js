// user_geolocation();


function user_geolocation() {
    let apiKey = 'bdc_ca918fe3bff4410fa17b5d1efe4c5208';
    user_action_url = 'https://3za3d4wrgi.execute-api.us-east-2.amazonaws.com/dev/api-analytics/AnalyticsList/';

    params = {
        key: apiKey
    }
    axios.get('https://api.bigdatacloud.net/data/ip-geolocation?key=' + apiKey).then(resp => {
        updateUserAction(resp);
    });
}



async function updateUserAction(resp) {

    let payload = {
        page_visited: "traceAI-blogpost",
        user_action: resp.data.ip + "-" + resp.data.location.city + "-" + resp.data.location.localityName,
    };

    let res = await axios.post(user_action_url, payload);
    console.log(res);

}

function getPostDetail() {
    base_url = "https://3za3d4wrgi.execute-api.us-east-2.amazonaws.com/dev/api-traceai/posts/"

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const post_id = urlParams.get('post_id')
    console.log(post_id);

    axios.get(base_url+post_id)
    .then((response) => {
        console.log(response.data);
        code_block = []
        document.getElementById("heading").innerHTML = response.data.title
        document.getElementById("content").innerHTML = response.data.content
    });

}


getPostDetail()


function navigatePosts(post_id)
{
   window.location = 'blog_post.html?post_id='+post_id;
}


async function submitNewsletter() {
    console.log("subscribe to newsletter");
    // USER PERSONAL DETAILS
    userName = document.getElementById("userName").value;
    email = document.getElementById("email").value;

    // NOW PUSH THE DATA TO DATABASE AND NOTIFY USER
    BASE_URL = "https://3za3d4wrgi.execute-api.us-east-2.amazonaws.com/dev/api-traceai/trace_ai_post/"
    let payload = {
        name: userName,
        cellphone: "-",
        email: email,
        company: "sign up to newsletter",
    };

    let res = await axios.post(BASE_URL, payload);
    console.log(res.status);

    // if (res.status == 201) {
    //     var form_elem = document.getElementById('order_form1');
    //     var intro_stuff = document.getElementById('intro_stuff');
    //     form_elem.style.display = 'none'
    //     intro_stuff.style.display = 'none'
    //     elem.style.display = 'block';
    // } else {
    //     alert("invalid form data")
    // }

}
