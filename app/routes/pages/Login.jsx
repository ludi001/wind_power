import React from "react";
import {connect} from 'react-redux';
import FixedContent from '../../components/FixedContent.jsx';//屏幕调整
import actions from 'fengui/redux/actions';
var $ = require('jquery');
import css from './Login.scss';
import ajax from './functionCom/myAjax.js';
const myAjax=ajax.myAjax2;
var {browserHistory} = require('react-router');
import AlertBox from "./functionCom/alertBox.jsx";//弹框
let Component = React.createClass({
  componentDidMount() {
    this.props.init();
    //this.props.stop();
  },
  componentDidUpdate(){

  },
  render() {
    let {login,alertBool=false,keylogin}=this.props;    
    return (
      <FixedContent mode="fullWidth">
        {
          <div className={css.login}> 
            {alertBool&&<AlertBox/>}
          	<div className={css.iuputBox}>
              <div className={css.logo}>
                <span className={css.img}></span>
                <span className={css.name}>微护卫</span>
              </div>
              <div className={css.title}>
                微看智慧安保云平台系统
              </div>
              <div className={css.text}>
                用户登陆
              </div>
              <div className={css.loginBox}>
                <div className={css.user}>
                  <span></span>
                  <input onKeyDown={(e)=>keylogin(e)} id="userName" placeholder="请输入您的账号"/>
                </div>
                <div className={css.password}>
                  <span></span>
                  <input onKeyDown={(e)=>keylogin(e)} id="password" type="password" placeholder="请输入您的密码"/>
                </div>
                <div className={css.btn} id="login" onClick={()=>login()}>
                  登陆
                </div>
              </div>
          	</div>
          </div>
        }
      </FixedContent>    
    )
  }
});
const mapStateToProps = (state) => {
    return {
      alertBool:state.vars.alertBool,
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    init: ()=> {

    },
    keylogin:(e)=>{
        var theEvent = e || window.event;    
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;    
        if (code == 13) {    
          //回车执行查询
          if($("#userName").val()==''){
            dispatch(actions.setVars('alertBool',true));
            dispatch(actions.setVars('alertText','请填写用户名'))
          }else if($("#password").val()==''){
            dispatch(actions.setVars('alertBool',true));
            dispatch(actions.setVars('alertText','请填写密码'))
          }else{
              let requireData={
                "ifname": "login",
                "loginid":$("#userName").val(),
                "password":$("#password").val()    
              }
              let obj={
                url:'web/LoginService',
                requireData: JSON.stringify(requireData),
                requireType:'post',
                async: true,        
              }
              myAjax(obj,success);
              function success(data){
                console.log(data);
                if(data.data.id==1){
                    dispatch(actions.setVars('userName',$("#userName").val()));
                    dispatch(actions.setVars('password',$("#password").val()));
                    browserHistory.push('/windPower/overview/main');
                }
              };
          }       
        }
    },
    login:()=>{
      if($("#userName").val()==''){
        dispatch(actions.setVars('alertBool',true));
        dispatch(actions.setVars('alertText','请填写用户名'))
      }else if($("#password").val()==''){
        dispatch(actions.setVars('alertBool',true));
        dispatch(actions.setVars('alertText','请填写密码'))
      }else{
          let requireData={
            "ifname": "login",
            "loginid":$("#userName").val(),
            "password":$("#password").val()    
          }
          let obj={
            url:'web/LoginService',
            requireData: JSON.stringify(requireData),
            requireType:'post',
            async: true,        
          }
          myAjax(obj,success);
          function success(data){
            console.log(data);
            if(data.data.id==1){
                dispatch(actions.setVars('userName',$("#userName").val()));
                dispatch(actions.setVars('password',$("#password").val()));
                browserHistory.push('/windPower/overview/main');
            }
          };
      }    
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
