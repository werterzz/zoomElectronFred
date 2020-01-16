var express = require('express');
var router = express.Router();
const qrcode = require('qrcode');
var ping = require('ping');
const opn = require('opn');
var net = require('net');

samsungIP = '192.168.4.108'
var serverIP = ''

const Samsung = require('samsung-tv-control').default
const { KEYS } = require('samsung-tv-control/lib/keys')
const { APPS } = require('samsung-tv-control/lib/apps')

const config = {
  debug: true, // Default: false
  ip: samsungIP,
  mac: 'c048e6b30ba5',
  name: 'NodeJS-Test', // Default: NodeJS
  port: 8002, // Default: 8002
  token: '18446286',
}

var isAudio = true;
var isVideo = true;
var isView = true;

const control = new Samsung(config)

const fetch = require('node-fetch')

// var pingCount = 0
// var hosts = [samsungIP, samsungIP, samsungIP];
// hosts.forEach(function (host) {
//   ping.sys.probe(host, function (isAlive) {console.log('ping')
//   pingCount++
//   if(pingCount == 3)
//   {
//     control.turnOn()

//                 control.sendKey(KEYS.KEY_POWER, function (err, res) {
//                 if (err) {
//                   console.log(err)
//                 } else {
//                   console.log(res)


//                 }
//                 })    
//   }

// })})



const intervalObj = setInterval(() => {

  fetch('http://localhost:4040/api/tunnels')
    .then(res => res.json())
    .then(json => json.tunnels.find(tunnel => tunnel.proto === 'http'))
    .then(secureTunnel => {
      console.log(secureTunnel.public_url)
      serverIP = secureTunnel.public_url
      // opn('http://localhost:3000/', { app: ['chrome'] });


      qrcode.toFile('./public/images/testqr.svg', serverIP + '/login', {
        color: {
          dark: '#000',  // Blue dots
          light: '#0000' // Transparent background
        },
    
      }, function (err) {
        if (err) throw err
        console.log('done')
        // res.render('index');
      })

//       const { exec } = require('child_process');
// exec('electron ..\\zoom-sdk-electron\\demo', (err, stdout, stderr) => {
//   if (err) {
//     // node couldn't execute the command
//     return;
//   }

//   // the *entire* stdout and stderr (buffered)
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });
      let { PythonShell } = require('python-shell')
      PythonShell.run('startupChrome.py', { pythonOptions: ['-u'], args: [] }, function (err, result) {
        if (err) console.log(err);
      })
      clearInterval(intervalObj);
    })
    .catch(err => {
      if (err.code === 'ECONNREFUSED') {
        return console.error("Looks like you're not running ngrok.")
      }
      console.error(err)
    })

}, 5000);












/* GET home page. */
// If you want random generate qrcode you must random generate url
router.get('/', function (req, res, next) {
  // qrcode.toDataURL(serverIP + '/login', { quality: 1 })
  //   .then(url => {
  //     console.log(url)
  //     res.render('index', { qr: url });
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   })



  qrcode.toFile('./public/images/testqr.svg', serverIP + '/login', {
    color: {
      dark: '#000',  // Blue dots
      light: '#0000' // Transparent background
    },

  }, function (err) {
    if (err) throw err
    console.log('done')
    res.render('index');
  })

});

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/controller', (req, res) => {
  res.render('controller', {isAudio : isAudio, isVideo : isVideo, isView : isView})
})

router.get('/leavemeeting', (req, res) => {
  isAudio = true;
  isVideo = true;
  isView = true;
  let client = net.connect({ port: 8081 }, function (connection) {
    console.log('Connection established!');
    client.write('leave\r\n');
    client.end()
  });
  res.render('login')
})

router.get('/audiobutton', (req, res) => {
  // let { PythonShell } = require('python-shell')
  // PythonShell.run('zoomControl.py', { pythonOptions: ['-u'], args: ['audio'] }, function (err, result) {
  //   if (err) console.log(err + result);
  //   console.log('finished' + result);
  // })
  let audio;

  if (isAudio == true) audio = 'muteAudio'
  else audio = 'unmuteAudio'
  isAudio = !isAudio

  let client = net.connect({ port: 8081 }, function (connection) {
    console.log('Connection established!');
    client.write(audio + '\r\n');
    client.end()
  });

  res.render('controller',{isAudio : isAudio, isVideo : isVideo, isView : isView})

})

