module.exports = {
  	path: 'windPower/',
  	childRoutes: [
    {
    	path: 'overview/:pageId',//总体概览--
    	getComponent(nextState, cb) {
      		require.ensure([], (require) => {
        		cb(null, require('./overview/overview.jsx'))
      		})
    	}
  	},{
      path: 'planning/:pageId',//建设规划
      getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./planning/planning.jsx'))
          })
      }
    },{
      path: 'monitor/:pageId',//实时监控
      getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./monitor/monitor.jsx'))
          })
      }
    },{
      path: 'weather/:pageId',//气象分析
      getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./weather/weather.jsx'))
          })
      }
    },{
      path: 'data/:pageId',//数据服务
      getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./data/data.jsx'))
          })
      }
    },{
      path: 'app/:pageId',//App市场
      getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('./app/app.jsx'))
          })
      }
    },{
    	path: 'login',
    	getComponent(nextState, cb) {
      		require.ensure([], (require) => {
        		cb(null, require('./Login'))
      		})
    	}
  	}
    ]
};
