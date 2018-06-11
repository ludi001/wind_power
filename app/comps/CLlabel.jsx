import React from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';
import styles from './CLlabel.scss';
var $ = require('jquery');
let arr=[];
let Component = React.createClass({
   
    componentDidMount() {
        this.props.init()
    },
    render() {
        let {} = this.props;
        let {detail,DataSourse}=this.props.compInfo;
        let data='???';
        console.log(77,DataSourse)
         if(DataSourse&&detail.datasourse){
            console.log(990,DataSourse)
            let str = detail.datasourse.split(".");
            let obj=DataSourse;
                str.map(function(value,key){
                  if(obj!=undefined){
                    obj=obj[value]
                  }
                })
            data=obj;
          }else{
            data='???';
          }
        return (
            <div className={styles.bodybox}
             style={{borderWidth:detail.borderWidth+'px',borderStyle:detail.borderStyle,borderColor:detail.borderColor,marginLeft:(detail.marginLeft!=''?detail.marginLeft+'px':'0px'),marginTop:(detail.marginTop!=''?detail.marginTop+'px':'0px'),height:detail.height+'px',width:(detail.width!=''?detail.width+'%':'100%'),fontSize:(detail.fontSize!=''?detail.fontSize+'px':'12px'),color:(detail.color!=''?detail.color:'#333'),backgroundColor:(detail.backgroundColor!=''?detail.backgroundColor:'#fff')}} >
              <div className={styles.titles} style={{lineHeight:detail.height+'px'}} >{detail.title!=''?detail.title:'标题'}:</div>
              <div className={styles.contents} style={{lineHeight:detail.height+'px'}} >{data}</div>
              <div className={styles.unit} style={{lineHeight:detail.height+'px'}} >{detail.unit!=''?detail.unit:''}</div>
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
