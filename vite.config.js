const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'share-place': resolve(__dirname, 'my-place/index.html')
      }
    }
  }
});
