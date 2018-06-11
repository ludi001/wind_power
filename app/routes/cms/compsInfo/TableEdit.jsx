import React from 'react'
import {connect} from 'react-redux'
import {loading} from 'fengui/component/popup'
import styles from './style.scss'
import actions from 'fengui/redux/actions'
import { Form,Input,Switch,Button, Radio} from 'antd';
import compsDetail from './compsDetail';
import _ from 'lodash';
const FormItem = Form.Item;
var $ = require('jquery');
let detail={};
detail.pagination=false;
detail.border=false;
let Comps = React.createClass({
   getInitialState(){
     return {
       size:'default',
       check:false

     };
   },
   componentDidMount() {
    },
  showpagination(checked){
     const {activeComps, compsList} = this.props;
     console.log(checked)
     this.setState({ check: checked});
     detail.pagination=checked;
     this.props.setCompsDetail(compsList,activeComps.key)
  },
  handleSizeChange(e){
    const {activeComps, compsList} = this.props;
    detail.size=e.target.value;
    this.setState({ size: e.target.value });
    this.props.setCompsDetail(compsList,activeComps.key)
  },
  ShowpBorder(checked){
     const {activeComps, compsList} = this.props;
     detail.border=checked;
     this.props.setCompsDetail(compsList,activeComps.key)
  },
  render () {
    const {activeComps, compsList, setCompsDetail} = this.props;
    let {size,check}=this.state;
    
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    // console.log(getFieldDecorator)
    return (
      <div className={styles.mainBox} id='allbox'>
      <p><label>显示边框:</label><Switch data-theme={'border'} defaultChecked={false} onChange={this.ShowpBorder} checkedChildren={'开'} unCheckedChildren={'关'} /></p>
        <p><label>显示分页:</label><Switch data-theme={'showpagination'} defaultChecked={check} onChange={this.showpagination} checkedChildren={'开'} unCheckedChildren={'关'} /></p>
        {this.state.check==true&&<p><label>每页条数:</label><Input type='number' min={1} defaultValue={10} data-theme={'pagesize'}   onBlur={()=> setCompsDetail(compsList,activeComps.key)}/></p>}
        <p>
            <label>表格大小:</label>
            <Radio.Group value={size} onChange={this.handleSizeChange}>
            <Radio.Button style={{width:'32px'}} value="default">大</Radio.Button>
            <Radio.Button style={{width:'32px'}} value="middle">中</Radio.Button>
            <Radio.Button style={{width:'32px'}} value="small">小</Radio.Button>
            </Radio.Group>
        </p>
        <p><label>内容高度:</label><Input type='number' min={0}  data-theme={'height'}   onChange={()=> setCompsDetail(compsList,activeComps.key)}/>px</p>
        <p><label>内容宽度:</label><Input type='number' min={100} defaultValue={100} data-theme={'width'}   onChange={()=> setCompsDetail(compsList,activeComps.key)}/>%</p>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    compsList: state.vars.importantDargCompsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   
    setCompsDetail: (compsList, key)=> {
       $('#allbox input').each(function(key,value){
        if($(this).data('theme')){
          
            detail[$(this).data('theme')]=value.value
          
          
        }
        
      })
       let nCompsList = _.cloneDeep(compsList);
       nCompsList[key].detail = detail;
          console.log(nCompsList)
       dispatch(actions.setVars('importantDargCompsList', nCompsList));
    }
   
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Comps))
