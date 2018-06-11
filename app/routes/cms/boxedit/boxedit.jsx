import React from 'react'
import {connect} from 'react-redux'
import styles from './boxedit.scss'
import actions from 'fengui/redux/actions'
var $ =require('jquery')
sessionStorage.setItem('prev','')
let Header = React.createClass({
    
     componentDidMount() {
        this.props.init()
    },
    render() {
        let {compsList,activeComps,setBoxDetail,rowHeight,boxbool,sessionArr} = this.props;
    
       
        
        // console.log('66666666',compsList)
        // console.log('55555555',activeComps)
        if(boxbool){
        return (
            <div className={styles.mainBox1} id='allbox1'>
              <label>盒子宽度:</label><input type='number' min={0}  data-theme={'width'}    onChange={()=> setBoxDetail(compsList,activeComps.key,rowHeight,sessionArr)}/>
              <label>盒子高度:</label><input type='number' min={0}  data-theme={'height'}   onChange={()=> setBoxDetail(compsList,activeComps.key,rowHeight,sessionArr)}/>
              <label>X坐标:</label><input type='number'    min={0}  data-theme={'offsetX'}  onChange={()=> setBoxDetail(compsList,activeComps.key,rowHeight,sessionArr)}/>
              <label>Y坐标:</label><input type='number' min={0}     data-theme={'offsetY'}  onChange={()=> setBoxDetail(compsList,activeComps.key,rowHeight,sessionArr)}/>
              <label>显示层级:</label><input type='number' min={0}     data-theme={'index'}  onChange={()=> setBoxDetail(compsList,activeComps.key,rowHeight,sessionArr)}/>
            </div>
        );
    }else{
        return(
            <div className={styles.mainbox2}></div>
            )
    }
    }
})

const mapStateToProps = (state) => {
    return {
        compsList: state.vars.importantDargCompsList,
        activeComps: state.vars.importantActiveComps,
        rowHeight: state.vars.importantRowHeight,
        boxbool:state.vars.boxbool,
        sessionArr:state.vars.sessionArr,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init:()=>{
           dispatch(actions.setVars('sessionArr', []));
        },
       setBoxDetail:(compsList,key,rowHeight,sessionArr)=>{
        let detail={}
        $('#allbox1 input').each(function(key,value){
            if($(this).data('theme')){
                detail[$(this).data('theme')]=value.value
            }
        
        })


        //获取步骤缓存
        if(sessionArr.length<5){
            sessionArr.push(compsList)
         }else{
          sessionArr.splice(0,1)
            sessionArr.push(compsList)
         }
         sessionStorage.setItem('prev',JSON.stringify(sessionArr))


         let nCompsList = _.cloneDeep(compsList);
         
         
         //console.log('lin',nCompsList)
        // nCompsList[key].detail = detail;
      
        nCompsList[key].compsOffset.x = Number(detail.offsetX);
        nCompsList[key].compsOffset.y = Number(detail.offsetY);
       
        nCompsList[key].height = detail.height;
        nCompsList[key].width = detail.width;
        nCompsList[key].index = detail.index;
        dispatch(actions.setVars('importantDargCompsList', nCompsList));
        
          console.log('jin',nCompsList)
       }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
