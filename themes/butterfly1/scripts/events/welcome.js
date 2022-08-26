const logger = require('hexo-log')()

hexo.on('ready', () => {
  const { version } = require('../../package.json')
  logger.info(`Butterfly ${version} By JerryC LYX修改版
============================================================`)
})
