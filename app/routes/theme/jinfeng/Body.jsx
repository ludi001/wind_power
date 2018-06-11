import React from 'react'
import styles from './Body.scss'
import Content from '../../module/Content'
import Tab from './Tab'
import {connect} from 'react-redux'
import actions from 'fengui/redux/actions'

let Body = React.createClass({
  render () {
    let {params,pageinfo,skinStyle,cssif,cltab,cltree} = this.props;
      return (
      	<div style={{left:cltree==true?(cssif==='left'?'40px':'70px'):'0px'}} className={`${skinStyle==1?styles.mainBoxBlue:skinStyle==2?styles.mainBoxWhite:styles.mainBox} ${cssif==='left'? styles.animate : styles.sdsd} ${cssif==='right'? styles.animate1 : styles.sdsd}`}>
      		{cltab==true&&<Tab pageinfo={pageinfo} />}
        	<div className={styles.Contenttxt}>
        		<Content url={params.page}/>
        	</div>
        </div>
      )
  }
})
const mapStateToProps = (state) => {
  return {
    skinStyle: state.vars.skinStyle,
    cssif:state.vars.cssif,
    cltree: state.vars.cltree,
    cltab: state.vars.cltab,
  }
}

const mapDispatchToProps = (dispatch) => {
	return{

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Body)
