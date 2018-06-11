import React from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';
import {Select } from 'antd'
const { Option, OptGroup } = Select;
import data from './data';
var $ = require('jquery');
let Component = React.createClass({
    getDefaultProps(){
      return{
        dataSource:data.selectdata,
       
      }
    },
    componentDidMount() {
        this.props.init()
    },
   handleChange(value){
    console.log(value)
   },
    render() {
         let {detail}=this.props.compInfo;
         let{dataSource}=this.props;
        
        
        return (
            <div id='tab' >
                <Select mode='multiple'
                 allowClear={detail.initselect}
                  
                   style={{ width: 120 }}
                   notFoundContent={'空'}
                    onChange={this.handleChange} style={{width:(detail.width!=''?detail.width:'auto')}}>
               
                {
                  dataSource&&dataSource.map(function(value,key){
                    return(
                        
                          <Option  key={key} value={value.value}>{value.text}</Option>
                    
                      )
                  })
                }
                 
                  
              </Select>
             
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
