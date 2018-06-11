import React from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';
import styles from './CLprobar.scss';
var $ = require('jquery');
let Component = React.createClass({
  
    componentDidMount() {
        this.props.init()
    },
    render() {
          let{}=this.props;
         let {detail,DataSourse}=this.props.compInfo;
          let newobj=0;
          let newalldata=0;
          if(DataSourse&&detail.data&&detail.alldata){
            
              let str1 = detail.alldata.split(".");
              let str = detail.data.split(".");
               let obj=DataSourse;
               let obj1=DataSourse;
                str.map(function(value,key){
                  if(obj!=undefined){
                    obj=obj[value]
                  }
                  
                })
                 str1.map(function(value,key){
                  if(obj1!=undefined){
                    obj1=obj1[value]
                  }
                  
                })

            newobj=obj==undefined?600:obj;
            newalldata=obj1==undefined?1000:obj1;

          }else{
            newobj=600;
            newalldata=1000;
          }
    
        return (
            <div className={styles.bodybox} style={{marginLeft:detail.marginLeft+'px',marginTop:detail.marginTop+'px',width:detail.width+'%',height:detail.height+'px',backgroundColor:detail.backgroundColor,borderRadius:detail.borderRadius+'px',borderColor:detail.probarbgcolor,borderWidth:detail.showborder=='true'?'1px':'0px'}}  >
               <div className={styles.processbar} style={{width:(newobj/newalldata)*100+'%',backgroundColor:detail.probarbgcolor,borderRadius:detail.borderRadius+'px',height:detail.height+'px'}}></div>
               <div className={styles.databar} style={{lineHeight:detail.height+'px',color:detail.lcolor,fontSize:detail.fontSize+'px',display:detail.showdata=='true'?'block':'none'}}>{newobj+'/'+newalldata}</div>
               <div className={styles.persent} style={{lineHeight:detail.height+'px',color:detail.rcolor,fontSize:detail.fontSize+'px',display:detail.showpercent=='true'?'block':'none'}}>{((newobj/newalldata)*100).toFixed(1)}%</div>
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
