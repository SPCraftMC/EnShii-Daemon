const express = require('express')
const logger = require('./util/logger')
//const config = require('./util/config')
const dotenv = require("dotenv")
const db = require('./database/db')
const header = require('./modules/header')
//const bodyParser = require('body-parser')

dotenv.config()

const config = process.env
const app = express();

//app.use(bodyParser());
//下文替换被弃用的bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  logger.info(`>>> ${req.method} | ${req.path} | IP: ${req.ip}`);
  header(_res)
  next()
})

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
})
app.post('/auth/fastlogin', (req, res) => {
  execute('./modules/auth/fastlogin', req, res);
});
app.post('/auth/check', (req, res) => {
  execute('./modules/auth/check', req, res)
})

//User modules
app.get('/user/information', (req, res) => {
  execute('./modules/user/information', req, res)
})
app.get('/user/blacklist', (req, res) => {
  execute('./modules/user/blacklist', req, res)
})

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
    logger.info('Initialized.');
    console.log(`▓▓▓▓▓▓▓▓▓▓▓            ▓▓▓▓▓▓▓▓▓▓▓  ▓▓        〓  〓`);
    console.log(`▓▓                     ▓▓           ▓▓        ▓▓  ▓▓`);
    console.log(`▓▓▓▓▓▓▓▓▓▓▓  ▓▓✚▓▓▓✚   ▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓✚   ▓▓  ▓▓`);
    console.log(`▓▓           ▓▓    ▓▓           ▓▓  ▓▓    ▓▓  ▓▓  ▓▓`);
    console.log(`▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓  ▓▓`);
    console.log(`EnShii-Daemon | Powered by SPCraftMC and maincore_tech. | Made with \x1B[31m❤\x1B[0m.`);
    console.log('');
    logger.info(`Server running at http://${config.HOST}:${config.DAEMON_PORT}.`);
    logger.info(`Start time: ${new Intl.DateTimeFormat("zh", { dateStyle: "short", timeStyle: "long" }).format()}`);
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
