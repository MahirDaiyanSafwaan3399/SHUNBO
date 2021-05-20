const ytdl = require("ytdl-core");
const fs = require('fs')


let downloadMP3 = (vid_to_download, songName, folder, message_obj,Discord) => {
    ytdl(vid_to_download, {
        format: "mp3",
        quality: "highestaudio",
    }).on('end', () => {
        message_obj.reply("Download finished " + songName);
        const songEmbed = new Discord.MessageEmbed()
            .setTitle(songName)
            .setColor('#0099ff')
            .attachFiles([folder + "/" + songName + ".mp3"])
        message_obj.channel.send(songEmbed)
    }).on('error', (err) => {
        console.log(err);
    }).pipe(fs.createWriteStream(folder + "/" + songName + ".mp3"));
}

module.exports = { downloadMP3 }