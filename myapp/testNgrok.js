// const ngrok = require('ngrok');
// ngrok.connect({
//     proto : 'http',
//     addr : 3000,

// }, (err, url) => {
//     if (err) {
//         console.error('Error while connecting Ngrok',err);
//         return new Error('Ngrok Failed');
//     } else {
//         console.log('Tunnel Created -> ', url);
//         console.log('Tunnel Inspector ->  http://127.0.0.1:4040');
//     }
// }).catch(err => {console.log(err)})


var ngrok = require('ngrok');
ngrok.connect(3000,function (err, url) {
    if(err) console.log(err)
    console.log(url)}).catch(err => {console.log(err)});