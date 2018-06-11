import React from 'react'
import styles from './PrePage.scss'
import {getPosition} from './darg/method'
import Elemet from '../../comps/Element'
import actions from 'fengui/redux/actions'
import {connect} from 'react-redux'
import {Icon} from 'antd'
import dragicon from '../../img/drag.png'
let ifbox=false;
import _ from 'lodash';
var $ =require('jquery');
let Comp = React.createClass({
  componentDidMount () {

    this.props.init()
  },
  
  render () {
    let {compsList, rowHeight, setActComps, activeComps,drag,getoffset} = this.props;
    sessionStorage.setItem('rowHeight',rowHeight)
    console.log('prepage',compsList)
    return (<div className={styles.mainBox} id='preboxl' onClick={()=>setActComps(1,2,1,false)}>
      {
        console.log(compsList),
        (compsList&&compsList.length>0&&compsList[0].compsOffset) && compsList.map((value, key)=> {
          console.log(22222222222,value.index)
          return (
            <div id={value.type+key} data-box={'box'}  onMouseEnter={()=>drag(value.type+key)} key={key}
             className={styles.compsBox}
              style={{zIndex:value.index?value.index:'0',boxShadow:activeComps.key === key?'0px 0px 10px #369':'none',width: rowHeight*value.width, height: rowHeight*value.height, top:value.compsOffset.y*rowHeight, left: value.compsOffset.x*rowHeight}}  onClick={()=>setActComps(value.type, key,compsList,true)}>
              <i className={styles.dragbox} onMouseUp={()=>getoffset(compsList,value.type,key)} onMouseDown={()=>setActComps(value.type, key,compsList,true)}  ><img src={dragicon} /></i>
              <Elemet {...value} />
            </div>
          )
        })
      }
    </div>)
  }
})

const mapStateToProps = (state) => {
  return {
    activeComps: state.vars.importantActiveComps,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   init:()=>{
    
   },

    setActComps: (type, key,compsList,bool) => {
      if(bool){
        dispatch(actions.setVars('importantActiveComps', {}));
        setTimeout(function(){
          dispatch(actions.setVars('iconcolor', true));
          dispatch(actions.setVars('importantActiveComps', {type:type, key:key}));
          let obj={}
          compsList.map(function(value,keyC){
            if(value.type==type&&keyC==key){
              obj=value
            }
          })
          $('#allbox1').css('display','block')
          let rowheight=Number(sessionStorage.getItem('rowHeight'))
          $('#allbox1').find('input').eq(0).val(obj.width)
          $('#allbox1').find('input').eq(1).val(obj.height)
          let x=Number(obj.compsOffset.x);
          let y=Number(obj.compsOffset.y);
          $('#allbox1').find('input').eq(2).val(parseInt(x))
          $('#allbox1').find('input').eq(3).val(parseInt(y))
          $('#allbox1').find('input').eq(4).val(obj.index)
        },100)
      }else{
         console.log('没有点击element')
         dispatch(actions.setVars('importantActiveComps', {}));
         $('#allbox1').css('display','none')
         dispatch(actions.setVars('iconcolor', false));
      }
     
         

    },
  
    drag:(id)=>{


        //获取高度
        let maskheight=$('#maskbox').height();
        let heightArr=[];//收集所有的top值
        let maxtop;//定义最大值
        $('#preboxl div').each(function(){
            if($(this).data('box')=='box'){
              var topy = Number($(this).css('top').replace("px",""));
              var heighty = Number($(this).css('height').replace("px",""));
                heightArr.push(topy+heighty)
            }
        })
        maxtop=Math.max.apply( Math, heightArr );
        if(maxtop>maskheight){
          $('#preboxl').height(maxtop+'px')
        }



     $("#"+id).dragging({
          move : 'both',
          randomPosition : false ,
          hander:$("#"+id).find('i')
        });

    },
    getoffset:(compsList,type,key)=>{
      setTimeout(function(){
         let nCompsList = _.cloneDeep(compsList);
         let obj={};
        nCompsList.map(function(valueC,keyC){
          if(valueC.type==type&&keyC==key){
              let rowheight1=Number(sessionStorage.getItem('rowHeight'))
              let allxy1=JSON.parse($.cookie('drag'))
              //获取坐标格数
              allxy1.x=parseInt((allxy1.x-200)/rowheight1);
              allxy1.y=parseInt((allxy1.y+$('#maskbox').scrollTop()-70)/rowheight1);
              valueC.compsOffset=allxy1
              obj=valueC
          }
        })

        $('#allbox1').find('input').eq(0).val(obj.width);
        $('#allbox1').find('input').eq(1).val(obj.height);
        let x=Number(obj.compsOffset.x);
        let y=Number(obj.compsOffset.y);
        $('#allbox1').find('input').eq(2).val(parseInt(x));
        $('#allbox1').find('input').eq(3).val(parseInt(y));
        $('#allbox1').find('input').eq(4).val(obj.index);

         console.log($.cookie('drag'))
        console.log(nCompsList)
        dispatch(actions.setVars('importantDargCompsList', nCompsList));



          //滚动条位置
        let maskheight=$('#maskbox').height();
        let heightArr=[maskheight];//收集所有的top值
        let maxtop;//定义最大值
        $('#preboxl div').each(function(){
            if($(this).data('box')=='box'){
              var topy = Number($(this).css('top').replace("px",""));
              var heighty = Number($(this).css('height').replace("px",""));
                heightArr.push(topy+heighty)
            }
        })

        console.log(12580,heightArr)
       
         maxtop=Math.max.apply( Math, heightArr );
    
        console.log(12580,maxtop)
        $('#preboxl').height(maxtop+'px')

       
      },500)

     
      
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comp)

