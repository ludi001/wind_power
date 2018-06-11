import React from "react";
import {connect} from 'react-redux';
import actions from 'fengui/redux/actions';
var $ = require('jquery');
import css from './alertText.scss';
let Component = React.createClass({
  componentDidMount() {
    this.props.init();
  },
  componentDidUpdate(){

  },
  render() {
    let {alertText}=this.props;   
    return (
      <div className={css.alertText}>
        <span>{alertText}</span>
      </div>   
    )
  }
});
const mapStateToProps = (state) => {
    return {
      alertText: state.vars.alertText,
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    init: ()=> {
      setTimeout(function(){
        dispatch(actions.setVars('alertBool',false));
      },1000)      
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
