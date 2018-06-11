import React from 'react'
import {connect} from 'react-redux'
import styles from './Tree.scss'
import {loading} from 'fengui/component/popup'
import {Menu, Icon} from 'antd'
import actions from 'fengui/redux/actions'
import {browserHistory} from 'react-router'
const SubMenu = Menu.SubMenu;
var $ =require('jquery');
let Tree = React.createClass({
  componentWillMount () {
    let {init} = this.props;
    init();
  },
  render () {
    let {activeNodes, treearr, activeKey,skinStyle,itemAct,colorAct,trunleft,cssif,changeTreeItem} = this.props;
    console.log(885,itemAct)
    return (
      <div id='ptxt' className={`${skinStyle==1?styles.navTreeBlue:skinStyle==2?styles.navTreeWhite:styles.navTree}
            ${cssif==='left'? styles.animate : skinStyle==1?styles.navTreeblue:skinStyle==2?styles.navTreewhite:styles.navTree}
            ${cssif==='right'? styles.animate1 : skinStyle==1?styles.navTreeblue:skinStyle==2?styles.navTreewhite:styles.navTree}`} style={{height:window.document.body.offsetHeight-60+'px'}}>
                {treearr && treearr.map((value, key)=> {
                    if(cssif=='left'){

                     
                            return (
                                <div key={key} className={itemAct == key ? styles.treeItemAct : styles.treeItem} title={value.moduleidname} style={{height:'40px'}} onClick={()=>changeTreeItem(key,value)}>
                                    <Icon type={"cloud"} style={{color:skinStyle!=2&&itemAct == key?'#3BA9AE':'#fff'}}/>
                                </div>
                            )
                    }else{
                      
                            return (
                                <div key={key} className={itemAct == key ? styles.treeItemAct : styles.treeItem} title={value.moduleidname} onClick={()=>changeTreeItem(key,value)}>
                                    <Icon type={"cloud"} style={{color:skinStyle!=2&&itemAct == key?'#3BA9AE':'#fff'}}/>
                                    <p>{value.moduleidname}</p>
                                </div>
                            )

                    }
                })}
                {
                  cssif!='left'&&<Icon type="backward" id='direction'  className={styles.trun}  onClick={()=>trunleft(cssif)} />
                }
                 {
                  cssif=='left'&&<Icon type="forward" id='direction'  className={styles.trun}  onClick={()=>trunleft(cssif)} />
                }
              
                
            </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    activeNodes: state.vars.treeActiveNods,
    activeKey: state.vars.headerActiveKey,
     itemAct: state.vars.treeItemActive,
     cssif: state.vars.cssif,
     colorAct: state.vars.colorAct,
    skinStyle: state.vars.skinStyle,
    treearr: state.vars.treearr,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
    },
    trunleft:(flagv)=>{
        if(flagv=='left'){
            flagv='right';             
        }else{
            flagv='left';               
        }
        dispatch(actions.setVars('cssif', flagv));
    },
    changeTreeItem:(key,page)=>{
        dispatch(actions.setVars('pagebool', false));//页面加载
        console.log(page)
        if(page.list.length>0){//判断是否有第三级菜单
            dispatch(actions.setVars('cltab', true));//显示第三级菜单
            dispatch(actions.setVars('tabarr', page.list));//将值赋给第三级菜单
            dispatch(actions.setVars('tabItemActive', 0));//默认第三级菜单第一项高亮
            browserHistory.push('/main/tree/'+page.list[0].moduleid);
        }else{
            dispatch(actions.setVars('cltab', false));//第三级菜单笑消失
            browserHistory.push('/main/tree/'+page.moduleid);
        }
        dispatch(actions.setVars('treeItemActive', key));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree)
