import React from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';
import styles from './Card.scss';
var $ = require('jquery');
let arr=[];
let Component = React.createClass({
    getDefaultProps(){
     return {
       data:'数据',
       labelstyle:{},
       titlestyle:{},
       contenstyle:{},
       unitstyle:{}
     };
   },
    componentDidMount() {
        this.props.init()
    },
    render() {
        let {} = this.props;
        let {detail}=this.props.compInfo
        
        return (
            <div className={styles.bodybox} style={{borderWidth:detail.borderWidth+'px',borderStyle:detail.borderStyle,borderColor:detail.borderColor,backgroundColor:detail.allbg,width:detail.width+'%',height:detail.allheight+'%',marginTop:detail.marginTop+'px',marginLeft:detail.marginLeft+'px'}}>
               <div className={styles.title} style={{textAlign:detail.textalign,backgroundColor:detail.titlebg,color:detail.color,fontSize:detail.fontSize+'px',height:detail.titleheight+'px',lineHeight:detail.titleheight+'px'}}>{detail.title}</div>
               <div className={styles.content} ></div>
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
