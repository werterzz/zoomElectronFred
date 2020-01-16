const fs = require('fs');
const qrcode = require('qrcode');

// run().catch(error => console.error(error.stack));

// async function run() {
//   const res = await qrcode.toDataURL('https://google.com');

//   fs.writeFileSync('./qr.html', `<img src="${res}">`);
//   console.log('Wrote to ./qr.html');
// }


qrcode.toFile('./public/images/testqr.svg', 'https://google.com', {
  color: {
    dark: '#0FF',  // Blue dots
    light: '#F00' // Transparent background
  }
}, function (err) {
  if (err) throw err
  console.log('done')
})