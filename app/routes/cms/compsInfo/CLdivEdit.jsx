import React from 'react'
import {connect} from 'react-redux'
import {loading} from 'fengui/component/popup'
import styles from './style.scss'
import actions from 'fengui/redux/actions'
import { Form, Input,InputNumber,Select} from 'antd';
import compsDetail from './compsDetail';
import _ from 'lodash';
const FormItem = Form.Item;

let Comps = React.createClass({
   getInitialState(){
    const {activeComps, compsList, setCompsDetail} = this.props;
     let newobj={}
    if(compsList&&activeComps){
      compsList.map(function(value,key){
        if(value.type==activeComps.type&&key==activeComps.key){
          newobj=value;
        }
      })
    };
    console.log('getInitialState',newobj);
     return{
       tit:newobj.detail!=undefined?newobj.detail.title:'标题',
       height:newobj.detail!=undefined?newobj.detail.height:20,
       allwidth:newobj.detail!=undefined?newobj.detail.width:100,
       marginTop:newobj.detail!=undefined?newobj.detail.marginTop:0,
       marginLeft:newobj.detail!=undefined?newobj.detail.marginLeft:0,
       fontSize:newobj.detail!=undefined?newobj.detail.fontSize:12,
       color:newobj.detail!=undefined?newobj.detail.color:'#333',
       borderWidth:newobj.detail!=undefined?newobj.detail.borderWidth:1,
       borderStyle:newobj.detail!=undefined?newobj.detail.borderStyle:'solid',
       borderColor:newobj.detail!=undefined?newobj.detail.borderColor:'#ccc',
       textalign:newobj.detail!=undefined?newobj.detail.textalign:'left',
      
       backgroundColor:newobj.detail!=undefined?newobj.detail.backgroundColor:'#fff',

     }
   },
   componentDidMount() {
    
    compsDetail.colorselect('box','#333')
    compsDetail.colorselect('borderbox','#ccc')
    compsDetail.colorselect('backbox','#ccc')
    compsDetail.colorselect('backbox1','#fff')
   
  
    },
  getalign(even){
    const {activeComps, compsList, setCompsDetail} = this.props;
    
    detail.textalign=even.value;
    this.props.setCompsDetail(compsList, activeComps.key)
  },
  handleChange(e){
     this.setState({tit: e.target.value});
  },
  handleChange1(e){
     this.setState({height: e.target.value});
  },
 handleChange2(e){
  this.setState({allwidth: e.target.value});
 },
  handleChange4(e){
   this.setState({marginTop: e.target.value});
 },
  handleChange5(e){
   this.setState({marginLeft: e.target.value});
 },
 handleChange6(e){
  this.setState({fontSize: e.target.value});
 },
 handleChange7(e){
  this.setState({color: e.target.value});
 },
  handleChange8(e){
  this.setState({borderWidth: e.target.value});
 },
  handleChange9(e){
  this.setState({borderStyle: e.target.value});
 },
   handleChange10(e){
  this.setState({borderColor: e.target.value});
 },
  handleChange11(e){
  this.setState({textalign: e.target.value});
 },
 
  handleChange13(e){
  this.setState({backgroundColor: e.target.value});
 },
  render () {
    const {activeComps, compsList, setCompsDetail} = this.props;
    console.log(22,this.props)
    let {tit,height,allwidth,marginLeft,marginTop,fontSize,color,borderWidth,borderStyle,borderColor,textalign,backgroundColor}=this.state;
     
   
   
    
 
    return (
      <div className={styles.mainBox} id='allbox'>
        <label>ID:</label><input readOnly="true" style={{backgroundColor:'#ddd'}}  defaultValue={activeComps.type+activeComps.key}  />
        <label>标题名:</label><input data-theme={'title'} value={tit} onChange={this.handleChange}  onBlur={()=> setCompsDetail(compsList, activeComps)} />
        <label>高度%:</label><input type='number' min={0} defaultValue={height} onChange={this.handleChange1} data-theme={'height'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>宽度%:</label><input type='number' min={0} defaultValue={allwidth} onChange={this.handleChange2} data-theme={'width'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
       
        <label>上下边距px:</label><input type='number'  defaultValue={marginTop} onChange={this.handleChange4} data-theme={'marginTop'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>左右边距px:</label><input type='number'  defaultValue={marginLeft} onChange={this.handleChange5} data-theme={'marginLeft'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>字体大小px:</label><input type='number' min={12} defaultValue={fontSize} onChange={this.handleChange6} data-theme={'fontSize'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>字体颜色:</label><input id='box' defaultValue={color} onChange={this.handleChange7} className={styles.colorselect}  data-theme={'color'}  onBlur={()=> setCompsDetail(compsList, activeComps)}/>
        <label>边框大小:</label><input type='number' min={0} defaultValue={borderWidth} onChange={this.handleChange8}  data-theme={'borderWidth'}  onChange={()=> setCompsDetail(compsList,activeComps)}  />
        <label>边框类型:</label>
          <select className={styles.select} data-theme={'borderStyle'}  defaultValue={borderStyle} onChange={this.handleChange9}  onChange={()=> setCompsDetail(compsList, activeComps)}>
            <option value="solid">solid</option>
            <option value="dotted">dotted</option>
            <option value="double">Disabled</option>
            <option value="dashed">dashed</option>
        </select>
        <label>对齐方式:</label>
          <select className={styles.select}  defaultValue={textalign} data-theme={'textalign'} onChange={this.handleChange11}   onChange={()=> setCompsDetail(compsList, activeComps)}>
            <option value="left">left</option>
            <option value="center">center</option>
            <option value="right">right</option>
        </select>
        <label>边框颜色:</label><input data-theme={'borderColor'} defaultValue={borderColor} onChange={this.handleChange10} className={styles.colorselect}  id='borderbox'  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
  
        <label>背景颜色:</label><input id='backbox1' className={styles.colorselect} defaultValue={backgroundColor} onChange={this.handleChange13}     data-theme={'backgroundColor'}  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
       

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
   
    setCompsDetail: (compsList, activeComps)=> {
      let detail={}
      $('#allbox input,#allbox select').each(function(key,value){
        if($(this).data('theme')){
          detail[$(this).data('theme')]=value.value
        }
        
      })
       let nCompsList = _.cloneDeep(compsList);
       nCompsList.map(function(valueC,keyC){
        if(valueC.type==activeComps.type&&keyC==activeComps.key){
          
           let objs = _.cloneDeep(detail);
           nCompsList[activeComps.key].detail = objs;
        }
       })
      
          console.log(999999999,nCompsList)
          console.log(777777777,activeComps)
       dispatch(actions.setVars('importantDargCompsList', nCompsList));
    }
   
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Comps))
