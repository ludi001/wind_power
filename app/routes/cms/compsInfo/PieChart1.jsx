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
            title:newobj.detail!=undefined?newobj.detail.title:'默认标题',
            height:newobj.detail!=undefined?newobj.detail.height:200,
            width:newobj.detail!=undefined?newobj.detail.width:100,
            unit:newobj.detail!=undefined?newobj.detail.unit:'value',
            color:newobj.detail!=undefined?newobj.detail.color:'#333333',
            color1:newobj.detail!=undefined?newobj.detail.color1:'#108ee9',
            xColor:newobj.detail!=undefined?newobj.detail.xColor:'#108ee9',
            yColor:newobj.detail!=undefined?newobj.detail.yColor:'#108ee9',
            tableColor:newobj.detail!=undefined?newobj.detail.tableColor:'#108ee9',
            top:newobj.detail!=undefined?newobj.detail.top:0,
            left:newobj.detail!=undefined?newobj.detail.left:0,
            datasourse:newobj.detail!=undefined?newobj.detail.datasourse:'',
            distance:newobj.detail!=undefined?newobj.detail.distance:10,
        }
    },
    componentDidMount() {

        compsDetail.colorselect('box','#333')
        compsDetail.colorselect('box1','#108ee9')
        compsDetail.colorselect('xx','#000')
        compsDetail.colorselect('yy','#000')
        compsDetail.colorselect('tt','#197F07')


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
        this.setState({color1: e.target.value});
    },
    handleChange6(e){
        this.setState({xColor: e.target.value});
    },
    handleChange7(e){
        this.setState({yColor: e.target.value});
    },
    handleChange8(e){
        this.setState({tableColor: e.target.value});
    },
    handleChange17(e){
        this.setState({distance: e.target.value});
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
        let {distance,left,top,datasourse,title,height,width,unit,color,color1,xColor,yColor,tableColor}=this.state;





        return (
            <div className={styles.mainBox} id='allbox'>
                <label>标题名:</label><input data-theme={'title'} value={title} onChange={this.handleChange}  onBlur={()=> setCompsDetail(compsList, activeComps)} />
                <label>数据源:</label><input data-theme={'datasourse'} value={datasourse} onChange={this.handleChange20}  onBlur={()=> setCompsDetail(compsList, activeComps)} />
                <label>整体高度px:</label><input type='number' min={0} defaultValue={height} onChange={this.handleChange1} data-theme={'height'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
                <label>整体宽度%:</label><input type='number' min={0} defaultValue={width} onChange={this.handleChange2} data-theme={'width'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
                <label>题图间距px:</label><input type='number'  defaultValue={distance} onChange={this.handleChange17} data-theme={'distance'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
                <label>上下边距px:</label><input type='number'  defaultValue={top} onChange={this.handleChange18} data-theme={'top'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
                <label>左右边距px:</label><input type='number'  defaultValue={left} onChange={this.handleChange19} data-theme={'left'}   onChange={()=> setCompsDetail(compsList,activeComps)}/>
                <label>单位名:</label><input data-theme={'unit'} value={unit} onChange={this.handleChange3}  onBlur={()=> setCompsDetail(compsList, activeComps)} />
                <label>颜色1:</label><input id='box' defaultValue={color} onChange={this.handleChange4} className={styles.colorselect}  data-theme={'color'}  onBlur={()=> setCompsDetail(compsList, activeComps)}/>
                <label>颜色2:</label><input id='box1' className={styles.colorselect} defaultValue={color1} onChange={this.handleChange5}     data-theme={'color1'}  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
                <label>轴线颜色:</label><input id='xx' className={styles.colorselect} defaultValue={xColor} onChange={this.handleChange6}     data-theme={'xColor'}  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
                <label>文字颜色:</label><input id='yy' className={styles.colorselect} defaultValue={yColor} onChange={this.handleChange7}     data-theme={'yColor'}  onBlur={()=> setCompsDetail(compsList, activeComps)}  />
                <label>网格线颜色:</label><input id='tt' className={styles.colorselect} defaultValue={tableColor} onChange={this.handleChange8}     data-theme={'tableColor'}  onBlur={()=> setCompsDetail(compsList, activeComps)}  />

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
