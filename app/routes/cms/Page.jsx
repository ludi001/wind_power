import React from 'react'
import {connect} from 'react-redux'
import actions from 'fengui/redux/actions'
import Header from './Header'
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import DargContainer from './darg/Container';
import CompsInfoEdit from './CompsInfoEdit';
import {browserHistory} from 'react-router'
import View from './View';
import Nav from './nav';
import CLtreeData from './CLtreeData';
import Boxedit from './boxedit/boxedit';
import {Spin }from 'antd'
let style={
    width:'200px',
    background:'#01538b',
    height:'30px',
    display:'block',
    color:'#fff',
    padding:'0px 10px 0 10px',
    lineHeight:'30px',
    cursor:'auto',
    position:'fixed',
    zIndex:'5',
    top:'369px',
    left:'0px',
    boxShadow: '0px 2px 5px rgba(0,0,0,.65)'
};
let Container = React.createClass({
    componentWillMount () {
        this.props.init();
    },
    render () {
        let {pageinfo, compsOffset, compsList,showedit,CLpagebol,datasource,CLshowchangedata} = this.props;
        if(CLpagebol){
        return (
            <div>
                <Header pageinfo={pageinfo}/>
                <Nav />
                {showedit!=true&&<div>
                    <div >
                        <DargContainer compsOffset={compsOffset} compsList={compsList}/>
                    </div>
                    <a style={style}>组件属性</a>
                    <Boxedit />
                    <CompsInfoEdit/>
                </div>}
                 {showedit==true&&<View compsOffset={compsOffset} compsList={compsList} datasource={datasource} />}
                 {CLshowchangedata==true&&<CLtreeData />}
            </div>
        )
        }else{
            return(
                <div>
                  
              </div>
                )
        }
    }
})


const mapStateToProps = (state) => {
    return {
        pageinfo: state.vars.importantPageInfo,//页面信息
        compsOffset: state.vars.importantDargCompsOffset,//定位xy轴
        compsList: state.vars.importantDargCompsList,//组件数组
        showedit:state.vars.showedit,//显示盒子
        CLpagebol:state.vars.CLpagebol,//页面是否显示
        datasource: state.vars.datasource,//数据源
        CLshowchangedata: state.vars.CLshowchangedata,//选择数据树
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        //    let pageid=window.location.search.replace(/[^0-9]/ig,""); 
        // Clajax('/web/PagemsgSendService','get',{pageid: pageid},function(res){
        //     if(res.message=='ok'){
        //         let path=JSON.parse(res.data);
                 dispatch(actions.setVars('CLpagebol', true)); 
        //         $("#sss2").load("http://"+path.path, function() {
        //             let ss2='';
        //             //判断是否为空
        //             if($("#sss2").text()==''||$("#sss2").text()==undefined){
        //                  ss2=$("#sss2").text();
        //             }else{
        //                  ss2=JSON.parse($("#sss2").text())
        //             }
        //             dispatch(actions.setVars('importantActiveComps', {}));
        //             dispatch(actions.setVars('importantDargCompsList', ss2.datadom));
        //             dispatch(actions.setVars('backprev', ss2.datadom));
        //             dispatch(actions.setVars('CLdataAarr', ss2.datasourse));
        //             dispatch(actions.setVars('datasource', ss2.datasourse));
        //             dispatch(actions.setVars('boxbool', true)); 
                     
        //             $('#allbox1').css('display','none')
        //         });
        //     }else{
        //         browserHistory.push('NotFount');
        //     }

        // })

        },
    }
}

Container = connect(mapStateToProps, mapDispatchToProps)(Container)

export default DragDropContext(HTML5Backend)(Container)

