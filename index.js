const express = require('express')
const logger = require('./util/logger')
const config = require('./util/config')

const app = express()

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
    res.send('{"status": false, "message": "International Server Error.", data: {}}')
})

// Create HTTP Server
// Also, return the information about EnShii-Daemon
app.listen(config.serverConfig.service.port, config.serverConfig.service.host, () => {
    console.log('▓▓▓▓▓▓▓▓▓▓▓            ▓▓▓▓▓▓▓▓▓▓▓  ▓▓        〓  〓')
    console.log('▓▓                     ▓▓           ▓▓        ▓▓  ▓▓')
    console.log('▓▓▓▓▓▓▓▓▓▓▓  ▓▓✚▓▓▓✚  ▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓✚  ▓▓  ▓▓')
    console.log('▓▓           ▓▓    ▓▓           ▓▓  ▓▓    ▓▓  ▓▓  ▓▓')
    console.log('▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓  ▓▓')
    console.log('EnShii-Daemon | Powered by SPCraftMC | Made with ❤.')
    console.log('')
    logger.info('Server running at http://' + config.serverConfig.service.host + ':' + config.serverConfig.service.port + '.')
    logger.info(
        "Start time: "
        + new Intl.DateTimeFormat("zh", { dateStyle: "short" }).format()
        + " " + new Intl.DateTimeFormat("zh", { timeStyle: "long" }).format())
});

/**
* 执行对应模块
* @param module 模块
* @param req
* @param res
*/
function execute(module, req, res) {
    logger.info(">>> " + req.method + " | IP: " + req.ip)
    logger.info("Try import module: " + module.substring(2, module.length))
    const mod = require(module)
    mod(req, res)
    logger.info("Run module: " + module.substring(2, module.length))
}
