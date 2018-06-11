import React, {Component} from 'react';
import {DragDropContextProvider} from 'react-dnd';
import {connect} from 'react-redux';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';
import HTML5Backend from 'react-dnd-html5-backend';
import Dustbin from './Dustbin';
import Box from './Box';
import styles from './Container.scss';
import compsInfo from '../compsInfo/index';
import {Menu, Icon} from 'antd';
import Nav from '../nav';
var $ = require('jquery');
let Components = React.createClass({
    geticon(id){
        if( $('#'+id).find('i').eq(1).hasClass('anticon-down')){
          $('#'+id).find('i').eq(1).removeClass('anticon-down').addClass('anticon-up') 
      }else{
         $('#'+id).find('i').eq(1).removeClass('anticon-up').addClass('anticon-down')  
      }
        $('#'+id).parent().siblings('div').each(function(key,value){
             $(this).find('i').eq(1).removeClass('anticon-up').addClass('anticon-down') 
        })
        $('#'+id).siblings('ul').slideToggle(100)
        $('#'+id).parent().siblings().find('ul').slideUp(100)
    },
     render() {
        let {compsOffset, compsList} = this.props;
       
        return (
            <DragDropContextProvider backend={HTML5Backend}>
                <div>
                   
                    <div className={styles.pageFlow}>
                        <Nav/>
                        <Dustbin compsOffset={compsOffset}/>
                    </div>
                    <div className={styles.compsList}
                         style={{ clear: 'both', width: 200,height:300, backgroundColor: '#fff'}}>
                        <div  className={styles.menu}>
                            <a className={styles.tit}>
                               组件库
                            </a>
                        </div>
                        <div  className={styles.menu}>
                            <a id='base' onClick={()=>this.geticon('base')}>
                                <Icon type="star-o" style={{float:'left', lineHeight:'30px'}}/>
                                <span>基础组件</span>
                                <Icon type="down" style={{float:'right', lineHeight:'30px'}}/>
                            </a>
                            <ul>
                                {
                                    compsInfo.map((value, key) => {
                                        if(value.menutype=='base'){
                                            return (
                                                <li key={key}>
                                                   
                                                    <Box {...value} compsList={compsList}/>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                        <div  className={styles.menu}>
                            <a id='chart' onClick={()=>this.geticon('chart')}>
                                <Icon type="area-chart" style={{float:'left', lineHeight:'30px'}}/>
                                <span>图表组件</span>
                                <Icon type="down" style={{float:'right', lineHeight:'30px'}}/>
                            </a>
                            <ul>
                                {
                                    compsInfo.map((value, key) => {
                                        if(value.menutype=='chart'){
                                            return (
                                                <li key={key}>
                                                  
                                                    <Box {...value} compsList={compsList}/>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                        <div  className={styles.menu}>
                            <a id='other' onClick={()=>this.geticon('other')}>
                                <Icon type="appstore-o" style={{float:'left', lineHeight:'30px'}}/>
                                <span>其他组件</span>
                                <Icon type="down" style={{float:'right', lineHeight:'30px'}}/>
                            </a>
                            <ul>
                                {
                                    compsInfo.map((value, key) => {
                                        if(value.menutype=='other'){
                                            return (
                                                <li key={key}>
                                                    <Box {...value} compsList={compsList}/>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </DragDropContextProvider>
        );
    }
});
  
const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Components)
   

