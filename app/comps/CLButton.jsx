import React from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';
// import styles from './CLBotton.scss';
var $ = require('jquery');
import {Button} from 'antd'
let arr=[];
let Component = React.createClass({
    getDefaultProps(){
     return {
       title:'XXX',
     };
   },
    componentDidMount() {
        this.props.init()
    },
    render() {
        let {title} = this.props;
        let {detail,isActive}=this.props.compInfo
        console.log(this.props.compInfo)
        return (
            <Button style={{width:detail.width!=''?detail.width:'auto',height:detail.height!=''?detail.height:'auto',fontSize:detail.fontSize!=''?detail.fontSize+'px':'12px',color:detail.color!=''?detail.color:'#333',border:detail.border!=''?detail.border:'1px solid #ccc',backgroundColor:detail.backgroundColor!=''?detail.backgroundColor:'#fff',cursor:detail.cursor!=''?detail.cursor:'pointer'}}>{detail.title!=''?detail.title:title}</Button>
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
