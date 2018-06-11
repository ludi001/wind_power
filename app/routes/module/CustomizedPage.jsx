import React from 'react'
import {connect} from 'react-redux'
import actions from 'fengui/redux/actions'
import {Spin,Icon }from 'antd'
import styles from './CustomizedPage.scss'
import { browserHistory } from 'react-router'
var $ = require('jquery');
//页面配置信息
import Cockpit from '../CutPage/Cockpit'//01001003

let Body = React.createClass({
  componentWillMount () {
   
  },
   componentDidMount () {
 
  },
  render () {
    let {url} = this.props;
     
      switch (url) {
      case '01001003':
        return <Cockpit url={url}/>

      default:
        return <div style={{textAlign:'center',paddingTop:'30px',fontSize:'16px'}} >
                <p><Icon type="frown-o" style={{marginRight:'5px'}} />未找到对应页面！</p>
                <p>The page you requested was not found.</p>
              </div>
    }
    
  }
})

const mapStateToProps = (state) => {
  return {
   
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)
