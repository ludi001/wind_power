import BaseApplication from './base/BaseApplication'

module.exports = {
  name: 'app',
  component: BaseApplication,
  childRoutes: [{
      path: '/',
      childRoutes: [
        require('./cms'),
        require('./module'),
        require('./pages'),
        require('./module/404')
      ]
    }
  ]
}
