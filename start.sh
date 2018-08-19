#! /bin/sh

pwd
ls -lF

npm install
webpack
node app/server.js
