import React from 'react'
import {connect} from 'react-redux'
import {loading} from 'fengui/component/popup'
import styles from './style.scss'
import actions from 'fengui/redux/actions'
import { Form, Input,InputNumber,Select} from 'antd';
import compsDetail from './compsDetail';
import _ from 'lodash';
const FormItem = Form.Item;
 let detail={}
 detail.cursor='pointer';
let Comps = React.createClass({

   componentDidMount() {
    
    compsDetail.colorselect('box','#333')
    compsDetail.colorselect('borderbox','#ccc')
    compsDetail.colorselect('backbox','#fff')
   
  
    },
  getcursor(even){
     const {activeComps, compsList, setCompsDetail} = this.props;
    detail.cursor=even.value;
    this.props.setCompsDetail(compsList, activeComps.key)
  },
  render () {
    const {activeComps, compsList, setCompsDetail} = this.props;
    console.log(22,this.props)
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    // console.log(getFieldDecorator)
    return (
      <div className={styles.mainBox} id='allbox'>
        <label>标题:</label><Input data-theme={'title'}  onBlur={()=> setCompsDetail(compsList, activeComps.key)} />
         <label>高度:</label><Input type='number'   data-theme={'height'}   onChange={()=> setCompsDetail(compsList,activeComps.key)}/>
        <label>宽度:</label><Input type='number'   data-theme={'width'}   onChange={()=> setCompsDetail(compsList,activeComps.key)}/>
        <label>字体大小:</label><Input type='number' min={12} defaultValue={12} data-theme={'fontSize'}   onChange={()=> setCompsDetail(compsList,activeComps.key)}/>
        <label>字体颜色:</label><Input id='box'  data-theme={'color'}  onBlur={()=> setCompsDetail(compsList, activeComps.key)}  />
        <label>边框大小:</label><Input type='number' min={0} defaultValue={1}  name={'border'}  data-theme={'more'}  onChange={()=> setCompsDetail(compsList,activeComps.key)}  />
         
          <label>边框类型:</label>
          <input type='hidden' defaultValue={'px '} name={'border'} />
          <select className={styles.select} name={'border'} defaultValue="solid"  onChange={()=> setCompsDetail(compsList, activeComps.key)}>
            <option value="solid">solid</option>
            <option value="dotted">dotted</option>
            <option value="double">Disabled</option>
            <option value="dashed">dashed</option>
        </select>
        <input type='hidden' defaultValue={' '} name={'border'} />
        
        <label>边框颜色:</label><Input name={'border'} id='borderbox'  onBlur={()=> setCompsDetail(compsList, activeComps.key)}  />
        <label>背景颜色:</label><Input id='backbox'  data-theme={'backgroundColor'}  onBlur={()=> setCompsDetail(compsList, activeComps.key)}  />
         
          <label>鼠标样式:</label>
          <select className={styles.select}  defaultValue="pointer"  onChange={(e)=>this.getcursor(e.target)}>
            <option value="pointer">pointer</option>
            <option value="default">default</option>
            <option value="text">text</option>
            <option value="move">move</option>
        </select>
        
        
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
          if($(this).data('theme')=='more'){
            let str='';
            console.log($(this).attr('name'))
            $('#allbox input[name="'+$(this).attr('name')+'"] ,#allbox select[name="'+$(this).attr('name')+'"]').each(function(keyC,valueC){
              str+=valueC.value;
              
            })
            detail[$(this).attr('name')]=str;
          }else{
            detail[$(this).data('theme')]=value.value
          }
          
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
