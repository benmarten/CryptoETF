module.exports = new function() {
  // noinspection ES6ModulesDependencies
  switch (process.env.NODE_ENV) {
    case 'test':
      return require('./../settings.test.json')

    default:
      return require('./../settings.json')
  }
}()