var fs = require('fs');

let create_folder = (folder_name) => {
    if (!fs.existsSync(folder_name)) {
        fs.mkdirSync(folder_name);
    }
}

module.exports = { create_folder };