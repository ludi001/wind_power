import React from 'react'
import {connect} from 'react-redux'
import styles from './CompsInfoEdit.scss'
import {loading} from 'fengui/component/popup'
import actions from 'fengui/redux/actions'
import {browserHistory} from 'react-router'
import compsInfo from './compsInfo/index'
import Label from './compsInfo/LabelEdit'
import Card from './compsInfo/CardEdit'
import Probar from './compsInfo/ProbarEdit'
import PieChart from './compsInfo/PieChart'
import PieChart1 from './compsInfo/PieChart1'
import Table from './compsInfo/TableEdit'
import Table1 from './compsInfo/CLtableEdit'
import Select from './compsInfo/SelectEdit'
import LineChart from './compsInfo/LineChart'
import Button from './compsInfo/ButtonEdit'
import Dashboard from './compsInfo/DashboardEdit'
import Temp from './compsInfo/TempEdit'
import CLdiv from './compsInfo/CLdivEdit'

let Comps = React.createClass({
  render () {
    let {activeComps} = this.props;
    switch (activeComps && activeComps.type) {
      case 'label':
        return <Label activeComps={activeComps}/>

      case 'div':
        return <CLdiv activeComps={activeComps}/>

      case 'button':
        return <Button activeComps={activeComps}/>

      case 'select':
        return <Select activeComps={activeComps}/>

      case 'probar':
        return <Probar activeComps={activeComps}/>

      case 'table':
        return <Table activeComps={activeComps}/>

       case 'table1':
        return <Table1 activeComps={activeComps}/>

      case 'card':
        return <Card activeComps={activeComps}/>

       case 'dashboard':
        return <Dashboard activeComps={activeComps}/>
      case 'temp':
        return <Temp activeComps={activeComps}/>
      case 'double':
        return <PieChart1 activeComps={activeComps}/>
      case 'pie': case 'annulus':
      return <PieChart activeComps={activeComps}/>
      case 'column': case 'line': case 'coline': case 'stack': case 'bar':
        return <LineChart activeComps={activeComps}/>

      default:
        return <div className={styles.mainBox3}></div>
    }
  }
})

const mapStateToProps = (state) => {
  return {
    activeComps: state.vars.importantActiveComps,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comps)
