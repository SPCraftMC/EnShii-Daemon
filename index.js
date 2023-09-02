const express = require('express')
const logger = require('./util/logger')
const header = require('./modules/header')
const { config } = require('./config.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  logger.info(`>>> ${req.method} | ${req.path} | IP: ${req.ip}`);
  header(_res)
  next()
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
app.get('/user/blacklist', (req, res) => {
  execute('./modules/user/blacklist', req, res)
});

// Error
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500);
  res.send('{"status": false, "message": "International Server Error.", data: {}}');
});

// Create HTTP Server
const server = async () => {
  try {
    logger.info(`Server is running at http://${config.host}:${config.port}. \x1B[32mReady for connections!\x1B[0m`);
  } catch (error) {
    console.error("Initialization failed: " + error.message);
  }
};

app.listen(config.port, config.host, () => {
  server();
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
