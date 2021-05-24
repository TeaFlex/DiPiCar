#!/usr/bin/node

const { compile } = require('nexe');
const { join } = require('path');
const buildInfos = require('./buildInfos.json');

console.log("🚗 Starting the build...");
compile({
    input:"./dist/main.js",
    output: join("./build/dipicar", buildInfos["binPath"], "dipicar_srv"),
    targets: "linux-arm64-14.15.4",
    build: true,
    resources: [
        "./production.env",
        "./scripts/**/*",
        "./public/*",
        "./dist/**/*",
        "./node_modules/pigpio/build/Release/pigpio.node"
    ],
    loglevel: "info",  
})
.then(() => {
    console.log("🏁 Build complete !");
})
.catch(console.error);
