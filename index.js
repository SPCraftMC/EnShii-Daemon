const express = require('express');
const logger = require('./util/logger');
const config = require('./util/config');
const db = require('./database/db');

const app = express();

// Default response
app.get('/', (req, res) => {
  res.send("Status => OK | EnShii-Daemon Loaded.");
});

// Server modules
app.get('/server/information', (req, res) => {
  execute('./modules/server/information', req, res);
});
app.get('/server/oauth_server', (req, res) => {
  execute('./modules/server/oauth_server', req, res);
});

// Auth modules
app.post('/auth/login', (req, res) => {
  execute('./modules/auth/login', req, res);
});
app.post('/auth/fastlogin', (req, res) => {
  execute('./modules/auth/fastlogin', req, res);
});

// Error
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.setHeader("content-type", "application/json");
  res.status(500);
  res.send('{"status": false, "message": "International Server Error.", data: {}}');
});

// Create HTTP Server and initialize database
const startServer = async () => {
  try {
    await db.init();
    logger.info('Initialized.');
    logger.info(`Server running at http://${config.serverConfig.service.host}:${config.serverConfig.service.port}.`);
    logger.info(`Start time: ${new Intl.DateTimeFormat("zh", { dateStyle: "short", timeStyle: "long" }).format()}`);
  } catch (error) {
    console.error("Initialization failed: " + error.message);
  }
};

app.listen(config.serverConfig.service.port, config.serverConfig.service.host, () => {
  console.log(`▓▓▓▓▓▓▓▓▓▓▓            ▓▓▓▓▓▓▓▓▓▓▓  ▓▓        〓  〓`);
  console.log(`▓▓                     ▓▓           ▓▓        ▓▓  ▓▓`);
  console.log(`▓▓▓▓▓▓▓▓▓▓▓  ▓▓✚▓▓▓✚  ▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓✚  ▓▓  ▓▓`);
  console.log(`▓▓           ▓▓    ▓▓           ▓▓  ▓▓    ▓▓  ▓▓  ▓▓`);
  console.log(`▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓  ▓▓`);
  console.log(`EnShii-Daemon | Powered by SPCraftMC | Made with ❤.`);
  console.log('');
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
  logger.info(`>>> ${req.method} | IP: ${req.ip}`);
  logger.info(`Try import module: ${module.substring(2)}`);
  const mod = require(module);
  mod(req, res);
  logger.info(`Run module: ${module.substring(2)}`);
};
