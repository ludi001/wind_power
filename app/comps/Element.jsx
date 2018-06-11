import React from 'react'
import Card from './Card'
import Label from './CLlabel'
import Probar from './CLprobar'
import PieChart from './chart/CLPie'
import DatePicker from './DatePicker'
import LineChart from './chart/CLLine'
import Annulus from './chart/CLAnnulus'
import Bar from './chart/CLBar'
import Column from './chart/CLColumn'
import Coline from './chart/CLColine'
import Stack from './chart/CLStack'
import CLSelect from './CLSelect'
import CLButton from './CLButton'
import Table from './Table'
import CLTable from './CLtable'
import Dashboard from './CLDashboard'
import Temp from './CLTemp'
import Double from './chart/CLDouble'
import CLdiv from './CLdiv'

let Comp = React.createClass({
  render () {
    let {type,DataSourse} = this.props;
    
    switch (type) {
      case 'label':
        return <Label compInfo={this.props}/>
      case 'div':
        return <CLdiv compInfo={this.props}/>
      case 'card':
        return <Card compInfo={this.props}/>
      case 'button':
        return <CLButton compInfo={this.props}/>
      case 'select':
        return <CLSelect compInfo={this.props}/>
      case 'table':
        return <Table compInfo={this.props}/>
       case 'table1':
        return <CLTable compInfo={this.props}/>
      case 'probar':
        return <Probar compInfo={this.props}/>
      case 'pie':
        return <PieChart compInfo={this.props}/>
      case 'DatePicker':
        return <DatePicker compInfo={this.props}/>
      case 'line':
        return <LineChart compInfo={this.props}/>
      case 'annulus':
        return <Annulus compInfo={this.props}/>
      case 'column':
        return <Column compInfo={this.props}/>
      case 'coline':
        return <Coline compInfo={this.props}/>
      case 'stack':
        return <Stack compInfo={this.props}/>
      case 'bar':
        return <Bar compInfo={this.props}/>
      case 'double':
        return <Double compInfo={this.props}/>
       case 'dashboard':
        return <Dashboard compInfo={this.props}/>
      case 'temp':
        return <Temp compInfo={this.props}/>
      default:
        return <div></div>
    }
  }
})

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default Comp

