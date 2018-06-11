import React from "react";
import {connect} from 'react-redux';
import actions from 'fengui/redux/actions';
var $ = require('jquery');
import css from './planning.scss';
import ajax from '../functionCom/myAjax.js';
const myAjax=ajax.myAjax;
import Header from "../Header.jsx";
import AlertBox from "../functionCom/alertBox.jsx";//弹框
import FixedContent from '../../../components/FixedContent.jsx';//屏幕调整
let Component = React.createClass({
  componentDidMount() {
    this.props.init();
  },
  componentDidUpdate(){

  },
  render() {
    let {params}=this.props; 
    return (
      <FixedContent mode="fullWidth">
        {
          <div className={css.planning}>
            <Header params={params}/>
            <div className={css.float}></div>
            <div className={css.contentBox}>
              建设规划
            </div>
          </div> 
        }
      </FixedContent>    
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
