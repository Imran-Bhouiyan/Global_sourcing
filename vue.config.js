module.exports = {
  lintOnSave: false,

  // devServer: {
  //   open: process.platform === 'darwin',
  //   host: '128.199.175.207',
  //   port: 8080,
  // },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}
