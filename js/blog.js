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
        page_visited: "traceAI",
        user_action: resp.data.ip + "-" + resp.data.location.city + "-" + resp.data.location.localityName,
    };

    let res = await axios.post(user_action_url, payload);
    console.log(res);

}

function getPosts() {
    var w = window.innerWidth;
    base_url = "https://3za3d4wrgi.execute-api.us-east-2.amazonaws.com/dev/api-traceai/posts/"

    axios.get(base_url)
    .then((response) => {
        code_block = []
        for (let i=0; i<response.data.length; i++) {
            if (response.data[i].status == 1) {
                var code_block = code_block +
                `<div class="card mb-3 mx-auto" style="max-width: 1050px;">
                    <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${response.data[i].file}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${response.data[i].title}</h5>
                        <p class="card-text">${response.data[i].summary}</p>
                        <input type="button" class="btn btn-brand ms-lg-3" value="Read more" onclick="navigatePosts(${response.data[i].id});">
                        </div>
                    </div>
                    </div>
                </div>`
                // Inserting the code block to wrapper element
                document.getElementById("blog_posts").innerHTML = code_block
            }
        }
    });

}


getPosts()


function navigatePosts(post_id)
{
   window.location = 'blog_post.html?post_id='+post_id;
}

