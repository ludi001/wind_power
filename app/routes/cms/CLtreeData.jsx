import React from 'react'
import {connect} from 'react-redux'
import styles from './CLtreeData.scss'
import actions from 'fengui/redux/actions'
import {Card,Icon,Tree} from 'antd'
const TreeNode = Tree.TreeNode;
import  WebSoket from '../../../config/socketClient'
var $ = require('jquery');
require('jquery.cookie');
const loop = (data)=>{
      console.log(721,JSON.stringify(data))
            return(
                <div className={styles.treebox}>
                {
                    data&&data.map(function(value,key){
                       
                        if(typeof(value.data)!='string'){
                             console.log(3333,JSON.stringify(value))
                            return <div key={key}>{loop(value.data)}</div>
                        }else{
                            return <div key={key}>{value.name}</div>
                        }
                        
                    })
                }
                </div>
                )

    }
let Treedata = React.createClass({

    componentDidMount(){
        let{datasource}=this.props;
        this.props.init(datasource);
    },
    render() {
        let {compsList, changeFlag,closetreedata,datasource,datatreechange} = this.props;
        return (
            <div  className={styles.treedatabox} >
              <Card className={styles.cardbox} title="选择数据源" extra={<Icon type="close" className={styles.close} onClick={()=>closetreedata()} />}>
                {loop(datatreechange)}
              </Card>
            </div>
        );
    }
})

const mapStateToProps = (state) => {
    return {
       datasource: state.vars.datasource,//数据源
       datatreechange: state.vars.datatreechange,//数据源树选择数据
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init:(datasource)=>{
            console.log(888,datasource)
            let newtree=[];
            if(datasource){
                datasource.map(function(value,key){
                    if(value.type=='websoket'){
                        //这里是websoket方法
                        let warr=[];
                         WebSoket.getConnect(value.url,value.data,'001',function(data){
                            if(data){
                                if(typeof(data)=='object'){
                                    for(let i in data){
                                        warr.push({name:i,data:''})
                                    }
                                }else{
                                    warr=''
                                }
                                stopwebsoket()//停止websoket
                            }
                             
                           
                          },true)

                         function stopwebsoket(){
                             WebSoket.getConnect(value.url,value.data,'001',function(data){
                            console.log('关闭')
                           
                          },false)
                         }
                          newtree.push({name:value.id,key:key,data:warr})

                    }else if(value.type=='get'||value.type=='post'){
                        let obj={}
                        obj=value.data;
                        console.log('obj',obj)
                          Clajax(value.url,value.type,obj,function(res,bol){
                            if(bol==true){
                               if(res.message=='ok'){
                                    if(typeof(res.data)=='object'){

                                    }else{
                                        newtree.push({name:value.id,key:key,data:''})
                                    }
                                   
                                }
                            }
                          })
                    }
                })
            }
            setTimeout(function(){
                console.log(779,newtree)
                dispatch(actions.setVars('datatreechange',newtree))
            },100)
           
        },
        closetreedata:()=>{
            dispatch(actions.setVars('CLshowchangedata',false))
        }
      
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Treedata)
