import React from 'react'
import {connect} from 'react-redux'
import actions from 'fengui/redux/actions'
import styles from './Wholepage.scss'
import {Spin }from 'antd'
import Nowpage from './nowpage'
import CustomizedPage from './CustomizedPage'
import { browserHistory } from 'react-router'
var $ = require('jquery');

let Body = React.createClass({
  componentWillMount () {
   
  },
   componentDidMount () {
 
  },
  render () {
    let {url,CLpageType} = this.props;
     console.log(887,CLpageType)
      return(
        <div className={styles.mainBox}>
         {CLpageType==='Customized'&&<CustomizedPage url={url} />}
         {CLpageType==='Assemble'&& <Nowpage url={url} />}
        </div>
        )
    
  }
})

const mapStateToProps = (state) => {
  return {
    CLpageType:state.vars.CLpageType,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)
