import React from "react";
import {connect} from 'react-redux';
import actions from 'fengui/redux/actions';
var $ = require('jquery');
import css from './Header.scss';
import navData from './functionCom/data.js';
var {browserHistory} = require('react-router');
let Component = React.createClass({
  componentDidMount() {
    this.props.init();
  },
  componentDidUpdate(){

  },
  render() {
    let {params,showPage,userName}=this.props;    
    let local=window.location.pathname.split('/');
    return (
        <div className={css.header}>
        	<div className={css.logo}>
        		<span className={css.img}></span>
        	</div>
        	<div className={css.name}>
        		{/**userName&&userName**/}
        	</div>
        	<div className={css.nav}>
        		<ul>
	        	{
	        		navData&&navData.nav.map((value,key)=>{
	        			return(
	        				<li onClick={()=>showPage(value.menu)} key={key}>
	        					<img src={local[2]==value.menu ? value.iconActive:value.icon} />
	        					<span style={{color:local[2]==value.menu ? '#6a97ed':'#fff'}}>{value.name}</span>
	        				</li>
	        			)
	        		})
	        	}
	        	</ul>
        	</div>        	
        </div> 
    )
  }
});
const mapStateToProps = (state) => {
    return {
        userName: state.vars.userName
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    init: ()=> {
      
    },
    showPage:(menu)=>{
    	browserHistory.push('/windPower/'+menu+'/main')
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
