import React from 'react';
import {connect} from 'react-redux';
import actions from 'fengui/redux/actions';
import styles from './nav.scss';
import {Icon,message} from 'antd';
import dataicon from '../../img/dataicon.png';
import dataicon1 from '../../img/dataicon1.png';
import DataSource from './DataSource/datasource';
import save from '../../img/icon_03.png';
//import prev2 from '../../img/icon_05.png';还原
import next from '../../img/icon_07.png';
import copy2 from '../../img/icon_09.png';
import copy3 from '../../img/icon_10.png';
import deLete from '../../img/icon_12.png';
import deLete1 from '../../img/icon_11.png';
import nav3 from '../../img/nav3.png';
import nav4 from '../../img/nav4.png';
import nav5 from '../../img/nav5.png';
import ipConfig from "../config.js";
var $ = require('jquery');
import  WebSoket from '../../../config/socketClient';
let _index=1;
 let style={
        color:'#fff',
        background:'#5ca4d6',
        borderRadius:'0 3px 3px 0',
    }
 let style1={
        color:'#fff',
        background:'#5ca4d6',
        borderRadius:'3px 0px 0px 3px',
 }
 let style2={
        background:'#e6e9ee',
        border:'1px solid #ccc',
        borderBottom:'none',

 }
let Components = React.createClass({

    getInitialState(){
        return{
            view:false,
            imgicon:false           
        }
    },
    componentDidMount () {
        this.props.init();
    },
    changeview(bool){
      this.setState({
          view:bool
      })
      this.props.look(bool)
    },
    changecolor(bl){
        if(bl){
            $('#dticon').css('color',"#fff")
            $('#dticon').css('background',"#5ba5d6")
        }else{
            $('#dticon').css('color',"#333")
            $('#dticon').css('background',"none")
        }        
        this.setState({
            imgicon:bl
        })
    },
   
    render () {
        let {installData,showedit,backprev,dataflag,showdatasource,prev,savepage,compsList,activeComps,copy,deletebox,iconcolor,CLdataAarr,trunview}=this.props;
        let {view,imgicon} = this.state;
        return (
            <div className={styles.mainbox}>
                {/**showedit==true&&<img src={nav3} style={{float:'left'}} />**/}
                {showedit!=true&&<div className={styles.icon} style={{marginLeft:'20px'}} onClick={()=>savepage(compsList,CLdataAarr,installData)}>
                    {/**<img src={save}/>**/}
                    <Icon type="save" />
                    <span>保存</span>      
                </div>}
                {showedit!=true&&<div className={styles.icon} onClick={()=>prev(backprev)} >
                  {/**<img src={prev2}/>**/}
                  <Icon type="rollback" />
                  <span>还原</span> 
                    
                </div>}
                {showedit!=true&&<div className={styles.icon} onClick={()=>copy(compsList,activeComps,iconcolor)} >
                    {/**<img src={iconcolor==true?copy2:copy3}/>**/}
                    <Icon type="copy" />
                    <span>复制</span> 
                   
                </div>}
                {showedit!=true&&<div className={styles.icon} onClick={()=>deletebox(compsList,activeComps,iconcolor)} >
                   {/**<img src={iconcolor==true?deLete:deLete1}/>**/}
                  <Icon type="delete" />
                  <span>删除</span> 
                   
                </div>}
                {showedit==true&&<div style={{float:'left',width:"33%",height:"5px"}}></div>}
                <div className={styles.view}>
                    <span style={view==false?style1:{}} onClick={()=>this.changeview(false)}>设计</span>
                    <span style={view==true?style:{}} onClick={()=>this.changeview(true)} >预览</span>
                </div>
                {/**showedit==true&&<img src={nav4} style={{float:'left'}} />**/}
                 {//showedit==true&&<img src={nav5} style={{float:'right'}} />
               }
                {showedit!=true&&<div id='dticon' className={styles.datasourse} onMouseEnter={()=>this.changecolor(true)} onMouseLeave={()=>this.changecolor(false)} onClick={()=>showdatasource()}>
                    {/**<img src={imgicon==true?dataicon1:dataicon} />**/}
                    <img src={dataicon1} />
                    <span>数据源</span>
                </div>}
                {dataflag&&<DataSource />}
                {
                //showedit!=true&&<div className={styles.themeBox} id='themeinput'>
                //     <label id='themelabel' >主题样式</label>
                //     <input  placeholder='请选择主题样式' />
                //     <div id='themelist' className={styles.themeList}>
                        
                //     </div>
                // </div>
              }
              <div className={styles.run} style={{float:'right'}} onClick={()=>trunview(installData)}>
                  {/**<Icon className={styles.runicon} type="check-circle" />**/}
                  <Icon className={styles.runicon} type="poweroff" />
                  <span>运行</span>
                </div>

            </div>
        )
    }
})


