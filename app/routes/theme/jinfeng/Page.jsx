import React from 'react'
import Header from './Header'
import Tree from './Tree'
import Body from './Body'
import Login from './Login'
import CompsInfoEdit from '../../cms/CompsInfoEdit'
import actions from 'fengui/redux/actions'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';
var $ =require('jquery');
require('jquery.cookie');
let Theme = React.createClass({
 
  render () {
    let {params: {page}, pageinfo, params} = this.props;
       return (
      <div>
        <Header params={params} pageinfo={pageinfo}/>
      </div>
    )
   
  }
})
const mapStateToProps = (state) => {
    return {
     
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
     
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
