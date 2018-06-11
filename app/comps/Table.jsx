import React from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';
import {Table } from 'antd'
import data from './data';
var $ = require('jquery');
let Component = React.createClass({
    getDefaultProps(){
      return{
        dataSource:data.dataSource,
        columns:data.columns
      }
    },
    componentDidMount() {
        this.props.init()
    },
   
    render() {
         let {detail}=this.props.compInfo;
         let{dataSource,columns}=this.props;
         let obj={};
          if(detail.pagination){
            if(detail.pagesize!=''){
              obj.pageSize=Number(detail.pagesize);
            }else{
              obj.pageSize=10;
            }
          }else{
             obj=false;
          };
          console.log(520,obj)
        return (
            <div id='tab' >
            <Table 
             scroll={{ x: (detail.width!=''?detail.width+'%':'100%') , y: (detail.height!=''?detail.height:false) }}
               dataSource={dataSource} columns={columns} 
               pagination={obj} 
               size={detail.size}
               bordered={detail.border} />
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
