require('@babel/register')
global.Promise = require('bluebird')
Promise.config({
  longStackTraces: true,
  warnings: true,
})
process.env.NODE_ENV = 'production'

const fs = require('fs')
const open = require('open')
const dns = require('dns')
const totaljs = require('total.js')
const packageInfo = require('./package.json')
const packageName = `${packageInfo.displayName} v${packageInfo.version} : Server`

let isHTTPS = false
global.NET_AVAIL = false;

(async function () {
  try {
    const dns_res = await dns.promises.lookup('google.com')
    isHTTPS = true
    global.NET_AVAIL = true
  }
  catch (err) {
    console.error(err)
  }

  const options = {}

  // options.sleep = 3000;
  options.inspector = 9229
  options.port = 8443 // parseInt(process.argv[2]);
  options.https = {
    key: fs.readFileSync(F.path.private('key.pem')),
    cert: fs.readFileSync(F.path.private('cert.pem')),
  }

  F.console = U.noop

  isHTTPS ? F.https('release', options) : F.http('release', options)

  process.title = packageName

  open(isHTTPS ? 'https://lab1.spos.mai.smirnov.one:8443/' : 'http://127.0.0.1:8443/', { app: ['chrome', '--incognito'] })

  ON('ready', () => {
    process.title = packageName
  })

})()
