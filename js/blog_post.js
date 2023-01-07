user_geolocation();


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

        // code_block = []
        // var code_block = code_block +
        // `<img src="${response.data.file}" class="img-fluid rounded-start" alt="...">`
        // // Inserting the code block to wrapper element
        // document.getElementById("blog_image").innerHTML = code_block
    });

}


getPostDetail()


function navigatePosts(post_id)
{
   window.location = 'blog_post.html?post_id='+post_id;
}

