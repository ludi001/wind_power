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
       unit:newobj.detail!=undefined?newobj.detail.unit:'',
       titleheight:newobj.detail!=undefined?newobj.detail.titleheight:20,
       allwidth:newobj.detail!=undefined?newobj.detail.width:100,
       marginTop:newobj.detail!=undefined?newobj.detail.marginTop:0,
       marginLeft:newobj.detail!=undefined?newobj.detail.marginLeft:0,
       fontSize:newobj.detail!=undefined?newobj.detail.fontSize:12,
       color:newobj.detail!=undefined?newobj.detail.color:'#333',
       borderWidth:newobj.detail!=undefined?newobj.detail.borderWidth:1,
       borderStyle:newobj.detail!=undefined?newobj.detail.borderStyle:'solid',
       borderColor:newobj.detail!=undefined?newobj.detail.borderColor:'#ccc',
       backgroundColor:newobj.detail!=undefined?newobj.detail.backgroundColor:'#fff',
       datasourse:newobj.detail!=undefined?newobj.detail.datasourse:'',

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
     this.setState({titleheight: e.target.value});
  },
 handleChange2(e){
  this.setState({allwidth: e.target.value});
 },
 handleChange3(e){
  this.setState({unit: e.target.value});
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
 
  handleChange13(e){
  this.setState({backgroundColor: e.target.value});
 },
  handleChange20(e){
  this.setState({datasourse: e.target.value});
 },
  render () {
    const {activeComps, compsList, setCompsDetail,showdatasousetree} = this.props;
    console.log(22,this.props)
    let {datasourse,tit,unit,titleheight,allwidth,marginLeft,marginTop,fontSize,color,borderWidth,borderStyle,borderColor,backgroundColor}=this.state;
     
   
   
    
 
    return (
      <div className={styles.mainBox} id='allbox'>
        <label>标题:</label><input data-theme={'title'} defaultValue={tit} onChange={this.handleChange}  onBlur={()=> setCompsDetail(compsList, activeComps)} />
        <label>单位:</label><input data-theme={'unit'} defaultValue={unit} onChange={this.handleChange3}  onBlur={()=> setCompsDetail(compsList, activeComps)} />
        <label>数据源:</label><input data-theme={'datasourse'} defaultValue={datasourse} onChange={this.handleChange20}  onBlur={()=> setCompsDetail(compsList, activeComps)} />
        <label>高度px:</label><input type='number' min={0} defaultValue={titleheight} onChange={this.handleChange1} data-theme={'height'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
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
      
        <label>边框颜色:</label><input data-theme={'borderColor'} defaultValue={borderColor} onChange={this.handleChange10} className={styles.colorselect}  id='borderbox'  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
       
        <label>整体背景:</label><input id='backbox1' className={styles.colorselect} defaultValue={backgroundColor} onChange={this.handleChange13}     data-theme={'backgroundColor'}  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
       

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
    },
    showdatasousetree:()=>{
      dispatch(actions.setVars('CLshowchangedata',true))
    }
   
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Comps))
