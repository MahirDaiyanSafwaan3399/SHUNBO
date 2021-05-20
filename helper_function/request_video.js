const request = require("request");

let request_video_id = (url,fn) => {
    request(url, async (error, response, body) => {
        let video_obj = JSON.parse(body);
        let video_id = video_obj.items[0].id.videoId
        fn(video_id,video_obj.items[0].snippet.title);
    });
    
}

module.exports = {request_video_id}