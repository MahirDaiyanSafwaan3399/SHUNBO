const { prefix } = require('../config.json')

let commands = ["-shunbo", "-shunbona"]

let in_commmand = (ms)=>{
    for(let i = 0; i < commands.length;i++){
        if(commands[i] == ms){
            return true;
        }
    };
    return false;
}

let is_command = (message) => {
    let command = message.split(' ');

    return in_commmand(command[0]);
    
}

module.exports = {is_command}