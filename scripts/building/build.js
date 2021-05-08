const { compile } = require('nexe');

console.log("🚗 Starting the build...");
compile({
    input:"./dist/main.js",
    output:"./build/dipicar_srv",
    targets: "linux-arm64-14.15.4",
    build: true,
    resources: [
        "./*.env",
        "./scripts/**/*",
        "./public/*",
        "./dist/**/*",
        "./configuration_files/**/*",
        "./node_modules/pigpio"
    ],
    loglevel: "info",
})
.then(() => {
    console.log("🏁 Build complete !");
})
.catch(console.error);
