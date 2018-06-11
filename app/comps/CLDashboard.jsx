import React from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';
import _ from 'lodash';
import styles from './CLDashboard.scss';



let Component = React.createClass({

    componentDidMount() {
  
    },
    componentDidUpdate() {
        let {detail,DataSourse} = this.props.compInfo;

         let newobj1=sessionStorage.getItem('cloud'+detail.ID);
          if(DataSourse&&detail.data){
              let str = detail.data.split(".");
               let obj=DataSourse;
                str.map(function(value,key){
                  if(obj!=undefined){
                    obj=obj[value]
                  }
                  
                })
               
            newobj1=obj==undefined?sessionStorage.getItem('cloud'+detail.ID):obj;
          }else{
            newobj1=sessionStorage.getItem('cloud'+detail.ID);
          }
        this.props.init(newobj1,detail);
    },
    getDefaultProps(){
        return {
           
           Name:"车速",
           unit:"km/h"
           
        };
    },
    render() {
        let{data,name,unit} = this.props;
        let {detail,DataSourse} = this.props.compInfo;
        console.log(this.props.compInfo)

         let newobj=0;
          if(DataSourse&&detail.data){
              let str = detail.data.split(".");
               let obj=DataSourse;
                str.map(function(value,key){
                  if(obj!=undefined){
                    obj=obj[value]
                  }
                  
                })
               
            newobj=obj==undefined?0:obj;
          }else{
            newobj=0;
          }





        //slet csp = 100; // 车速
        // let zsp = ; // 转速
        return (
           
            <div className={styles.speedBox} style={{marginLeft:detail.left+'px', marginTop:detail.top+'px'}}>
                <div className={styles.speed} style={{fontSize:detail.size+'px'}}>
                    <div className={styles.speedLeft}>
                        <b style={{color:detail.color}}>{detail.title != ''? detail.title : "速度"}</b>
                        <div className={styles.wsdialbox}>
                            <div id={detail.ID+'das'} className={styles.wsipbox}></div>
                        </div>
                        <p style={{color:detail.color1}}><span >{newobj}</span> {detail.unit}</p>
                    </div>
                    {/*
                    <div className={styles.speedRight}>
                        <b>{indexName2}</b>
                        <div className={styles.wsdialbox}>
                            <div id="zspeed2" className={styles.wsipbox}></div>
                        </div>
                        <p><span>{zsp}</span></p>
                        <i>转/秒</i>
                    </div>
                    */
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
       init: (newobj1,detail) => {
            console.log(3345,detail.ID)
           //  let newdata = Number(_.cloneDeep(detail.data));
           //  console.log(4456,newdata)
            let csp = detail.maxData; // 车速
            // let zsp = ; // 转速
            if(csp/1 > newobj1/1){
                csp = newobj1
            }

            console.log(3345,csp)
            sessionStorage.setItem('cloud'+detail.ID,csp)
            

            $("#"+detail.ID+'das').animate({ deg: csp*(180/(detail.maxData-detail.minData))}, {
                        step: function(now,fx) {
                        // $(this).css('transform-origin','93% 50%');
                        $(this).css('transform','rotate('+now+'deg)');
                        
                        },
                        duration:200
                    })
                        // console.log(1212121212212)
            // if(zsp >= 3000){
            //     zsp = 3000
            // }
            // $("#zspeed2").animate({ deg: zsp*6/100 }, {
            //             step: function(now,fx) {
            //             // $(this).css('transform-origin','93% 50%');
            //             $(this).css('transform','rotate('+now+'deg)');
            //             },
            //             duration:150
            //         })
        },

        
       
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
