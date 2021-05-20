const { token, API_KEY } = require("./config.json");
const Discord = require("discord.js");

const { downloadMP3 } = require('./helper_function/download_mp3')
const { request_video_id } = require('./helper_function/request_video')
const { is_command } = require('./commands/command')
const { get_song_name } = require('./helper_function/get_song_name');
const { create_folder } = require("./helper_function/create_folder")


const client = new Discord.Client();

client.once("ready", () => {
	console.log("Ready to go");
});

client.on("message", async (message) => {
	if (is_command(message.content)) {
		create_folder(message.author.username)
		let songName = get_song_name(message.content);
		let url =
			"https://www.googleapis.com/youtube/v3/search?key=" +
			API_KEY +
			"&type=video&q=" +
			songName +
			"&part=snippet"

		request_video_id(url, (id,title) => {
			let folderName = message.author.username
			let vid_to_download = "https://youtube.com/watch?v=" + id;
			downloadMP3(vid_to_download, title, folderName, message,Discord);
		})
	}
});

client.login(token);
