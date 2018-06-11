import React from "react";
import {connect} from 'react-redux';
import actions from 'fengui/redux/actions';
var $ = require('jquery');
import css from './tree.scss';
import ajax from '../functionCom/myAjax.js';
const myAjax=ajax.myAjax;
const myAjax2=ajax.myAjax2;
import data from "./data.js";//假数据
import add from "../img/add.png";//加号
import reduce from "../img/reduce.png";//减号
var {browserHistory} = require('react-router');
let Component = React.createClass({
  componentDidMount() {
    this.props.init(data);
  },
  componentDidUpdate(){

  },
  render() {
    let {params,showF,showS,showT,showFour,showFive,showSix,treeBool={},showTab,tabData,showPage,treeData}=this.props;
    return (
      <div className={css.treeBox}>
        <div className={css.mainTree}>
          <div className={css.header}>
            <span className={css.logo}></span>
            <span className={css.name}>广东省海域</span>
          </div>
          <ul className={css.ulF}>
          {
            treeData&&treeData.map((valueF,keyF)=>{
              return(
                <li key={keyF} className={css.liF} onClick={()=>showTab(valueF.classid,valueF.recordid)}>
                  <img src={treeBool[keyF] ? reduce:valueF.list ? add:reduce} onClick={()=>showF(keyF,treeBool)}/>{valueF.description}
                  <ul id={"ulS"+keyF}>
                    {
                      valueF.list&&valueF.list.map((valueS,keyS)=>{
                        return(
                          <li key={keyS}>
                            <img src={treeBool[keyF.toString()+keyS.toString()] ? reduce:valueS.list ? add:reduce} onClick={()=>showS(keyF,keyS,treeBool)} />{valueS.description}
                            <ul id={"ulT"+keyF+keyS}>
                              {
                                valueS.list&&valueS.list.map((valueT,keyT)=>{
                                  return(
                                    <li key={keyT}>
                                      <img src={treeBool[keyF.toString()+keyS.toString()+keyT.toString()] ? reduce:valueT.list ? add:reduce} onClick={()=>showT(keyF,keyS,keyT,treeBool)} />
                                      {valueT.description}
                                      <ul id={"ulT"+keyF+keyS+keyT}>
                                        {
                                          valueT.list&&valueT.list.map((valueFour,keyFour)=>{
                                            return(
                                              <li key={keyFour}>
                                                <img src={treeBool[keyF.toString()+keyS.toString()+keyT.toString()+keyFour.toString()] ? reduce:valueFour.list ? add:reduce} onClick={()=>showFour(keyF,keyS,keyT,keyFour,treeBool)} />
                                                {valueFour.description}
                                                <ul id={"ulT"+keyF+keyS+keyT+keyFour}>
                                                  {
                                                    valueFour.list&&valueFour.list.map((valueFive,keyFive)=>{
                                                      return(
                                                        <li key={keyFive}>
                                                          <img src={treeBool[keyF.toString()+keyS.toString()+keyT.toString()+keyFour.toString()+keyFive.toString()] ? reduce:valueFive.list ? add:reduce} onClick={()=>showFive(keyF,keyS,keyT,keyFour,keyFive,treeBool)} />
                                                          {valueFive.description}
                                                          <ul id={"ulT"+keyF+keyS+keyT+keyFour+keyFive}>
                                                            {
                                                              valueFive.list&&valueFive.list.map((valueSix,keySix)=>{
                                                                return(
                                                                  <li key={keySix}>
                                                                    <img src={treeBool[keyF.toString()+keyS.toString()+keyT.toString()+keyFour.toString()+keyFive.toString()+keySix.toString()] ? reduce:valueSix.list ? add:reduce} onClick={()=>showSix(keyF,keyS,keyT,keyFour,keyFive,keySix,treeBool)} />
                                                                    {valueSix.description}
                                                                  </li>
                                                                )
                                                              })
                                                            }
                                                          </ul>
                                                        </li>
                                                      )
                                                    })
                                                  }
                                                </ul>
                                              </li>
                                            )
                                          })
                                        }
                                      </ul>
                                    </li>
                                  )
                                })
                              }
                            </ul>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
          </ul>
        </div>
        <div className={css.tabTree}>
          {
            tabData&&tabData.map((value,key)=>{
              return(
                <div className={css.tabBox} key={key} onClick={()=>showPage(value)}>{value.pagename}</div>
              )              
            })
          }
        </div>
      </div> 
    )
  }
});
const mapStateToProps = (state) => {
    return {
        treeBool:state.vars.treeBool,
        tabData:state.vars.tabData,
        treeData:state.vars.treeData,
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    init: ()=> {
      let obj={
        url:'getLocations',
        requireType:"post"
      };
      myAjax(obj,success);
      function success(data){
        console.log('树',data);
        if(data.message=="操作成功"){
          dispatch(actions.setVars("treeData",data.data))
        }
      }      
    },
    showF:(key,treeBool)=>{//一级菜单收缩
      let objBool=treeBool;
      $("#ulS"+key).toggle(100);
      if(objBool[key]){
          objBool[key]=false;
          dispatch(actions.setVars("treeBool",null));
          dispatch(actions.setVars("treeBool",objBool))
      }else{
          objBool[key]=true;
          dispatch(actions.setVars("treeBool",null));
          dispatch(actions.setVars("treeBool",objBool))
      }      
    },
    showS:(keyF,keyS,treeBool)=>{//二级菜单收缩
      $("#ulT"+keyF+keyS).toggle(100);
      let objBool=treeBool;
      if(objBool[keyF.toString()+keyS.toString()]){
          objBool[keyF.toString()+keyS.toString()]=false;
          dispatch(actions.setVars("treeBool",null));
          dispatch(actions.setVars("treeBool",objBool))
      }else{
          objBool[keyF.toString()+keyS.toString()]=true;
          dispatch(actions.setVars("treeBool",null));
          dispatch(actions.setVars("treeBool",objBool))
      }
    },
    showT:(keyF,keyS,keyT,treeBool)=>{//三级菜单
      $("#ulT"+keyF+keyS+keyT).toggle(100);
      let objBool=treeBool;
      if(objBool[keyF.toString()+keyS.toString()+keyT.toString()]){
          objBool[keyF.toString()+keyS.toString()+keyT.toString()]=false;
          dispatch(actions.setVars("treeBool",null));
          dispatch(actions.setVars("treeBool",objBool))
      }else{
          objBool[keyF.toString()+keyS.toString()+keyT.toString()]=true;
          dispatch(actions.setVars("treeBool",null));
          dispatch(actions.setVars("treeBool",objBool))
      }
    },
    showFour:(keyF,keyS,keyT,keyFour,treeBool)=>{//四级菜单
      $("#ulT"+keyF+keyS+keyT+keyFour).toggle(100);
      let objBool=treeBool;
      if(objBool[keyF.toString()+keyS.toString()+keyT.toString()+keyFour.toString()]){
          objBool[keyF.toString()+keyS.toString()+keyT.toString()+keyFour.toString()]=false;
          dispatch(actions.setVars("treeBool",null));
          dispatch(actions.setVars("treeBool",objBool))
      }else{
          objBool[keyF.toString()+keyS.toString()+keyT.toString()+keyFour.toString()]=true;
          dispatch(actions.setVars("treeBool",null));
          dispatch(actions.setVars("treeBool",objBool))
      }
    },
    showFive:(keyF,keyS,keyT,keyFour,keyFive,treeBool)=>{//5级菜单
      $("#ulT"+keyF+keyS+keyT+keyFour+keyFive).toggle(100);
      let objBool=treeBool;
      if(objBool[keyF.toString()+keyS.toString()+keyT.toString()+keyFour.toString()+keyFive.toString()]){
          objBool[keyF.toString()+keyS.toString()+keyT.toString()+keyFour.toString()+keyFive.toString()]=false;
          dispatch(actions.setVars("treeBool",null));
          dispatch(actions.setVars("treeBool",objBool))
      }else{
          objBool[keyF.toString()+keyS.toString()+keyT.toString()+keyFour.toString()+keyFive.toString()]=true;
          dispatch(actions.setVars("treeBool",null));
          dispatch(actions.setVars("treeBool",objBool))
      }
    },
    showSix:(keyF,keyS,keyT,keyFour,keyFive,keySix,treeBool)=>{//6级菜单
      $("#ulT"+keyF+keyS+keyT+keyFour+keyFive+keySix).toggle(100);
      let objBool=treeBool;
      if(objBool[keyF.toString()+keyS.toString()+keyT.toString()+keyFour.toString()+keyFive.toString()+keySix.toString()]){
          objBool[keyF.toString()+keyS.toString()+keyT.toString()+keyFour.toString()+keyFive.toString()+keySix.toString()]=false;
          dispatch(actions.setVars("treeBool",null));
          dispatch(actions.setVars("treeBool",objBool))
      }else{
          objBool[keyF.toString()+keyS.toString()+keyT.toString()+keyFour.toString()+keyFive.toString()+keySix.toString()]=true;
          dispatch(actions.setVars("treeBool",null));
          dispatch(actions.setVars("treeBool",objBool))
      }
    },
    showTab:(classid,recordid)=>{
      let obj={
        url:'web/getEntryDataMenusList',
        requireType:"post",
        requireData:{
          'classid':classid,
          'recordid':recordid,
        }
      };
      myAjax2(obj,success);
      function success(data){
        console.log('tab',data);
        if(data.message=="ok"){
          dispatch(actions.setVars("tabData",data.data.list))
        }
      } 

      // let obj2={
      //   url:'web/getEntryDataPropety',//属性
      //   requireType:"post",
      //   requireData:{
      //     'classid':classid,
      //     'recordid':recordid,
      //   }
      // };
      // myAjax(obj2,success2);
      // function success2(data){
      //   console.log('属性',data);
      //   if(data.message=="ok"){
      //     //dispatch(actions.setVars("treeData",data.data))
      //   }
      // }
      // let obj3={
      //   url:'web/getEntryDataPointsList',//测点
      //   requireType:"post",
      //   requireData:{
      //     'classid':classid,
      //     'recordid':recordid,
      //   }
      // };
      // myAjax(obj3,success3);
      // function success3(data){
      //   console.log('测点',data);
      //   if(data.message=="ok"){
      //     //dispatch(actions.setVars("treeData",data.data))
      //   }
      // } 
    },
    showPage:(value)=>{
      browserHistory.push('/windPower/overview/'+value.pageid);
      dispatch(actions.setVars("showData",value))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
