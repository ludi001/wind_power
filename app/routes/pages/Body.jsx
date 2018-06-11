import React from "react";
import {connect} from 'react-redux';
import FixedContent from '../../components/FixedContent.jsx';//屏幕调整
import actions from 'fengui/redux/actions';
var $ = require('jquery');
import css from './Body.scss';
import ajax from './functionCom/myAjax.js';
const myAjax=ajax.myAjax;
import Header from "./Header.jsx";
import AlertBox from "./functionCom/alertBox.jsx";//弹框
let Component = React.createClass({
  componentDidMount() {
    this.props.init();
    //this.props.stop();
  },
  componentDidUpdate(){

  },
  render() {
    let {params}=this.props; 
    return (
      <FixedContent mode="fullWidth">
        {
          <div className={css.whole}> 
            <Header params={params}/>
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
