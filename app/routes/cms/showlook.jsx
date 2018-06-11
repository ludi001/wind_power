import React from 'react'
import styles from './showlook.scss'
import {getPosition} from './darg/method'
import Elemet from '../../comps/Element'
import actions from 'fengui/redux/actions'
import {connect} from 'react-redux'
import {Spin }from 'antd'
import  WebSoket from '../../../config/socketClient'
var $ =require('jquery');
let Comp = React.createClass({
  componentWillMount () {
    let{datasource,DataItem}=this.props;
     console.log(12,datasource)
    // console.log(23,datasource)
    // console.log(apiClient(datasource))
    this.props.apiclent(datasource,DataItem)
  },
  componentDidMount () {
    let {setHeight} = this.props;
    setHeight($(this.refs.showbox1).width() / 24);
  },
  render () {
    let {compsList, setActComps, activeComps,showboxborder,rowHeight1,showbool,DataItem,datasource} = this.props;
   if(showbool){
    return (<div className={styles.mainBox} ref='showbox1' id='maxy'>
      {
        compsList && compsList.map((value, key)=> {
          return (
            <div key={key} data-box1={'box1'} className={styles.compsBox} style={{zIndex:value.index?value.index:'0',width:value.width*rowHeight1,height:value.height*rowHeight1,top:value.compsOffset.y*rowHeight1,left:value.compsOffset.x*rowHeight1}}>
              <Elemet {...value} DataSourse={DataItem} />
            </div>
          )
        })
      }
    </div>)
  }else{
    return(
      <div className={styles.mainBox} ref='showbox1'>
        <Spin style={{marginTop:'40px'}} />
      </div>
      )
  }
  }
})

const mapStateToProps = (state) => {
  return {
    activeComps: state.vars.importantActiveComps,
    rowHeight1: state.vars.importantRowHeight1,
    showbool:state.vars.showbool,
    DataItem:state.vars.DataItem,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    apiclent:(datasource,DataItem)=>{

      console.log('pppp',datasource)
       DataItem={};
      if(datasource){
        datasource.map(function(value,key){
          if(value.type!='websoket'){
            let obj={}
            obj=value.data;
            console.log('obj',obj)
              Clajax(value.url,value.type,obj,function(res,bol){
                console.log(res)
                if(bol==true){
                   if(res.message=='ok'){

                      DataItem[value.id]=res.data;
                      dispatch(actions.setVars('DataItem', DataItem)); 
                    }
                }
              })
          }else{
            //console.log('这里是websoket方法');
              WebSoket.getConnect(value.url,value.data,'001',function(data){
                console.log(77,data)
                dispatch(actions.setVars('DataItem', false));
                DataItem[value.id]=data;
                dispatch(actions.setVars('DataItem', DataItem));
              },true)
          }
        })
      }
 
    },

     setHeight: (height) => {
      console.log(height)
      dispatch(actions.setVars('importantRowHeight1', height));
      dispatch(actions.setVars('showbool', false));
      setTimeout(function(){
        dispatch(actions.setVars('showbool', true));

         let heightArr1=[$('#maxy').height()];//收集所有的top值
        let maxtop1;//定义最大值
        $('#maxy div').each(function(){
            if($(this).data('box1')=='box1'){
              var topy = Number($(this).css('top').replace("px",""));
              var heighty = Number($(this).css('height').replace("px",""));
                heightArr1.push(topy+heighty)
            }
        })
         maxtop1=Math.max.apply( Math, heightArr1 );
         $('#maxy').height(maxtop1+0+'px')

      },600)



      



      
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comp)

