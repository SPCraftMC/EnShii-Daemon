const express = require('express')
const logger = require('./util/logger')
const dotenv = require("dotenv")
const db = require('./database/db')
const header = require('./modules/header')

dotenv.config()

const config = process.env
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  logger.info(`>>> ${req.method} | ${req.path} | IP: ${req.ip}`);
  header(_res)
  next()
});

// Default response
app.get('/', (req, res) => {
  res.send('{"message": "Status => OK | EnShii-Daemon Loaded."}');
});

// Server modules
app.get('/server/information', (req, res) => {
  execute('./modules/server/information', req, res);
});
app.get('/server/oauth_server', (req, res) => {
  execute('./modules/server/oauth_server', req, res);
});
app.get('/server/captcha', (req, res) => {
  execute('./modules/server/captcha', req, res);
});

// Auth modules
app.post('/auth/login', (req, res) => {
  execute('./modules/auth/login', req, res);
});
app.post('/auth/register', (req, res) => {
  execute('./modules/auth/register', req, res);
});
app.post('/auth/fastlogin', (req, res) => {
  execute('./modules/auth/fastlogin', req, res);
});
app.post('/auth/check', (req, res) => {
  execute('./modules/auth/check', req, res)
});

//User modules
app.get('/user/information', (req, res) => {
  execute('./modules/user/information', req, res)
});
app.post('/user/blacklist', (req, res) => {
  execute('./modules/user/blacklist', req, res)
});

// Error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.send('{"status": false, "message": "International Server Error.", data: {}}');
});

// Create HTTP Server and initialize database
const startServer = async () => {
  try {
    await db.init();
    logger.info(`Initialization successful.(${Math.round(performance.now())}ms)`);
    console.log(``);
    console.log(`\x1B[2m╭──────────────────────────────────────────────────────╮\x1B[0m`);
    console.log(`\x1B[2m│\x1B[0m ▓▓▓▓▓▓▓▓▓▓▓            ▓▓▓▓▓▓▓▓▓▓▓  ▓▓        〓  〓 \x1B[2m│\x1B[0m`);
    console.log(`\x1B[2m│\x1B[0m ▓▓                     ▓▓           ▓▓        ▓▓  ▓▓ \x1B[2m│\x1B[0m`);
    console.log(`\x1B[2m│\x1B[0m ▓▓▓▓▓▓▓▓▓▓▓  ▓▓✚▓▓▓✚   ▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓✚   ▓▓  ▓▓ \x1B[2m│\x1B[0m`);
    console.log(`\x1B[2m│\x1B[0m ▓▓           ▓▓    ▓▓           ▓▓  ▓▓    ▓▓  ▓▓  ▓▓ \x1B[2m│\x1B[0m`);
    console.log(`\x1B[2m│\x1B[0m ▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓  ▓▓ \x1B[2m│\x1B[0m`);
    console.log(`\x1B[2m│──────────────────────────────────────────────────────│\x1B[0m`);
    console.log(`\x1B[2m│\x1B[0m EnShii-Daemon \x1B[2m|\x1B[0m Powered by SPCraftMC & maincore_tech.\x1B[2m│\x1B[0m`);
    console.log(`\x1B[2m│\x1B[0m                     Made with \x1B[31m❤\x1B[0m.                     \x1B[2m│\x1B[0m`)
    console.log(`\x1B[2m╰──────────────────────────────────────────────────────╯\x1B[0m`)
    console.log(``);
    logger.info(`Server running at http://${config.HOST}:${config.DAEMON_PORT}. \x1B[32mReady for connections!\x1B[0m`);
  } catch (error) {
    console.error("Initialization failed: " + error.message);
  }
};

app.listen(config.DAEMON_PORT, config.HOST, () => {
  logger.info('Initializing database...');
  startServer();
});

/**
* 执行对应模块
* @param module 模块
* @param req
* @param res
*/
const execute = (module, req, res) => {
  logger.info(`Try const module: ${module.substring(2)}`);
  const mod = require(module);
  mod(req, res);
  logger.info(`Run module: ${module.substring(2)}`);
};
