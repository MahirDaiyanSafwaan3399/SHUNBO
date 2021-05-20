let get_song_name = (message) => {
    let args = message.split(" ");
    let songName = "";
    args.shift();
    if (args.length > 1) {
        args.forEach((song) => {
            songName += song + " ";
        });
    } else {
        songName = args[0];
    }
    return songName;
}
module.exports = {get_song_name}