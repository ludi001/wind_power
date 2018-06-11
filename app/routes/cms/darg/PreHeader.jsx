import React from 'react'
import {connect} from 'react-redux'
import styles from './PreHeader.scss'
import actions from 'fengui/redux/actions'
import { browserHistory } from 'react-router'

let Header = React.createClass({
    render() {
        let {compsList} = this.props;
        return (
            <div className={styles.mainBox} onClick={()=>{console.log(compsList)}}>
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
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
