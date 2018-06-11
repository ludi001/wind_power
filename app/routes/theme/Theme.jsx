import React from 'react'
import DarkGray from './darkgray/Page'
import JinFeng from './jinfeng/Page'

let Page = React.createClass({
  render () {
    let {params, pageinfo} = this.props;
    return (
      <div>
        {
          pageinfo.defulatTopic.menutopicid === '002' && <DarkGray params={params} pageinfo={pageinfo}/>
        }
         {
          pageinfo.defulatTopic.menutopicid === '001' && <JinFeng params={params} pageinfo={pageinfo}/>
        }
      </div>
    )
  }
})

export default Page
