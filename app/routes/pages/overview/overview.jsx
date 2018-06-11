import React from "react";
import {connect} from 'react-redux';
import actions from 'fengui/redux/actions';
var $ = require('jquery');
import css from './overview.scss';
import ajax from '../functionCom/myAjax.js';
const myAjax=ajax.myAjax;
import Header from "../Header.jsx";//导航
import AlertBox from "../functionCom/alertBox.jsx";//弹框
import FixedContent from '../../../components/FixedContent.jsx';//屏幕调整
import Tree from './tree.jsx';//信息树
import Content from "../../module/Content.jsx"
let Component = React.createClass({
  componentDidMount() {
    this.props.init();
  },
  componentDidUpdate(){

  },
  render() {
    let {params,showData}=this.props; 
    let children;
    switch(params.pageId){
      case '0001007':
        children = <Content url={showData} />
        break;
      case '0001003':
        children = <Content url={showData} />
        break;
      case 'distribution2':
        children = <div>分布2</div>
        break;
      case 'distribution3':
        children = <div>分布3</div>
        break;
      case 'topology1':
        children = <div>机位拓扑1</div>
        break;
      case 'topology2':
        children = <div>机位拓扑2</div>
        break;
      case 'topology3':
        children = <div>机位拓扑3</div>
        break;
      case '3d1':
        children = <div>3d全景1</div>
        break;
      case '3d2':
        children = <div>3d全景2</div>
        break;
      case '3d3':
        children = <div>3d全景3</div>
        break;
      case 'video1':
        children = <div>监控视频1</div>
        break;
      case 'video2':
        children = <div>监控视频2</div>
        break;
      case 'video3':
        children = <div>监控视频3</div>
        break;
    }
    return (
      <FixedContent mode="fullWidth">
        {
        	<div className={css.overview}>
        		<Header params={params}/>
        		<div className={css.float}></div>
            <div className={css.contentBox}>
              <Tree/>
              <div className={css.pageBox}>
                {children}
              </div>              
            </div>
        	</div> 
        }
      </FixedContent>  
    )
  }
});
const mapStateToProps = (state) => {
    return {
      showData:state.vars.showData
    }
};

const mapDispatchToProps = (dispatch) => {
  return {
    init: ()=> {
      
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
