import React from 'react';
import {connect} from 'react-redux';
import { Popconfirm, message,Icon } from 'antd';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';
import styles from './CLtable.scss';
import data from './data';
var $ = require('jquery');
let Component = React.createClass({
    
    componentDidMount() {
        this.props.init()
    },

    render() {
        let {detail,DataSourse}=this.props.compInfo;
        console.log('table',DataSourse)
        let str=[];
        let dataw=[];
         if(DataSourse&&detail.datasourse&&detail.title){
            let arr = detail.title.split(".");
            let arr1 = detail.datasourse.split(".");
            let obj=DataSourse;
            let obj1=DataSourse;
                arr.map(function(value,key){
                  if(obj!=undefined){
                    obj=obj[value]
                  }
                })
                arr1.map(function(value,key){
                  if(obj1!=undefined){
                    obj1=obj1[value]
                  }
                })
               str=obj; 
               dataw=obj1; 
        }else{
          str=data.tabletitledata;
          dataw=DataSourse;
        }
        
        return (
            <div  className={styles.tabbox} style={{width:detail.width+'%',borderWidth:detail.borderWidth+'px',borderStyle:detail.borderStyle,borderColor:detail.borderColor,marginLeft:detail.marginLeft+'px',marginTop:detail.marginTop+'px',}} >
               <div className={styles.Theader} style={{lineHeight:detail.titheight+'px',height:detail.titheight+'px',fontSize:Number(detail.fontSize)+2+'px',color:detail.color,backgroundColor:detail.backgroundColor}} >
                { str.map((value,key)=>{
                    return(
                        <span key={key} style={{width:(100/str.length)+'%'}}>
                        <b style={{fontWeight:detail.fontWeight=='true'?'bold':'normal',}}>{value.title}</b>
                        </span>
                        )
                 })
               }
                </div>
                <div className={styles.Tbody} style={{height:detail.txtheight+'px',fontSize:detail.fontSize+'px',lineHeight:detail.conheight+'px',color:detail.color1,backgroundColor:detail.backgroundColor1}}>
                  {
                    dataw&&dataw.map((value,key)=>{
                    return(
                          <div className={styles.Tdbox} key={key} style={{height:detail.conheight+'px'}} >
                            <span style={{width:(100/str.length)+'%'}}>{value.name}</span>
                            <span style={{width:(100/str.length)+'%'}}>{value.num}</span>
                            {/**
                                value&&str.map((valueC,keyC)=>{
                                  if(valueC.type==='status'){
                                    return(
                                      <span key={keyC}  style={{width:(100/str.length)+'%'}}>
                                      <Icon type={icontype} style={{fontSize:'18px',color:value.status}} />
                                      </span>
                                      )
                                  }else{
                                    return(
                                     <span key={keyC}  style={{width:(100/str.length)+'%'}}>{value[valueC.type]}</span>
                                   )
                                  }
                                     
                                })
                            **/}
                           
                         </div>
                        )
                 })
                }
                </div>

            </div>
        );
    }
});
const mapStateToProps = (state) => {
    return {
       

        
    }
};

const mapDispatchToProps = (dispatch) => {
    return { 
    init:()=>{
     
        
      
    }, 
   
    
   
   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
