import React from 'react'
import {connect} from 'react-redux'
import styles from './datasource.scss'
import actions from 'fengui/redux/actions'
import {Button,Icon,Card,Row, Col,Input,message,Popconfirm} from 'antd'
import Ds from './initdata'
var $ = require('jquery');
let Header = React.createClass({
 
componentDidMount() {
  let{datasource}=this.props;
    this.props.init(datasource)
},
  sentData(data){
    let bol=true;
    if(data.length>0){
      data.map(function(value,key){
       if(value.edit==true){
        bol=false;
     
       }
      })
    }

     if(bol){

       message.success('保存的数据为: '+JSON.stringify(data))
       this.props.closeBox(data)
    }else{
        message.error('字段必须全部保存才能提交！')
    }
   
  },

  render() {
    let {closeBox,datasource,EditItem,SaveItem,DeleteItem,NewItem,bobor} = this.props;

    function confirm(e) {

         console.log(this);
         DeleteItem(datasource,this.props.refs)
     
    }
    return (
     <div className={styles.showbox}>
        <div className={styles.sorse}>
          <p className={styles.close}><Icon type="close-circle"onClick={()=>closeBox()} /></p>
          <Card title="数据源" bordered={false} style={{ width: '660px',margin:'10px auto' }} extra={<a onClick={()=>NewItem(datasource)} >新建＋</a>} >
            <div className={styles.titlebox}>
              <Col span={2}>ID</Col>
              <Col span={6}>地址(url)</Col>
              <Col span={4}>类型(type)</Col>
              <Col span={8}>参数(parame)</Col>
              <Col span={4}>操作(operat)</Col>
            </div>
            <div className={styles.databox}>
               
                  {
                    datasource&&datasource.map(function(value,key){

                      if(value.edit==true){
                        console.log(value)
                        return(
                             <div className={styles.dataItem} key={key} id={'inputbox'+key}>
                                <Col className={styles.iteminput} span={2}><Input  onFocus={(e)=>bobor('inputbox'+key,0)} defaultValue={value.id} /></Col>
                                <Col className={styles.iteminput} span={6}><Input  onFocus={(e)=>bobor('inputbox'+key,1)} defaultValue={value.url} /></Col>
                                <Col className={styles.iteminput} span={4}><Input  onFocus={(e)=>bobor('inputbox'+key,2)} defaultValue={value.type} /></Col>
                                <Col className={styles.iteminput} span={8}><Input   defaultValue={value.data} /></Col>
                                <Col span={4}>
                                <Icon type="check-circle-o" style={{marginTop:'9px',color:'#108ee9',cursor:'pointer',fontSize:'16px'}} title={'保存'} onClick={()=>SaveItem(datasource,key,'inputbox'+key)}  />
                                <Popconfirm title="确定要删除吗?" onConfirm={confirm}  refs={key} okText="确定" cancelText="取消">
                                <Icon type="delete"  style={{marginLeft:'10px',color:'#108ee9',cursor:'pointer',fontSize:'16px'}} title={'删除'} />
                                </Popconfirm>
                                </Col>

                               </div>
                          )
                      }else{
                          return(
                              <div className={styles.dataItem} key={key}>
                                <Col span={2}><div className={styles.itemtxt}>{value.id}</div></Col>
                                <Col span={6}><div className={styles.itemtxt}>{value.url}</div></Col>
                                <Col span={4}><div className={styles.itemtxt}>{value.type}</div></Col>
                                <Col span={8}><div className={styles.itemtxt}>{value.data}</div></Col>
                                <Col span={4}>
                                <Icon type="edit" style={{color:'#108ee9',cursor:'pointer',fontSize:'16px'}} title={'编辑'} onClick={()=>EditItem(datasource,key)} />
                                <Popconfirm title="确定要删除吗?" onConfirm={confirm}  refs={key} okText="确定" cancelText="取消">
                                <Icon type="delete"  style={{marginLeft:'10px',color:'#108ee9',cursor:'pointer',fontSize:'16px'}} title={'删除'} />
                                 </Popconfirm>
                                </Col>
                               </div>
                              )
                      }
                      
                    })
                  }
              
            </div>
            <p style={{textAlign:'right',marginTop:'10px'}}><Button onClick={()=>this.sentData(datasource)}  type="primary">提交</Button></p>
          </Card>
        </div>
      </div>
    
    );
  }
})

const mapStateToProps = (state) => {
  return {
    compsList: state.vars.importantDargCompsList,
    
    datasource: state.vars.datasource,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init:(datasource)=>{
      if(!datasource){
        datasource=Ds.dataItem;
      }
    },
    closeBox:(data)=>{
      if(data){
        dispatch(actions.setVars('CLdataAarr',data));
      }
       dispatch(actions.setVars('dataflag',false));
    },
    EditItem(dataArr,index){
      dataArr.map(function(value,key){
        if(key==index){
          value.edit=true;
        }
      })
      dispatch(actions.setVars('datasource',[]));
      dispatch(actions.setVars('datasource',dataArr));

    },
    SaveItem:(dataArr,index,id)=>{
       let bol=true;
       dataArr.map(function(value,key){
        if(key==index){
          if($('#'+id).find('input').eq(0).val()==''){
            message.error('ID不能为空！');
            $('#'+id).find('input').css('box-shadow','none');
            $('#'+id).find('input').eq(0).css('box-shadow','0px 0px 5px #e62267');
           
            bol=false;
            return ;
          }else if($('#'+id).find('input').eq(1).val()==''){
            message.error('地址不能为空！');
            $('#'+id).find('input').css('box-shadow','none');
           
            $('#'+id).find('input').eq(1).css('box-shadow','0px 0px 5px #e62267');
            
             bol=false;
             return ;
          }else if($('#'+id).find('input').eq(2).val()==''){
            message.error('类型不能为空！');
            $('#'+id).find('input').css('box-shadow','none');
           
            $('#'+id).find('input').eq(2).css('box-shadow','0px 0px 5px #e62267');
            
             bol=false;
             return ;
          }else{
            value.edit=false;
            value.id=$('#'+id).find('input').eq(0).val();
            value.url=$('#'+id).find('input').eq(1).val();
            value.type=$('#'+id).find('input').eq(2).val();
            value.data=$('#'+id).find('input').eq(3).val();
          }
          
        }
      })
       if(bol){
        dispatch(actions.setVars('datasource',[]));
        dispatch(actions.setVars('datasource',dataArr));
       }
      
    },
    DeleteItem:(dataArr,index)=>{
      console.log(1111,dataArr)
       dataArr.map(function(value,key){
        if(key==index){
          dataArr.splice(key,1)
        
        }
      })
       console.log(dataArr)
      dispatch(actions.setVars('datasource',[]));
      dispatch(actions.setVars('datasource',dataArr));
    },
    NewItem:(dataArr)=>{
      if(dataArr==undefined){
        dataArr=[];
      }
      let obj={
        url:'',
        type:'',
        data:'',
        edit:true
      }
      console.log(dataArr)
      dataArr.splice(dataArr.length,0,obj)
      console.log(666,dataArr)
       dispatch(actions.setVars('datasource',[]));
      dispatch(actions.setVars('datasource',dataArr));
    },
    bobor:(id,key)=>{
      $('#'+id).find('input').eq(key).css('box-shadow','none');
     
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
