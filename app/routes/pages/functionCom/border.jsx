import React from "react";
import {connect} from 'react-redux';
import actions from 'fengui/redux/actions';
import css from './border.scss';
let Component = React.createClass({
  componentDidMount() {
    this.props.init();
  },
  componentDidUpdate(){

  },
  render() {
    let {}=this.props;    
    return (
        <div className={css.box}>
            <div className={css.leftTop}></div>
            <div className={css.leftBottom}></div>   
            <div className={css.rightTop}></div>   
            <div className={css.rightBottom}></div>      
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
