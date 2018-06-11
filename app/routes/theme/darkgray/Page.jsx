import React from 'react'
import Header from './Header'
import Tree from './Tree'
import Body from './Body'
import CompsInfoEdit from '../../cms/CompsInfoEdit'

let Theme = React.createClass({
  render () {
    let {params: {header, menu, page}, pageinfo, params, type} = this.props;
    return (
      <div>
        <Header params={params} pageinfo={pageinfo} type={type}/>
        <Tree params={params} pageinfo={pageinfo} type={type}/>
        <Body header={header} menu={menu} page={page} type={type}/>
      </div>
    )
  }
})

export default Theme
