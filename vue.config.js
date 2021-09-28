module.exports = {
  css: {
    loaderOptions: {
      scss: { prependData: `@import "~@/assets/scss/style.scss";` }
    }
  },
  devServer: {
    port: 8001
  }
};
