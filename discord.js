`--unhandled-rejections=strict`

const { prefix, token } = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
const request = require("request");
const ytdl = require("ytdl-core");

const API_KEY = "AIzaSyDUmBcWvGIT9s1FfSBKFJQPJEmXkZhvvoE";

const client = new Discord.Client();

client.once("ready", () => {
	console.log("Ready to go");
});



let downloadMP3 = (vid_to_download, songName, fn) => {
	ytdl(vid_to_download, {
		format: "mp3",
		quality: "highestaudio",
	}).on('end', () => {
		console.log("ENDED SUCCESFULLY")
		fn(true)
	}).pipe(fs.createWriteStream(songName + ".mp3"));
}

client.on("message", async (message) => {
	if (message.content.startsWith(prefix + "shunbo")) {
		let args = message.content.split(" ");
		let songName = "";
		args.shift();
		if (args.length > 1) {
			args.forEach((song) => {
				songName += song + " ";
			});
		} else {
			songName = args[0];
		}
		let url =
			"https://www.googleapis.com/youtube/v3/search?key=" +
			API_KEY +
			"&type=video&q=" +
			songName;
		request(url, (error, response, body) => {
			let video_obj = JSON.parse(body);
			let video_id = video_obj.items[0].id.videoId;
			let vid_to_download = "https://youtube.com/watch?v=" + video_id;
			let file_name = songName + ".mp3";
			downloadMP3(vid_to_download, songName, async (downloaded) => {
				console.log(downloaded)
				if(downloaded){
					if (message.member.voice.channel) {
						const connection = await message.member.voice.channel.join();
						const dispatcher = connection.play(file_name);

						dispatcher.on('start', () => {
							console.log('audio.mp3 is now playing!');
						});

						dispatcher.on('finish', () => {
							console.log('audio.mp3 has finished playing!');
						});
						dispatcher.on('error', console.error);
					}
				}
			})
		});
	}
});

client.login(token);