const mapStateToProps = (state) => {
    return {
       dataflag: state.vars.dataflag,
       compsList: state.vars.importantDargCompsList,
       activeComps: state.vars.importantActiveComps,
       iconcolor:state.vars.iconcolor,
       CLdataAarr:state.vars.CLdataAarr,
       backprev:state.vars.backprev,
       showedit:state.vars.showedit,
       installData:state.vars.installData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
           $('#themeinput').on('click',function(){
            console.log(1111)
              $('#themelist').css('display','block')
              $('#themelabel').css(style2)
              event.stopPropagation();
           })
           $('body').on('click',function(){
              $('#themelist').css('display','none')
              $('#themelabel').css({'background':'none',border:'none'})
           })
        },
        showdatasource:()=>{
            dispatch(actions.setVars('dataflag',true));
        },
        prev:(backprev)=>{
          if(backprev!=undefined&&backprev!=''){
            $('#allbox1').css('display','none')
            dispatch(actions.setVars('importantActiveComps', {}));
            dispatch(actions.setVars('importantDargCompsList', backprev));
          }          
        },
        savepage:(compsList,CLdataAarr,installData)=>{
          let pageid=window.location.search.replace(/[^0-9]/ig,""); 
          pageid=installData.PAGEID;
          console.log("保存数据",installData);
          console.log("保存数据id",installData.MODULEID);
          console.log(pageid,'ID');
          console.log("前保存数据0",compsList);
          let obj={};
          obj.MODULEID=installData.MODULEID;
          obj.datasourse=CLdataAarr;
          obj.datadom=compsList;
          console.log(obj)        
          Clajax2('/savePageMsg','post',{pageid: pageid,pageinfo: JSON.stringify(obj)},function(res){
              if(res.data){
                if(res.data.status=='ok'){
                  message.success('保存成功！')
                }else{
                  message.error('保存失败！')
                }
              }else{
                message.error(res)
              }
          })
        },
        copy:(compsList,activeComps,iconcolor)=>{
          if(iconcolor){
            let newobj={};
            let rowheight=Number(sessionStorage.getItem('rowHeight'));
            compsList.map(function(value,keyC){
              if(value.type==activeComps.type&&keyC==activeComps.key){
                newobj = _.cloneDeep(value);
              }
            })
            newobj.compsOffset.x=newobj.compsOffset.x+1;
            newobj.compsOffset.y=newobj.compsOffset.y+1;
          
            let x=Number(newobj.compsOffset.x);
            let y=Number(newobj.compsOffset.y);
            $('#allbox1').find('input').eq(2).val(parseInt(x))
            $('#allbox1').find('input').eq(3).val(parseInt(y))
            compsList.push(newobj)
            console.log(compsList)
            console.log(activeComps)
            dispatch(actions.setVars('importantActiveComps', {type: activeComps.type, key: activeComps.key+1}));
            dispatch(actions.setVars('importantDargCompsList', compsList));           
          }else{
            message.warning('请先选中一条数据!')
          }         
        },
        deletebox:(compsList,activeComps,iconcolor)=>{
          $('#allbox1').css('display','none')
          if(iconcolor){
          let delobj=0;
           compsList.map(function(value,keyC){
          if(value.type==activeComps.type&&keyC==activeComps.key){
             delobj=keyC;
            }
          })
           compsList.splice(delobj,1)
           console.log(compsList)
           dispatch(actions.setVars('importantDargCompsList', compsList));
           dispatch(actions.setVars('iconcolor', false));
           dispatch(actions.setVars('importantActiveComps', {}));

          
            }else{
            message.warning('请先选中一条数据!')
          }
        },
        look:(bool)=>{
          console.log(bool)
          
          dispatch(actions.setVars('showedit', bool));
          if(bool){
            $.cookie('nowheight',$('#preboxl').css('height'))
            
          }else if($.cookie('nowheight')){
            $('#preboxl').css('height',$.cookie('nowheight'))
            //停止websoket服务
             WebSoket.getConnect(ipConfig.mqttIp,'414','001',function(data){
                console.log(77,data)
              },false)
          }
          console.log($('#preboxl').css('height'))
        },
        trunview:(installData)=>{
          //let PageId=window.location.search.replace(/[^0-9]/ig,""); 
          let PageId=installData.PAGEID;
          console.log(PageId)
          //根据页面ID获取菜单ID
          Clajax2('/readPageMsg','post',{pageid:PageId},function(res,bol){
            console.log(res.data);
            let myData=JSON.parse(res.data);
            console.log(myData,'888')
            if(bol==true){
               window.open('http://localhost:8080/main/tree/'+myData.MODULEID,'win')
            }else{
              message.error('运行失败!')
            }
          })         
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Components)

