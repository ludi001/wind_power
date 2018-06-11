import React from 'react'
import {connect} from 'react-redux'
import actions from 'fengui/redux/actions'
import Header from '../cms/Header'
import styles from './Page.scss'
import New from '../../img/new.png'
import data from './data'
import {Icon,Modal, Button,Input,Select,Popconfirm,message,Tooltip} from 'antd'
import { browserHistory } from 'react-router'
const Option = Select.Option;
let style1={
      width:'100%',
      overflow:'hidden',
      marginBottom:'8px'
}
let label={
        width:'100px',
        lineHeight:'30px',
        float:'left',
        textAlign:'right'
}
let input={
        float:'left',
        marginLeft:'10px',
        width:'320px'
}
let Container = React.createClass({
    getInitialState(){
        return{
            icon:false,
            visible:false
        }
    },
    componentWillMount () {
        this.props.init();
    },
    entercms(value){
       
        this.setState({
            icon:value.url
        })
        this.props.entercms(value)
    },
    showModal(){
        this.setState({
         visible: true,
        });
        this.props.sentitem()
    },
    handleOk(){
         this.setState({
         visible: false,
        });
    },
    handleCancel(){
        this.setState({
         visible: false,
        });
    },
    sentitem(value){
        this.setState({
         visible: true,
        });
        this.props.sentitem(value)
    },
    render () {
        let {entercms,pageItem,sentitem} = this.props;
        let {icon}=this.state;
         function confirm(e) {
            let obj=this.props.children.props.data;
             console.log(obj);
            message.success('您删除的页面为：'+JSON.stringify(obj))
         
        }
        return (
            <div>
               <Header></Header>
               <div className={styles.mainbox}>
                <div className={styles.icon} style={{marginLeft:'20px'}} onClick={this.showModal}>
                    <img src={New}/>
                    <span>新建</span>      
                </div>
                <div className={styles.tableBox}>
                    <div className={styles.titbox}>
                        <span style={{width:'25%'}}>页面说明</span>
                        <span style={{width:'20%'}}>页面地址</span>
                        <span style={{width:'10%'}}>页面类型</span>
                        <span style={{width:'10%'}}>修改时间</span>
                        <span style={{width:'10%'}}>修改人</span>
                        <span style={{width:'10%',textAlign:'center'}}>可视设计</span>
                        <span style={{width:'15%',textAlign:'center'}}>操作</span>
                    </div>
                    <div className={styles.contentbox}>
                        {
                            data.page.map((value,key)=>{
                                return(
                                    <div className={styles.line} key={key}>
                                        <span style={{width:'25%'}}>{value.explain}</span>
                                        <span style={{width:'20%'}}>{value.url}</span>
                                        <span style={{width:'10%'}}>{value.pagetype}</span>
                                        <span style={{width:'10%'}}>{value.time}</span>
                                        <span style={{width:'10%'}}>{value.people}</span>
                                        <span style={{width:'10%',color:'#3b8be2',cursor:'pointer',textAlign:'center'}}>
                                            <a onClick={()=>this.entercms(value)}>进入</a>
                                            {icon==value.url&&<Icon type="loading" />}
                                            {icon!=value.url&&<Icon type="arrow-right" onClick={()=>entercms(value)} />}
                                        </span>
                                        <span style={{width:'15%',color:'#3b8be2',textAlign:'center'}}>
                                            <Tooltip title="编辑">
                                                <Icon type="edit" style={{marginRight:'20px',cursor:'pointer'}} onClick={()=>this.sentitem(value)}  />
                                            </Tooltip>
                                            <Tooltip title="删除">
                                             <Popconfirm title="确定要删除吗?" onConfirm={confirm}  refs={key} okText="确定" cancelText="取消">
                                                <Icon type="delete" data={value} style={{cursor:'pointer'}} />
                                            </Popconfirm>
                                             </Tooltip>
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
             </div>
              <Modal
                  title="新建页面"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <div style={style1}>
                    <label style={label}>页面说明</label>
                    <Input style={input} placeholder="页面说明" defaultValue={pageItem!=undefined?pageItem.explain:''} />
                  </div>
                  <div style={style1}>
                    <label style={label}>页面地址</label>
                    <Input style={input} placeholder="页面地址" defaultValue={pageItem!=undefined?pageItem.url:''} />
                  </div>
                  <div style={style1}>
                    <label style={label}>页面类型</label>
                    <Select  style={input} defaultValue={pageItem!=undefined?pageItem.pagetype:'定制页面'}>
                          <Option value="定制页面">定制页面</Option>
                          <Option value="组态页面">组态页面</Option>
                    </Select>
                  </div>
                  <div style={style1}>
                    <label style={label}>修改人</label>
                    <Input style={input} placeholder="修改人" defaultValue={pageItem!=undefined?pageItem.people:''} />
                  </div>
                 
                  
            </Modal>
        </div>
        )
    }
})


const mapStateToProps = (state) => {
    return {
       pageItem:state.vars.pageItem,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
        

        },
        entercms:(value)=>{
           
            browserHistory.push('cms');
        },
        sentitem:(value)=>{
            dispatch(actions.setVars('pageItem',value))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)



