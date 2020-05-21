module.exports = {
  // devServer: {
  //   open: process.platform === "darwin",
  //   host: "0.0.0.0",
  //   port: 8080, // CHANGE YOUR PORT HERE!
  //   https: false,
  //   hotOnly: false
  // },
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/firebase-messaging-sw.js"
    }
  }
};
