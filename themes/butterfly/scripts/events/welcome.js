const logger = require('hexo-log')()

hexo.on('ready', () => {
  const { version } = require('../../package.json')
  logger.info(`Hexo Acryple theme based Butterfly ${version}
============================================================`)
})
