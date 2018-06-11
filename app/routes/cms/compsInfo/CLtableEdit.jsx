import React from 'react'
import {connect} from 'react-redux'
import {loading} from 'fengui/component/popup'
import styles from './style.scss'
import actions from 'fengui/redux/actions'
import { Form, Input,InputNumber,Select} from 'antd';
import compsDetail from './compsDetail';
import initdata from '../../../comps/data';
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
    console.log(666,newobj)
     return{
       title:newobj.detail!=undefined?newobj.detail.title:'',
       width:newobj.detail!=undefined?newobj.detail.width:100,
       txtheight:newobj.detail!=undefined?newobj.detail.txtheight:200,
       titheight:newobj.detail!=undefined?newobj.detail.titheight:40,
       conheight:newobj.detail!=undefined?newobj.detail.conheight:40,
       marginTop:newobj.detail!=undefined?newobj.detail.marginTop:0,
       marginLeft:newobj.detail!=undefined?newobj.detail.marginLeft:0,
       fontSize:newobj.detail!=undefined?newobj.detail.fontSize:12,
       color:newobj.detail!=undefined?newobj.detail.color:'#333',
       color1:newobj.detail!=undefined?newobj.detail.color1:'#333',
       fontWeight:newobj.detail!=undefined?newobj.detail.fontWeight:true,
       borderWidth:newobj.detail!=undefined?newobj.detail.borderWidth:1,
       borderStyle:newobj.detail!=undefined?newobj.detail.borderStyle:'solid',
       borderColor:newobj.detail!=undefined?newobj.detail.borderColor:'#ccc',
       backgroundColor:newobj.detail!=undefined?newobj.detail.backgroundColor:'#fff',
       backgroundColor1:newobj.detail!=undefined?newobj.detail.backgroundColor1:'#fff',
       datasourse:newobj.detail!=undefined?newobj.detail.datasourse:'',

     }
   },
   componentDidMount() {
    
    compsDetail.colorselect('box','#333')
    compsDetail.colorselect('box1','#333')
    compsDetail.colorselect('borderbox','#ccc')
    compsDetail.colorselect('backbox1','#fff')
    compsDetail.colorselect('backbox2','#fff')
   
  
    },
  handleChange1(e){
   this.setState({title: e.target.value});
 },
 handleChange2(e){
  this.setState({width: e.target.value});
 },
 handleChange3(e){
  this.setState({titheight: e.target.value});
 },
  handleChange4(e){
   this.setState({conheight: e.target.value});
 },
  handleChange5(e){
   this.setState({marginTop: e.target.value});
 },
 handleChange6(e){
  this.setState({marginLeft: e.target.value});
 },
 handleChange7(e){
  this.setState({fontSize: e.target.value});
 },
  handleChange8(e){
  this.setState({color: e.target.value});
 },
  handleChange9(e){
  this.setState({color1: e.target.value});
 },
   handleChange10(e){
  this.setState({fontWeight: e.target.value});
 },
 
  handleChange11(e){
  this.setState({borderWidth: e.target.value});
 },
 handleChange12(e){
  this.setState({borderStyle: e.target.value});
 },
 handleChange13(e){
  this.setState({borderColor: e.target.value});
 },
 handleChange14(e){
  this.setState({backgroundColor: e.target.value});
 },
 handleChange15(e){
  this.setState({backgroundColor1: e.target.value});
 },
 handleChange16(e){
  this.setState({datasourse: e.target.value});
 },
 handleChange17(e){
  this.setState({txtheight: e.target.value});
 },
  
  render () {
    const {activeComps, compsList, setCompsDetail} = this.props;
    console.log(22,this.props)
    let {title,width,titheight,txtheight,conheight,marginTop,marginLeft,fontSize,color,color1,fontWeight,borderWidth,borderStyle,borderColor,backgroundColor,backgroundColor1,datasourse}=this.state;
     console.log(77,width)
    return (
      <div className={styles.mainBox} id='allbox'>
        <label>表格标题:</label><input data-theme={'title'} defaultValue={title} onChange={this.handleChange1}  onBlur={()=> setCompsDetail(compsList, activeComps)} />
        <label>表格宽度%:</label><input type='number' defaultValue={width}   data-theme={'width'} onChange={this.handleChange2}    onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>标题高度px:</label><input type='number'   defaultValue={titheight} data-theme={'titheight'}  onChange={this.handleChange3}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>内容高度px:</label><input type='number'   defaultValue={txtheight} data-theme={'txtheight'}  onChange={this.handleChange17}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>内容行高px:</label><input type='number'   defaultValue={conheight} data-theme={'conheight'}  onChange={this.handleChange4}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>上下边距px:</label><input type='number'  defaultValue={marginTop} onChange={this.handleChange5} data-theme={'marginTop'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>左右边距px:</label><input type='number'  defaultValue={marginLeft} onChange={this.handleChange6} data-theme={'marginLeft'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>字体大小:</label><input type='number' min={12} defaultValue={fontSize} data-theme={'fontSize'} onChange={this.handleChange7}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>字体颜色1:</label><input id='box'  data-theme={'color'} defaultValue={color} onChange={this.handleChange8}  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
        <label>字体颜色2:</label><input id='box1'  data-theme={'color1'} defaultValue={color1} onChange={this.handleChange9}  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
        <label>标题加粗:</label>
        <select className={styles.select} data-theme={'fontWeight'}  defaultValue={fontWeight} onChange={this.handleChange10}  onChange={()=> setCompsDetail(compsList, activeComps)}>
            <option value="true">是</option>
            <option value="false">否</option>
        </select>
        <label>边框大小:</label><input type='number' min={0} defaultValue={borderWidth} onChange={this.handleChange11}  data-theme={'borderWidth'}  onChange={()=> setCompsDetail(compsList,activeComps)}  />
        <label>边框类型:</label>
        <select className={styles.select} data-theme={'borderStyle'}  defaultValue={borderStyle} onChange={this.handleChange12}  onChange={()=> setCompsDetail(compsList, activeComps)}>
            <option value="solid">solid</option>
            <option value="dotted">dotted</option>
            <option value="double">Disabled</option>
            <option value="dashed">dashed</option>
        </select>
        <label>边框颜色:</label><input data-theme={'borderColor'} defaultValue={borderColor} onChange={this.handleChange13} className={styles.colorselect}  id='borderbox'  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
        <label>标题背景:</label><input id='backbox1' className={styles.colorselect} defaultValue={backgroundColor} onChange={this.handleChange14}     data-theme={'backgroundColor'}  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
        <label>内容背景:</label><input id='backbox2' className={styles.colorselect} defaultValue={backgroundColor1} onChange={this.handleChange15}     data-theme={'backgroundColor1'}  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
        <label>数据源:</label><input data-theme={'datasourse'} defaultValue={datasourse} onChange={this.handleChange16}  onBlur={()=> setCompsDetail(compsList, activeComps)} />
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
       dispatch(actions.setVars('importantDargCompsList', nCompsList));
    }
   
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Comps))
