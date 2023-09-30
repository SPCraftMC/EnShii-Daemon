const logger = require('./logger');
const Table = require('cli-table3');
const { exec } = require('child_process');
const { config } = require('../config.js');

const init = async () => {
  logger.info('Set the environment variables.');
  let databaseUrl = `${config.source.provider}://${config.source.sql.user}:${config.source.sql.password}@${config.source.sql.host}:${config.source.sql.port}/${config.source.sql.database}`;
  process.env.DATABASE_URL = databaseUrl;

  logger.info('Initializing the database.');
  try {
    await execAsync('npx prisma db push');
    logger.info('Database model initialization successful.');
  } catch (error) {
    handleError('Error while initializing the database model!', error);
  }

  try {
    await execAsync('npx prisma db seed');
    logger.info('Target user fit the requirements.');
  } catch (error) {
    handleError('Error while preparing target user!', error);
  }

<<<<<<< HEAD
  const pm2command = `pm2 start ./index.js --watch --deep-monitoring --merge-logs -i ${config.daemon.instance} --kill-timeout ${config.daemon.timeout} --name ${config.daemon.name}`;
=======
  const command = `pm2 start ./index.js --watch --deep-monitoring --merge-logs -i 1 --kill-timeout ${config.daemon.timeout} --name ${config.daemon.name}`;
>>>>>>> f4de3e4 (none)
  try {
    await execAsync(pm2command);
    logger.info(`Initialization successful.(${Math.round(performance.now())}ms)`);
    displayBanner();
    displayCommands();
  } catch (error) {
    handleError('Error while start server thread!', error);
  }
};

const execAsync = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
};

const handleError = (message, error) => {
  logger.error(`${message}: ${error}`);
  logger.error('EnShii-Daemon will exit now');
  process.exit();
};

const displayBanner = () => {
  console.log(`\x1B[2m╭──────────────────────────────────────────────────────╮\x1B[0m`);
  console.log(`\x1B[2m│\x1B[0m ▓▓▓▓▓▓▓▓▓▓▓            ▓▓▓▓▓▓▓▓▓▓▓  ▓▓        〓  〓 \x1B[2m│\x1B[0m`);
  console.log(`\x1B[2m│\x1B[0m ▓▓                     ▓▓           ▓▓        ▓▓  ▓▓ \x1B[2m│\x1B[0m`);
  console.log(`\x1B[2m│\x1B[0m ▓▓▓▓▓▓▓▓▓▓▓  ▓▓✚▓▓▓✚   ▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓✚   ▓▓  ▓▓ \x1B[2m│\x1B[0m`);
  console.log(`\x1B[2m│\x1B[0m ▓▓           ▓▓    ▓▓           ▓▓  ▓▓    ▓▓  ▓▓  ▓▓ \x1B[2m│\x1B[0m`);
  console.log(`\x1B[2m│\x1B[0m ▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓▓▓▓▓▓▓▓▓▓  ▓▓    ▓▓  ▓▓  ▓▓ \x1B[2m│\x1B[0m`);
  console.log(`\x1B[2m│──────────────────────────────────────────────────────│\x1B[0m`);
  console.log(`\x1B[2m│\x1B[0m EnShii-Daemon  \x1B[2m|\x1B[0m  Powered by SPCraftMC & crux_tech.  \x1B[2m│\x1B[0m`);
  console.log(`\x1B[2m│\x1B[0m                     Made with \x1B[31m❤\x1B[0m .                    \x1B[2m│\x1B[0m`)
  console.log(`\x1B[2m╰──────────────────────────────────────────────────────╯\x1B[0m`)
};

const displayCommands = () => {
  const table = new Table({
    head: ['Command', 'Description'],
    chars: {
      'top': '\x1B[2m─\x1B[0m', 'top-mid': '\x1B[2m┬\x1B[0m', 'top-left': '\x1B[2m╭\x1B[0m', 'top-right': '\x1B[2m╮\x1B[0m'
      , 'bottom': '\x1B[2m─\x1B[0m', 'bottom-mid': '\x1B[2m┴\x1B[0m', 'bottom-left': '\x1B[2m╰\x1B[0m', 'bottom-right': '\x1B[2m╯\x1B[0m'
      , 'left': '\x1B[2m│\x1B[0m', 'mid': '\x1B[2m─\x1B[0m', 'mid-mid': '\x1B[2m┼\x1B[0m', 'right-mid': '\x1B[2m│\x1B[0m', 'left-mid': '\x1B[2m│\x1B[0m', 'right': '\x1B[2m│\x1B[0m', 'middle': '\x1B[2m│\x1B[0m'
    }
  });

  table.push(
    ['pm2 ls', 'list all pm2 instance'],
    [`pm2 logs ${config.daemon.name}`, 'watch logs'],
    ['pm2 flush', 'flush logs'],
    [`pm2 reload ${config.daemon.name}`, 'reload the server'],
    [`pm2 stop ${config.daemon.name}`, 'stop the server'],
    ['pm2 kill', 'kill all']
  );

  console.log(table.toString());
}

init();
