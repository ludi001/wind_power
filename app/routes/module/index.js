module.exports = {
  path: '/',
  childRoutes: [
    {
      path: 'main/tree/:page',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./Page.jsx'))
        })
      }
    },
  ]
}
