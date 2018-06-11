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
detail.moreselect=false;
let Comps = React.createClass({
   getInitialState(){
     return {
       size:'default',
       check:false

     };
   },
   componentDidMount() {
    },
 moreselect(checked){
   const {activeComps, compsList} = this.props;
 
     this.setState({ check: checked});
     detail.moreselect=checked;
     this.props.setCompsDetail(compsList,activeComps.key)
 },
  render () {
    const {activeComps, compsList, setCompsDetail} = this.props;
    let {size,check}=this.state;
    
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    // console.log(getFieldDecorator)
    return (
      <div className={styles.mainBox} id='allbox'>
        <p><label>宽度:</label><Input type='number' min={0}  data-theme={'width'}   onChange={()=> setCompsDetail(compsList,activeComps.key)}/>px</p>
         <p><label>多选:</label><Switch  defaultChecked={false} onChange={this.moreselect} checkedChildren={'开'} unCheckedChildren={'关'} /></p>
      
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
