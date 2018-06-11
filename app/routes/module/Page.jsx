import React from 'react';
import {connect} from 'react-redux';
import actions from 'fengui/redux/actions';
import apiClient from 'fengui/util/apiClient';
import Theme from '../theme/Theme';
import Loading from 'fengui/component/page/Loading';
var $ = require('jquery');
import {browserHistory} from 'react-router';
let Page = React.createClass({
  componentWillMount () {
    this.props.init();
  },
  render () {
    let {params, pageinfo} = this.props;
    console.log(params);
    if (!pageinfo) {
      console.log('加载中！');
      return <Loading/>
    }
    return (
      <Theme params={params} pageinfo={pageinfo}/>
    )
  }
})


const mapStateToProps = (state) => {
  return {
    pageinfo: state.vars.importantPageInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {

        Clajax('/web/LoginsendService','post',{loginid:'admin',password:'admin'},function(res,bol){

              if(bol==true){
                console.log('登陆',res)
                let obj=res;
                dispatch(actions.setVars('importantPageInfo',obj.data[0]))
              }else{
                browserHistory.push('NotFount');
              }

            })




      // apiClient.get('/mock/pageinfo').then((result) => {
      //   dispatch(actions.setVars('importantPageInfo', result));
      // })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
