'use strict';
const path = require('path');
const fs = require('fs');
const http = require('http');
const os = require('os');
const _ = require('lodash');
const express = require('express');
const nconf = require('nconf');
const morgan = require('morgan');
const winston = require('winston');
const pkg = require('../package.json');

//Environment variables
nconf.argv()
   .env();

//Logger
const logger = setupLogger(nconf);

/*
http://www.kammerl.de/ascii/AsciiSignature.php
r2_d2 font
*/

const logo = `
                                                                                  ÛÛÛÛÛ                            ÛÛÛ 
                                                                                 °°ÛÛÛ                            °°°  
  ÛÛÛÛÛÛ   ÛÛÛÛÛÛ  ÛÛÛÛÛÛÛÛ   ÛÛÛÛÛÛ   ÛÛÛÛÛ             ÛÛÛÛÛ ÛÛÛ ÛÛÛÛÛ  ÛÛÛÛÛÛ  °ÛÛÛÛÛÛÛ             ÛÛÛÛÛ ÛÛÛÛ ÛÛÛÛ 
 ÛÛÛ°°ÛÛÛ ÛÛÛ°°ÛÛÛ°°ÛÛÛ°°ÛÛÛ ÛÛÛ°°ÛÛÛ ÛÛÛ°°   ÛÛÛÛÛÛÛÛÛÛ°°ÛÛÛ °ÛÛÛ°°ÛÛÛ  ÛÛÛ°°ÛÛÛ °ÛÛÛ°°ÛÛÛ ÛÛÛÛÛÛÛÛÛÛ°°ÛÛÛ °ÛÛÛ °°ÛÛÛ 
°ÛÛÛ °°° °ÛÛÛÛÛÛÛ  °ÛÛÛ °°° °ÛÛÛÛÛÛÛ °°ÛÛÛÛÛ °°°°°°°°°°  °ÛÛÛ °ÛÛÛ °ÛÛÛ °ÛÛÛÛÛÛÛ  °ÛÛÛ °ÛÛÛ°°°°°°°°°°  °ÛÛÛ °ÛÛÛ  °ÛÛÛ 
°ÛÛÛ  ÛÛÛ°ÛÛÛ°°°   °ÛÛÛ     °ÛÛÛ°°°   °°°°ÛÛÛ            °°ÛÛÛÛÛÛÛÛÛÛÛ  °ÛÛÛ°°°   °ÛÛÛ °ÛÛÛ            °ÛÛÛ °ÛÛÛ  °ÛÛÛ 
°°ÛÛÛÛÛÛ °°ÛÛÛÛÛÛ  ÛÛÛÛÛ    °°ÛÛÛÛÛÛ  ÛÛÛÛÛÛ              °°ÛÛÛÛ°ÛÛÛÛ   °°ÛÛÛÛÛÛ  ÛÛÛÛÛÛÛÛ             °°ÛÛÛÛÛÛÛÛ ÛÛÛÛÛ
 °°°°°°   °°°°°°  °°°°°      °°°°°°  °°°°°°                °°°° °°°°     °°°°°°  °°°°°°°°               °°°°°°°° °°°°° 
`;

console.log(logo);
const publicPath = path.join(__dirname, "../dist");
console.log(publicPath);

// App
const app = express();
app.use(express.static(publicPath));
app.logger = logger;

const PORT = nconf.get('PORT') || 8000;
const HOST = nconf.get('HOST') || '0.0.0.0';

app.listen(PORT, HOST, () => {
  app.logger.info(`App is listening on port ${PORT}...`);
});

function setupLogger(nconf) {

  const w = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    //  new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //  new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.Console()
    ]
  });
  return w;
};
