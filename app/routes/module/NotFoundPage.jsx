import React from 'react'

export default class NotFoundPage extends React.Component {
  static getProps () {
    return {}
  }

  render () {
    return <div style={{textAlign:'center',paddingTop:'30px'}}>
      <h2>页面错误！</h2>
      <p>The page you requested was not found.</p>
    </div>
  }
}
