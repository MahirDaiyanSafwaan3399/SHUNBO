var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest()



xhr.open("GET", "http://puzzle.mead.io/puzzle");
console.log(xhr);
xhr.send();
