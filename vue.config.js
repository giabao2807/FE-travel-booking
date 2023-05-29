/* eslint-disable comma-dangle */
/* eslint-disable quotes */
// eslint-disable-next-line no-undef, semi
const { defineConfig } = require("@vue/cli-service");
// eslint-disable-next-line no-undef
module.exports = defineConfig({
  // eslint-disable-next-line comma-dangle
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true,
  },
  // eslint-disable-next-line semi
});
