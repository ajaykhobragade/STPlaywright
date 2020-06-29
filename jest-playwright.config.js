const {
    selectorEngine,
  } = require('query-selector-shadow-dom/plugins/playwright');
  
module.exports = {
    selectors: [
      {name: 'shadow', script: selectorEngine}
    ],
}

module.exports = {
    server: {
      command: 'node server.js',
      port: 4444,
    },
  }

module.exports = {
    browsers: ["webkit", "chromium"],
    devices: ["iPhone 11 Pro", "Pixel 2"],
}

module.exports = {
    "setupFilesAfterEnv": ["expect-playwright"]
}

module.exports = {
  serverOptions: {
    command: 'node server.js',
    port: 4444,
  },
}

collectCoverage = true