router.get('/videobutton', (req, res) => {
  // let { PythonShell } = require('python-shell')
  // PythonShell.run('zoomControl.py', { pythonOptions: ['-u'], args: ['video'] }, function (err, result) {
  //   if (err) console.log(err + result);
  //   console.log('finished' + result);
  // })

  let video;

  if (isVideo == true) video = 'muteVideo'
  else video = 'unmuteVideo'
  isVideo = !isVideo

  let client = net.connect({ port: 8081 }, function (connection) {
    console.log('Connection established!');
    client.write(video + '\r\n');
    client.end()
  });

  res.render('controller',{isAudio : isAudio, isVideo : isVideo, isView : isView})

})

// router.get('/galleryviewbutton', (req, res) => {
//   // let { PythonShell } = require('python-shell')
//   // PythonShell.run('zoomControl.py', { pythonOptions: ['-u'], args: ['galleryview'] }, function (err, result) {
//   //   if (err) console.log(err + result);
//   //   console.log('finished' + result);
//   // })

//   let client = net.connect({ port: 8081 }, function (connection) {
//     console.log('Connection established!');
//     client.write('switchToVideoWall\r\n');
//     client.end()
//  });

//   res.render('controller')

// })

router.get('/viewbutton', (req, res) => {
  // let { PythonShell } = require('python-shell')
  // PythonShell.run('zoomControl.py', { pythonOptions: ['-u'], args: ['speakerview'] }, function (err, result) {
  //   if (err) console.log(err + result);
  //   console.log('finished' + result);
  // })

  let view;
  if (isView == true) view = 'switchToVideoWall'
  else view = 'swtichToAcitveSpeaker'
  isView = !isView

  let client = net.connect({ port: 8081 }, function (connection) {
    console.log('Connection established!');
    client.write(view + '\r\n');
    client.end()
  });

  res.render('controller',{isAudio : isAudio, isVideo : isVideo, isView : isView})

})

router.post('/login', (req, res) => {
  let { PythonShell } = require('python-shell')
  // console.log(req.body.meetingId)
  // let pyshell = new PythonShell('pyScript.py');
  // PythonShell.run('pyScript.py', {pythonOptions: ['-u'], args: [req.body.meetingId] }, function (err, result) {
  //   if (err) console.log(err + result);
  //   console.log('finished' + result);
  //   }) 


  let client = net.connect({ port: 8081 }, function (connection) {
    console.log('Connection established!');
    client.write(req.body.meetingId);
  });
  console.log('hello')
  client.on('data', function (data) {
    console.log(data.toString())
    client.end();
  });



  let p1 = new Promise((resolve, reject) => {
    client.on('end', function () {
      console.log('Disconnected :(');

    })
    resolve('Success!');
    // or
    // reject(new Error("Error!"));
  });
  p1.then(() => {
    const intervalObj = setInterval(() => {
      try {
        var clients = net.connect({ port: 8081 }, function (connection) {
          console.log('Connection established!');
          // clients.end()

        })

        clients.write('enterFullscreen\r\n');
        clients.end()
        clearInterval(intervalObj);


      } catch (err) {
        return console.log('waiting')
      }
    }, 10000)
  })

  res.render('controller',{isAudio : isAudio, isVideo : isVideo, isView : isView})
  // var hosts = ['192.168.4.108', 'google.com', 'yahoo.com'];
  // hosts.forEach(function (host) {
  //   ping.sys.probe(host, function (isAlive) {
  //     var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
  //     console.log(msg);        
  //     // control.turnOn()
  //     // control
  //     //   .isAvaliable()
  //     //   .then(() => {
  //     //     // Get token for API
  //     //     control.getToken(token => {
  //     //       console.info('# Response getToken:', token)
  //     //     })

  //         // Send key to TV
  //       //   control.sendKey(KEYS.KEY_POWER, function (err, res) {
  //       //     if (err) {
  //       //       throw new Error(err)
  //       //     } else {
  //       //       console.log(res)

  //       //         var hosts = ['192.168.4.108', 'google.com', 'yahoo.com'];
  //       //         hosts.forEach(function (host) {
  //       //           ping.sys.probe(host, function (isAlive) {
  //       //             var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
  //       //             console.log(msg);
  //       //               control.sendKey(KEYS.KEY_POWER, function (err, res) {
  //       //                 if (err) {
  //       //                   throw new Error(err)
  //       //                 } else {
  //       //                   console.log(res)
  //       //                 }
  //       //               })

  //       //               res.send('completed')
  //       //             });                    
  //       //           });
  //       //         });



  //       //     }
  //       //   // })
  //       // });
  //   });










  // })
})

module.exports = router;