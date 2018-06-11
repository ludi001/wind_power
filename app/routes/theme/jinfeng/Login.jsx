import React from "react";
import {connect} from 'react-redux';
var {browserHistory} = require('react-router');
import actions from 'fengui/redux/actions'
var $ = require('jquery');
import css from './Login.scss';
import {message} from 'antd'
require('jquery.cookie');
let codeChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let Component = React.createClass({
    componentDidMount() {
        this.props.init(this.props.userInfo);
          
    },
    loginw(){
        let bol=true;
        if($('#username1').val()==''||$('#password1').val()==''){
            message.error('用户名和密码不能为空！');
            bol=false;
        }else if($('#check')[0].value!==$('#checked')[0].value){
            message.error('验证码输入错误！');
            bol=false;
        }
            this.props.login(bol)
        
    },
    render() {
        let {loginText,user,pass,noNumbers,login,code,change,keylogin}=this.props;
        return (
  
            <div className={css.whole} style={{height:window.document.body.offsetHeight+'px'}}>
                <form className={css.loginBox}>
                    <input placeholder=" 用户名:" className={css.int} id="username1" type="text" name="username" onKeyDown={(e)=>user(e)}/><br/>
                    <input placeholder=" 密 码:" className={css.int} id="password1" type="password" name="password" onKeyDown={(e)=>pass(e)}/><br/>
                    <input placeholder=" 验证码:" className={css.ints} id="check" type="text" name="check" onKeyDown={(e)=>noNumbers(e)}/>
                    <input value={code} readOnly="readOnly" id="checked" onClick={()=>{change()}} className={css.pages}/><br/>
                    <input className={css.submit} id="denglu1" type="submit " value='登      录' readOnly="true" onClick={this.loginw} />
                </form>
            </div> 
        )
    }
});
const mapStateToProps = (state) => {
    return {
        code:state.vars.verificationCode,
        userMessage:state.objs.userMessage,
        loginText:state.vars.loginText,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: ()=> {
            
            let codeNew='';
            for (let i=0;i<4;i++){
                codeNew+=codeChars[Math.floor(Math.random()*36)]
            }
            dispatch(actions.setVars('verificationCode', codeNew));
            // browserHistory.push('/app/all/page/main');
        },
        change:()=>{
            let codeNew='';
            for (let i=0;i<4;i++){
                codeNew+=codeChars[Math.floor(Math.random()*36)]
            }
            dispatch(actions.setVars('verificationCode', codeNew));
        },
        user:(e)=>
        {
            var keynum;

            if(window.event) // IE
            {
                keynum = e.keyCode
            }
            else if(e.which) // Netscape/Firefox/Opera
            {
                keynum = e.which
            }
            if(keynum==13){
                $('#password1')[0].focus();
            }
        },
        pass:(e)=>
        {
            var keynum;

            if(window.event) // IE
            {
                keynum = e.keyCode
            }
            else if(e.which) // Netscape/Firefox/Opera
            {
                keynum = e.which
            }
            if(keynum==13){
                $('#check')[0].focus();
            }
        },
        noNumbers:(e)=>
        {
            var keynum;

            if(window.event) // IE
            {
                keynum = e.keyCode
            }
            else if(e.which) // Netscape/Firefox/Opera
            {
                keynum = e.which
            }
            if(keynum==13){
                if ($('#check')[0].value!==$('#checked')[0].value){
                    dispatch(actions.setVars('alertBool', false));
                    dispatch(actions.setVars('loginText', '验证码输入错误'));
                    $('#denglu1')[0].value='登     录';
                    $('#check')[0].value='';
                    let codeNew='';
                    for (let i=0;i<4;i++){
                        codeNew+=codeChars[Math.floor(Math.random()*36)]
                    }
                    dispatch(actions.setVars('verificationCode', codeNew));
                }else {
                    dispatch(actions.setVars('tabItemActive', $.cookie('session',true)));
                    sessionStorage.setItem('userNameT',$('#username1').val());
                    
                   
                }
            }
        },
        login:(bol)=>{
            if (!bol){
                let codeNew='';
                for (let i=0;i<4;i++){
                    codeNew+=codeChars[Math.floor(Math.random()*36)]
                }
                dispatch(actions.setVars('verificationCode', codeNew));
            }else {
                $.cookie('session',true)
                console.log(55555)
                window.location.href='http://localhost:8080/main/tree/tab'
                  sessionStorage.setItem('userNameT',$('#username1').val());

            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);