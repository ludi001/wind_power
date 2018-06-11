import React from 'react'
import {connect} from 'react-redux'
import styles from './View.scss'
import actions from 'fengui/redux/actions'
import {browserHistory} from 'react-router'
import Look from './showlook'

let Header = React.createClass({
  render() {
    let {compsOffset,compsList,datasource} = this.props;
    return (
      <div className={styles.mainBox} >
        <div className={styles.bodybox} id='view'>
          <Look compsOffset={compsOffset} compsList={compsList} datasource={datasource} />
        </div>
      </div>
    );
  }
})

const mapStateToProps = (state) => {
  return {
     compsList: state.vars.importantDargCompsList,
     
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
