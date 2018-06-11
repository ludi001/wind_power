import React from "react";
import {connect} from 'react-redux';
import actions from 'fengui/redux/actions';
var $ = require('jquery');
import css from './app.scss';
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
    	<div className={css.data}>
    		<Header params={params}/>
    		app市场
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
