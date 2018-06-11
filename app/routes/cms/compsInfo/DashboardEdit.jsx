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
            title:newobj.detail!=undefined?newobj.detail.title:'标题',
            height:newobj.detail!=undefined?newobj.detail.height:100,
            width:newobj.detail!=undefined?newobj.detail.width:100,
            maxData:newobj.detail!=undefined?newobj.detail.maxData:150,
            minData:newobj.detail!=undefined?newobj.detail.minData:0,
            data:newobj.detail!=undefined?newobj.detail.data:100,
            unit:newobj.detail!=undefined?newobj.detail.unit:'单位',
            color:newobj.detail!=undefined?newobj.detail.color:'#000',
            top:newobj.detail!=undefined?newobj.detail.top:0,
            left:newobj.detail!=undefined?newobj.detail.left:0,
            datasourse:newobj.detail!=undefined?newobj.detail.datasourse:'',
            size:newobj.detail!=undefined?newobj.detail.size:14,
            color1:newobj.detail!=undefined?newobj.detail.color1:'#000',
        }
    },
    componentDidMount() {

        compsDetail.colorselect('box','#000')
        compsDetail.colorselect('box1','#000')


    },
    getalign(even){
        const {activeComps, compsList, setCompsDetail} = this.props;

        detail.textalign=even.value;
        this.props.setCompsDetail(compsList, activeComps.key)
    },
    handleChange(e){
        this.setState({title: e.target.value});
    },
    handleChange1(e){
        this.setState({height: e.target.value});
    },
    handleChange2(e){
        this.setState({width: e.target.value});
    },
    handleChange3(e){
        this.setState({unit: e.target.value});
    },
    handleChange4(e){
        this.setState({color: e.target.value});
    },
    handleChange5(e){
        this.setState({data: e.target.value});
    },
    handleChange6(e){
        this.setState({maxData: e.target.value});
    },
    handleChange7(e){
        this.setState({minData: e.target.value});
    },
    handleChange8(e){
        this.setState({size: e.target.value});
    },
    handleChange9(e){
        this.setState({color1: e.target.value});
    },
    handleChange18(e){
        this.setState({top: e.target.value});
    },
    handleChange19(e){
        this.setState({left: e.target.value});
    },
    handleChange20(e){
        this.setState({datasourse: e.target.value});
    },
    render () {
        const {activeComps, compsList, setCompsDetail} = this.props;
        console.log(22,this.props)
        let {color1,size,data,maxData,minData,datasourse,left,top,title,height,width,unit,color}=this.state;





        return (
            <div className={styles.mainBox} id='allbox'>
                <label>ID:</label><input readOnly="true" style={{backgroundColor:'#ddd'}} data-theme={'ID'}  defaultValue={activeComps.type+activeComps.key}  />
                <label>标题:</label><input data-theme={'title'} value={title} onChange={this.handleChange}  onBlur={()=> setCompsDetail(compsList, activeComps)} />
                <label>标题大小px:</label><input type='number'  defaultValue={size} onChange={this.handleChange8} data-theme={'size'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
                {/*<label>整体高度%:</label><input type='number' min={0} defaultValue={height} onChange={this.handleChange1} data-theme={'height'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
                <label>整体宽度%:</label><input type='number' min={0} defaultValue={width} onChange={this.handleChange2} data-theme={'width'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>*/}
                <label>单位:</label><input data-theme={'unit'} value={unit} onChange={this.handleChange3}  onBlur={()=> setCompsDetail(compsList, activeComps)} />
                <label>上下边距px:</label><input type='number'  defaultValue={top} onChange={this.handleChange18} data-theme={'top'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
                <label>左右边距px:</label><input type='number'  defaultValue={left} onChange={this.handleChange19} data-theme={'left'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
                <label>当前值:</label><input   defaultValue={data} onChange={this.handleChange5} data-theme={'data'}   onBlur={()=> setCompsDetail(compsList,activeComps)}/>
                <label>最大值:</label><input type='number' min={0}  defaultValue={maxData} onChange={this.handleChange6} data-theme={'maxData'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
                <label>最小值:</label><input type='number' min={0} defaultValue={minData} onChange={this.handleChange7} data-theme={'minData'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
                <label>标题颜色:</label><input id='box' defaultValue={color} onChange={this.handleChange4} className={styles.colorselect}  data-theme={'color'}  onBlur={()=> setCompsDetail(compsList, activeComps)}/>
                <label>内容颜色:</label><input id='box1' defaultValue={color1} onChange={this.handleChange9} className={styles.colorselect}  data-theme={'color1'}  onBlur={()=> setCompsDetail(compsList, activeComps)}/>
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
