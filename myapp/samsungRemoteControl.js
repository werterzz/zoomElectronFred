const Samsung = require('samsung-tv-control').default
const { KEYS } = require('samsung-tv-control/lib/keys')
const { APPS } = require('samsung-tv-control/lib/apps')
 
const config = {
  debug: true, // Default: false
  ip: '192.168.4.108',
  mac: 'c048e6b30ba5',
  name: 'NodeJS-Test', // Default: NodeJS
  port: 8002, // Default: 8002
  token: '12345678',
}
 
const control = new Samsung(config)
 
control.turnOn()
control
  .isAvaliable()
  .then(() => {
    // Get token for API
    control.getToken(token => {
      console.info('# Response getToken:', token)
    })
 
    // Send key to TV
    control.sendKey(KEYS.KEY_HOME, function(err, res) {
      if (err) {
        throw new Error(err)
      } else {
        console.log(res)
      }
    })
 
    // Get all installed apps from TV
    control.getAppsFromTV((err, res) => {
      if (!err) {
        console.log('# Response getAppsFromTV', res)
      }
    })
 
    // Open app by appId which you can get from getAppsFromTV
    control.openApp(APPS.YouTube, (err, res) => {
      if (!err) {
        console.log('# Response openApp', res)
      }
    })
  })
  .catch(e => console.error(e))