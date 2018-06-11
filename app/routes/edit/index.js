module.exports = {
  path: '/',
  childRoutes: [
    {
      path: 'edit',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./Page.jsx'))
        })
      }
    },
  ]
}
