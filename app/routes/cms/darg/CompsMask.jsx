import React from 'react'
import {connect} from 'react-redux'
import styles from './CompsMask.scss'
import actions from 'fengui/redux/actions'
import {browserHistory} from 'react-router'
import PrePage from '../PrePage'

let Header = React.createClass({
  render() {
    let {compsList, rowHeight} = this.props;
    return (
      <div className={styles.mainBox} id='maskbox'>
        <PrePage compsList={compsList} rowHeight={rowHeight}/>
      </div>
    );
  }
})

const mapStateToProps = (state) => {
  return {
    compsList: state.vars.importantDargCompsList,
    rowHeight: state.vars.importantRowHeight,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
