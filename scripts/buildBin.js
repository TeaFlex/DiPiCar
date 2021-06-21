#!/usr/bin/node

const { compile } = require('nexe');
const { join } = require('path');
const buildInfos = require('./buildInfos.json');
const packageInfos = require('../package.json');

console.log("🚗 Starting the binary build...");
compile({
    input:"./dist/main.js",
    output: join(`./build/${packageInfos["name"]}-${packageInfos["version"]}`, 
        buildInfos["binPath"], "dipicar_srv"),
    targets: "linux-arm64-14.15.4",
    build: true,
    resources: [
        "./production.env",
        "./public/*",
        "./dist/**/*",
        "./node_modules/pigpio/build/Release/pigpio.node",
        "./scripts/debian/usr/lib/dipicar/scripts/network/defaultConf.json"
    ],
    loglevel: "info",  
})
.then(() => {
    console.log("🏁 Binary build complete !");
})
.catch(console.error);
