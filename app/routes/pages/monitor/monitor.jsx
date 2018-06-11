import React from "react";
import {connect} from 'react-redux';
import actions from 'fengui/redux/actions';
var $ = require('jquery');
import css from './monitor.scss';
import ajax from '../functionCom/myAjax.js';
const myAjax=ajax.myAjax;
import Header from "../Header.jsx";
import AlertBox from "../functionCom/alertBox.jsx";//弹框
let Component = React.createClass({
  componentDidMount() {
    this.props.init();
  },
  componentDidUpdate(){

  },
  render() {
    let {params}=this.props; 
    return (
    	<div className={css.monitor}>
    		<Header params={params}/>
    		实时监控
    	</div>    
    )
  }
});
const mapStateToProps = (state) => {
    return {
      
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    init: ()=> {
      
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
