import React from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';
import styles from './CLdiv.scss';
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
            <div className={styles.bodybox} style={{borderWidth:detail.borderWidth+'px',borderStyle:detail.borderStyle,borderColor:detail.borderColor,textAlign:detail.textalign,color:detail.color,fontSize:detail.fontSize+'px',backgroundColor:detail.backgroundColor,marginLeft:detail.marginLeft+'px',marginTop:detail.marginTop+'px',width:detail.width+'%',height:detail.height+'px',lineHeight:detail.height+'px'}}> 
              {detail.title}
               
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
