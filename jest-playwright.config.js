/* const {
    selectorEngine,
  } = require('query-selector-shadow-dom/plugins/playwright');
  
module.exports = {
    selectors: [
      {name: 'shadow', script: selectorEngine}
    ],
} */

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
  serverOptions: {
    command: "npm start",
    port: 3000,
    launchTimeout: 10000,
    debug: true,
    options: {
      env: {
        E2E_TESTS: "true"
      }
      }
  },
  collectCoverage: true
}



{
  "extends"; [
      "plugin:jest-playwright/recommended"
  ]
}
module.exports = {
  preset: 'jest-playwright-preset',
}