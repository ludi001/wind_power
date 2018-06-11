import React from 'react'
import {connect} from 'react-redux'
import actions from 'fengui/redux/actions'
import styles from './Content.scss'
import {Spin }from 'antd'
import  WebSoket from '../../../config/socketClient'
import Wholepage from './Wholepage'
import { browserHistory } from 'react-router';
import ipConfig from "../config.js";
let _index='001';
let Body = React.createClass({
  componentWillMount () {
    let {url} = this.props;
    this.props.init(url);
  },
  render () {
    let {url,getdom} = this.props;
    console.log(223,this)
    //停止websoket服务
    console.log(885,_index)
    WebSoket.getConnect(ipConfig.mqttIp,'ZQ/ZL1/Y1/L1/826/55000001',_index,function(data){
        console.log(767,data)
    },false)
    _index=url.pageid;
    getdom(url);
    return (
        <div className={styles.mainBox} id='pagebox'>
          <div id='getdom' style={{display:'none'}}></div>
          <Wholepage  url={url.pageid} />
        </div>
    )
    
  }
})

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: (url) => {

    },
    getdom:(url)=>{
      //获取HTML       
          //定制页面配置
            if(url.pagetype=="组装页面"){
              dispatch(actions.setVars('CLpageType', 'Customized'));//转向定制页面
            }else{
              //组装页面配置
              dispatch(actions.setVars('CLpageType', 'Assemble'));//转向组装页面
              Clajax2('/readPageMsg','post',{pageid:url.pageid},function(res2) {
              //$("#getdom").load(ipConfig.ajaxIp2+'readPageMsg',{pageid:res.data[0].pageid} ,function(res2) {
                console.log(res2,'组装数据')
                console.log(JSON.parse(res2.data))
                let complist=JSON.parse(res2.data);
                //判断是否数据源
                for(let i=0;i<complist.datadom.length;i++){
                  if(complist.datadom[i].type=="table1"){
                    //console.log('数据源',complist.datasourse)
                      //获取数据
                    let DataItem=[];
                    //complist.datasourse.map(function(value,key){
                      // if(value.type='ajax'){
                      //     let obj={}
                      //     obj=value.data;
                      //     console.log('obj',obj)
                      //     Clajax(value.url,value.type,obj,function(res,bol){
                      //       if(bol==true){
                      //          if(res.message=='ok'){
                      //             DataItem[value.id]=res.data;
                      //             dispatch(actions.setVars('PageData', DataItem)); 
                      //           }
                      //       }
                      //     })
                      // }else{
                        //console.log('这里是websoket方法');
                        complist.datadom[i].detail.datasourse.map(function(value,key){
                          console.log(value.pointid,'89')
                          DataItem[key]={'name':value.name,'number':'','num':''};     
                          DataItem[key].number=(value.pointid).toString();                   
                        })
                        console.log(78,DataItem);
                        WebSoket.getConnect('10.150.173.21:1884','01/01001/01001001/01001001002/01001001002001','23411',function(data){
                            console.log(77,DataItem);
                            let dataT=JSON.parse(data);
                            DataItem.map(function(value,key){ 
                              DataItem[key].num=dataT[DataItem[key].number];                             
                            })                            
                            dispatch(actions.setVars('PageData', false));
                            dispatch(actions.setVars('PageData', DataItem));
                        },true)  
                      //}
                    //})
                  }
                }
                
                  dispatch(actions.setVars('pagebool', false));
                  setTimeout(function(){
                    dispatch(actions.setVars('pagecomplist', complist.datadom));
                    dispatch(actions.setVars('pagebool', true));
                   
                       let heightArr1=[];//收集所有的top值
                       let maxtop1;//定义最大值
                       let initheight=$('#pagebox').height();//定义初始值
                      $('#CLpageheight div').each(function(){
                          if($(this).data('box')=='CLbox'){
                            var topy = Number($(this).css('top').replace("px",""));
                            var heighty = Number($(this).css('height').replace("px",""));
                              heightArr1.push(topy+heighty)
                          }
                      })
                       maxtop1=Math.max.apply( Math, heightArr1 );//获取数组中的最大值
                       if(maxtop1>initheight){
                        $('#CLpageheight').height(maxtop1+40+'px')
                       }else{
                        $('#CLpageheight').height(initheight+'px')
                       }
                       
                       console.log('数组',heightArr1)
                       console.log('最大值',maxtop1)
                       console.log('初始值',initheight)
                  },500)
               })
            }
      
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)
