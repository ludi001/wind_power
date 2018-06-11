import React from 'react'
import {connect} from 'react-redux'
import actions from 'fengui/redux/actions'
import styles from './nowpage.scss'
import {Spin }from 'antd'

import { browserHistory } from 'react-router'
import Elemet from '../../comps/Element'
var $ = require('jquery');

let Body = React.createClass({
  componentWillMount () {
    let {} = this.props;
    this.props.init();
  },
   componentDidMount () {
    let {setHeight1,pagecomplist} = this.props;
    setHeight1($('#pagebox').width() / 24,pagecomplist);
  },
  render () {
    let {pagebool,pagecomplist,url,pageheight,PageData} = this.props;
       if(pagebool){
      return (
        <div className={styles.mainBox} id='CLpageheight'>
        {
          pagecomplist&&pagecomplist.map((value,key)=>{
          return (
            <div key={key} data-box={'CLbox'} className={styles.compsBox} style={{zIndex:value.index?value.index:'0',width:value.width*pageheight,height:value.height*pageheight,top:value.compsOffset.y*pageheight,left:value.compsOffset.x*pageheight}}>
              <Elemet {...value} DataSourse={PageData} />
            </div>
          )
        })
        }
        </div>
        )
    }else{
      return(
        <div className={styles.mainBox} style={{textAlign:'center'}}>
          <Spin style={{marginTop:'40px'}} />
        </div>
        )
    }
  }
})

const mapStateToProps = (state) => {
  return {
    pagebool:state.vars.pagebool,
    pagecomplist:state.vars.pagecomplist,
    pageheight:state.vars.pageheight,
    PageData:state.vars.PageData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
    },
    setHeight1:(height,pagecomplist)=>{
      dispatch(actions.setVars('pageheight', height));
    },
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)
