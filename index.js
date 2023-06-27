const express = require('express')
const mysql = require('mysql')

const app = express()
const config = require('./config/server.json')

// Default response
app.get('/', (req, res) => {
    res.send("Status => OK | EnShii-Daemon Loaded.")
})

// Server modules
app.get('/server/information', (req, res) => {
    execute('./modules/server/information', req, res)
})
app.get('/server/yggdrasil_server', (req, res) => {
    execute('./modules/server/yggdrasil_server', req, res)
})

// Auth modules
app.post('/auth/login', (req, res) => {
    execute('./modules/auth/login', req, res)
})
app.post('/auth/fastlogin', (req, res) => {
    execute('./modules/auth/fastlogin', req, res)
})

// Error
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.setHeader("content-type", "application/json")
    res.status(500)
    res.send('{"status": false, "message": "International Server Error."}')
})

// Create HTTP Server
app.listen(config.service.port, config.service.host, () => {
    const date = new Date();
    console.log('▓▓▓▓▓▓▓▓▓▓▓            ▓▓▓▓▓▓▓▓▓▓▓  ▓▓        〓  〓')
    console.log('▓▓                     ▓▓           ▓▓        ▓▓  ▓▓')
    console.log('▓▓▓▓▓▓▓▓▓▓▓  ▓▓✚▓▓▓✚  ▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓✚  ▓▓  ▓▓')
    console.log('▓▓           ▓▓    ▓▓           ▓▓  ▓▓    ▓▓  ▓▓  ▓▓')
    console.log('▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓  ▓▓')
    console.log('EnShii-Daemon | Powered by SPCraftMC | Made with ❤.')
    console.log('')
    console.log('Server running at http://' + config.service.host + ':' + config.service.port + '.')
    console.log("Date: " + date.getFullYear() + "." + date.getMonth() + "." + date.getDate())
    console.log('')
});

/**
* 执行对应模块
* @param module 模块
* @param req
* @param res
*/
function execute(module, req, res) {
    console.log("Try import module: " + module.substring(2, module.length))
    const mod = require(module)
    mod(req, res)
    console.log("Run module: " + module.substring(2, module.length))
}