import React from 'react'
import {connect} from 'react-redux'
import styles from './Header.scss'
import {Menu, Icon} from 'antd'
import actions from 'fengui/redux/actions'
import { browserHistory } from 'react-router'
import Tree from './Tree'
import Body from './Body'
import logo from '../../../img/projectlogo.png'


let Header = React.createClass({
  componentDidMount () {
    let {init, params, pageinfo} = this.props;
    init(params, pageinfo);
  },
  changeleixing(){
      $('#citem').on('click',function(){
                $('#shows').show();
            });
       $('#shows').mouseleave(function(){
          $(this).hide()
      })
  },
  render() {
    let {treearr,params,type,cltree,backlogin, conback,itemActive,activeKey,headerItemActive,skinStyle, pageinfo,changeHeaderItem,changeSkin} = this.props;
    console.log(1,cltree)    
    return (
          <div className={skinStyle==1?styles.navHeaderBlue:skinStyle==2?styles.navHeaderWhite:styles.navHeader}>
                <div className={styles.navIcon} onClick={()=>conback(pageinfo.menus)} >
                    <img src={logo} />
                </div>
                <div className={styles.methodBox}>
                    {
                        pageinfo.menus.map((value, key) => {                            
                            return (
                                <div key={key} className={itemActive === key ? styles.itemBoxAct : styles.itemBox} onClick={()=>changeHeaderItem(value,key)}>
                                    <Icon type={"cloud"} style={{color:itemActive===key?'#26f4ff':'#fff',marginRight:'5px'}} />
                                    <span>{value.moduleidname}</span>
                                </div>
                            )
                        })
                    }
                    <div className={`${styles.itemBoxAct} ${styles.nobor}`}><span>|</span></div>
                    <div className={styles.itemBox}><span style={{fontSize:'16px',marginRight:'0px'}}><Icon type="down-circle" id='citem' onClick={this.changeleixing} /></span></div>
                    <div className={ styles.pagestyle} id='shows'>
                        <div className={ styles.itemstyle} style={{borderColor:'#000'}} onClick={()=>changeSkin(0)}>雅黑</div>
                        <div className={ styles.itemstyle} style={{borderColor:'#2ff4fb'}} onClick={()=>changeSkin(1)}>深蓝</div>
                        <div className={ styles.itemstyle} style={{borderColor:'#fff'}} onClick={()=>changeSkin(2)}>亮白</div>
                    </div>
                    <div className={styles.itemBox}><span style={{marginRight:'10px'}}>{sessionStorage.getItem('userNameT')}</span></div>
                    <div className={styles.itemBox}><span onClick={()=>backlogin()} >退出</span></div>
                </div>

                {cltree==true&&<Tree params={params}  />}
                <Body params={params}  pageinfo={pageinfo}/>
          </div>
    );
  }
})

const mapStateToProps = (state) => {
  return {
    activeKey: state.vars.headerActiveKey,
    itemActive: state.vars.headerItemActive,
    skinStyle: state.vars.skinStyle,
    cltree: state.vars.cltree,
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: (params, pageinfo) => {
      console.log(params,pageinfo,'header加载')
      pageinfo.menus.map(function(value,key){
        //判断一级菜单是否为当前页
        if(value.moduleid===params.page){
          //二级菜单消失
          dispatch(actions.setVars('cltree', false));
          console.log('二级菜单消失')
          //三级菜单消失
          dispatch(actions.setVars('cltab', false));
          //一级菜单当前页高亮
          dispatch(actions.setVars('headerItemActive', key));
           
        }else if(value.list.length>0){//判断是否有二级菜单

          value.list.map(function(valueC,keyC){
            //判断二级菜单是否为当前页
            if(valueC.moduleid===params.page){
                //将当前菜单下的二级菜单传入
                dispatch(actions.setVars('treearr', value.list));
                //二级菜单显示
                dispatch(actions.setVars('cltree', true));
                console.log('二级菜单显示')
              //三级菜单消失
              dispatch(actions.setVars('cltab', false));
              //一级菜单当前页高亮
              dispatch(actions.setVars('headerItemActive', key));
              //二级菜单当前页高亮
              dispatch(actions.setVars('treeItemActive', keyC));
               
            }else if(valueC.list.length>0){
                valueC.list.map(function(valueD,keyD){
                  //判断三级菜单是否为当前页
                  if(valueD.moduleid===params.page){
                     //将当前菜单下的二级菜单传入
                      dispatch(actions.setVars('treearr', value.list));
                      //二级菜单显示
                      dispatch(actions.setVars('cltree', true));
                     //将当前菜单下的三级菜单传入
                      dispatch(actions.setVars('tabarr', valueC.list));
                      //三级菜单显示
                      dispatch(actions.setVars('cltab', true));
                       //一级菜单当前页高亮
                      dispatch(actions.setVars('headerItemActive', key));
                      //二级菜单当前页高亮
                      dispatch(actions.setVars('treeItemActive', keyC));
                      //三级菜单当前页高亮
                      dispatch(actions.setVars('tabItemActive', keyD));
                  }
                })
             
            }
          })
        
        }
      })  
    },
    changeHeaderItem:(menu,key)=>{
      dispatch(actions.setVars('pagebool', false));//页面加载
      console.log('切换',menu)
      if(menu.list.length>0){//判断是否有二级菜单
        dispatch(actions.setVars('cltree', true));//二级菜单显示
        //将当前菜单下的二级菜单传入
        dispatch(actions.setVars('treearr', menu.list));
        dispatch(actions.setVars('treeItemActive', 0));//默认第二级菜单第一项高亮
        if(menu.list[0].list.length>0){//判断是否有三级菜单
          dispatch(actions.setVars('cltab', true));//三级菜单显示
          dispatch(actions.setVars('tabarr', menu.list[0].list));//将值赋给第三级菜单
          dispatch(actions.setVars('tabItemActive', 0));//默认第三级菜单第一项高亮
          browserHistory.push('/main/tree/'+menu.list[0].list[0].moduleid);
        }else{
          dispatch(actions.setVars('cltab', false));//三级菜单消失
          browserHistory.push('/main/tree/'+menu.list[0].moduleid);
        }

      }else{
        dispatch(actions.setVars('cltree', false));//二级菜单消失
        dispatch(actions.setVars('cltab', false));//三级菜单消失
        browserHistory.push('/main/tree/'+menu.moduleid);

      }
       dispatch(actions.setVars('headerItemActive', key));
       dispatch(actions.setVars('cssif', false));//阻止tree动画
    },
     
    changeSkin:(colorNum)=>{
            dispatch(actions.setVars('skinStyle', colorNum));
            localStorage.setItem("skinStyle", colorNum);
        },
    conback:(url)=>{
      dispatch(actions.setVars('headerItemActive', 0));
      dispatch(actions.setVars('treeItemActive', 0));
      dispatch(actions.setVars('headerActiveKey', 0));
      dispatch(actions.setVars('tabItemActive', 0));
      dispatch(actions.setVars('tabarr', url[0].tree[0].subMenu));
      browserHistory.push(url[0].mainPage);
    },
    backlogin:()=>{
      $.cookie('session','false');
       window.location.href='http://localhost:8080/main/tree/tab'
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
