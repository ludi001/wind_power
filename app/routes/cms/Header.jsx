import React from 'react'
import {connect} from 'react-redux'
import styles from './Header.scss'
import actions from 'fengui/redux/actions'
import {browserHistory} from 'react-router'
import PageInfoEdit from './PageInfoEdit'
import logo from '../../img/cloudlinx.png'
var $ = require('jquery');
require('jquery.cookie');
let Header = React.createClass({
    componentDidMount(){
        this.props.init();
    },
    render() {
        let {compsList, changeFlag,goBack} = this.props;
        return (
            <div className={styles.mainBox1} id='Clheader'>
                <div id='sss2' style={{display:'none'}} ></div>
                <img  style={{height:'100%',width:'100%'}} src={logo} / >
                <div onClick={()=>goBack()} className={styles.btn}>返回</div>
            </div>
        );
    }
})

const mapStateToProps = (state) => {
    return {
        compsList: state.vars.importantDargCompsList,
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init:()=>{
            
        },
        goBack:()=>{
            browserHistory.push("/config/visualization/design")
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
