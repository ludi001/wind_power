import React from 'react';
import {connect} from 'react-redux';
import styles from './Tab.scss';
import actions from 'fengui/redux/actions'
import {browserHistory} from 'react-router'
import  WebSoket from '../../../../config/socketClient'
let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },
    render() {
        let {tabactive=0,itemActive, changeTabItem,skinStyle,tabarr} = this.props;
        return (
            <div className={skinStyle==1?styles.navTabBlue:skinStyle==2?styles.navTabWhite:styles.navTab}>
                {
                    
                    tabarr && tabarr.map((value, key)=> {
                      
                        return (
                            <div key={key}>
                                <span className={itemActive == key ? styles.tabItemAct : styles.tabItem}
                                     onClick={()=>changeTabItem(key,value)}>
                                     {value.moduleidname}
                                </span>
                                <span className={styles.tabItemIcon}>|</span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
        itemActive: state.vars.tabItemActive,
        hide: state.vars.navhide,
        skinStyle: state.vars.skinStyle,
        tabactive:state.vars.tabactive,
        activeKey: state.vars.headerActiveKey,
        tabarr:state.vars.tabarr,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {

             
        },
        changeTabItem: (key, value) => {
            dispatch(actions.setVars('pagebool', false));//页面加载
            dispatch(actions.setVars('tabItemActive', key));
            browserHistory.push('/main/tree/'+value.moduleid);      
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
