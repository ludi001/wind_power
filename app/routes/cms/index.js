module.exports = {
  path: '/',
  childRoutes: [
    {
      path: 'cloudlinx',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('./Page.jsx'))
        })
      }
    },
  ]
}
