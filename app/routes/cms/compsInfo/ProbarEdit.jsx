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
       width:newobj.detail!=undefined?newobj.detail.width:100,
       height:newobj.detail!=undefined?newobj.detail.height:30,
       marginTop:newobj.detail!=undefined?newobj.detail.marginTop:0,
       marginLeft:newobj.detail!=undefined?newobj.detail.marginLeft:0,
       borderRadius:newobj.detail!=undefined?newobj.detail.borderRadius:0,
       fontSize:newobj.detail!=undefined?newobj.detail.fontSize:12,
       lcolor:newobj.detail!=undefined?newobj.detail.lcolor:"#333",
       rcolor:newobj.detail!=undefined?newobj.detail.rcolor:"#333",
       probarbgcolor:newobj.detail!=undefined?newobj.detail.probarbgcolor:"#108ee9",
       backgroundColor:newobj.detail!=undefined?newobj.detail.backgroundColor:"#ccc",
       showdata:newobj.detail!=undefined?newobj.detail.showdata:'false',
       showpercent:newobj.detail!=undefined?newobj.detail.showpercent:'false',
       showborder:newobj.detail!=undefined?newobj.detail.showborder:'false',
       data:newobj.detail!=undefined?newobj.detail.data:'',
       alldata:newobj.detail!=undefined?newobj.detail.alldata:'',

     }
   },
   componentDidMount() {
    
    compsDetail.colorselect('box','#333')
    compsDetail.colorselect('CLbox','#333')
    compsDetail.colorselect('borderbox','#ccc')
    compsDetail.colorselect('backbox','#ccc')
    compsDetail.colorselect('backbox1','#fff')
   
  
    },
  getalign(even){
    const {activeComps, compsList, setCompsDetail} = this.props;
    
    detail.textalign=even.value;
    this.props.setCompsDetail(compsList, activeComps.key)
  },
  handleChange1(e){
     this.setState({width: e.target.value});
  },
  handleChange2(e){
     this.setState({height: e.target.value});
  },
 handleChange3(e){
  this.setState({marginTop: e.target.value});
 },
 handleChange4(e){
   this.setState({marginLeft: e.target.value});
 },
 
 handleChange5(e){
  this.setState({fontSize: e.target.value});
 },
   handleChange6(e){
  this.setState({borderRadius: e.target.value});
 },
 handleChange7(e){
  this.setState({lcolor: e.target.value});
 },
  handleChange8(e){
  this.setState({rcolor: e.target.value});
 },
  handleChange9(e){
  this.setState({probarbgcolor: e.target.value});
 },
  handleChange10(e){
  this.setState({backgroundColor: e.target.value});
 },
 
  handleChange11(e){
  this.setState({showborder: e.target.value});
 },
  handleChange12(e){
  this.setState({data: e.target.value});
 },
  handleChange13(e){
  this.setState({alldata: e.target.value});
 },
  handleChange14(e){
  this.setState({showdata: e.target.value});
 },
  handleChange15(e){
  this.setState({showpercent: e.target.value});
 },
  render () {
    const {activeComps, compsList, setCompsDetail} = this.props;
    console.log(22,this.props)
    let {width,height,marginLeft,marginTop,fontSize,lcolor,rcolor,probarbgcolor,backgroundColor,borderRadius,showborder,data,alldata,showdata,showpercent}=this.state;
     
   
   
    
 
    return (
      <div className={styles.mainBox} id='allbox'>
        <label>宽度%:</label><input type='number' data-theme={'width'} defaultValue={width} onChange={this.handleChange1}  onChange={()=> setCompsDetail(compsList, activeComps)} />
        <label>高度px:</label><input type='number' min={0} defaultValue={height} onChange={this.handleChange2} data-theme={'height'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>上下边距px:</label><input type='number'  defaultValue={marginTop} onChange={this.handleChange3} data-theme={'marginTop'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>左右边距px:</label><input type='number'  defaultValue={marginLeft} onChange={this.handleChange4} data-theme={'marginLeft'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>字体大小px:</label><input type='number' min={12} defaultValue={fontSize} onChange={this.handleChange5} data-theme={'fontSize'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>边框圆角px:</label><input type='number' min={0} defaultValue={borderRadius} onChange={this.handleChange6} data-theme={'borderRadius'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
        <label>字体颜色1:</label><input id='box' defaultValue={lcolor} onChange={this.handleChange7} className={styles.colorselect}  data-theme={'lcolor'}  onBlur={()=> setCompsDetail(compsList, activeComps)}/>
        <label>字体颜色2:</label><input id='CLbox' defaultValue={rcolor} onChange={this.handleChange8} className={styles.colorselect}  data-theme={'rcolor'}  onBlur={()=> setCompsDetail(compsList, activeComps)}/>
        <label>进度条颜色:</label><input id='backbox' className={styles.colorselect} defaultValue={probarbgcolor} onChange={this.handleChange9}     data-theme={'probarbgcolor'}  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
        <label>背景颜色:</label><input id='backbox1' className={styles.colorselect} defaultValue={backgroundColor} onChange={this.handleChange10}     data-theme={'backgroundColor'}  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
        <label>显示边框:</label> 
         <select className={styles.select}  defaultValue={showborder} data-theme={'showborder'} onChange={this.handleChange11}   onChange={()=> setCompsDetail(compsList, activeComps)}>
            <option value="true">是</option>
            <option value="false">否</option>
          
        </select>
        <label>显示数据:</label> 
         <select className={styles.select}  defaultValue={showdata} data-theme={'showdata'} onChange={this.handleChange14}   onChange={()=> setCompsDetail(compsList, activeComps)}>
            
            <option value="false">否</option>
            <option value="true">是</option>
          
        </select>
        <label>显示占比:</label> 
         <select className={styles.select}  defaultValue={showpercent} data-theme={'showpercent'} onChange={this.handleChange15}   onChange={()=> setCompsDetail(compsList, activeComps)}>
            
            <option value="false">否</option>
            <option value="true">是</option>
          
        </select>
        <label>数据源1:</label><input   defaultValue={data} onChange={this.handleChange12} data-theme={'data'}   onBlur={()=> setCompsDetail(compsList,activeComps)}/>
        <label>数据源2:</label><input   defaultValue={alldata} onChange={this.handleChange13} data-theme={'alldata'}   onBlur={()=> setCompsDetail(compsList,activeComps)}/>

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
