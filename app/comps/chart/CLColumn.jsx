import React from 'react';
var ReactHighcharts = require('react-highcharts');
import {connect} from 'react-redux'
let Component = React.createClass({
  componentDidMount () {
  },
  componentWillUpdate () {
  },
  render() {
    let {autoHeight,xTitle} = this.props;
    let {detail,DataSourse}=this.props.compInfo;
    let data;
    console.log(990,DataSourse)
    DataSourse && (data=DataSourse[detail.datasourse])
    let configPie = {
      chart: {
        type: 'column',
        backgroundColor: "rgba(46, 46, 65, 0)",
        plotBackgroundColor: "rgba(46, 46, 65, 0)",
        plotBorderWidth: 0,
        borderWidth: 0,
        plotShadow: false,
        height: detail.height
      },
      title: {
        text: detail.title?detail.title:'',
        style:{
          color:detail.yColor
        },
        margin:detail.distance/1
      },
      colors:[detail.color,detail.color1],
      xAxis: {
        categories: xTitle,
        lineColor: detail.xColor,
        labels:{
          style:{
            color:detail.yColor
          }
        },
        gridLineColor:detail.tableColor
      },
      yAxis: {
        lineColor: detail.xColor,
        gridLineColor: detail.tableColor,
        lineWidth: 1,
        allowDecimals:false,
        labels:{
          style:{
            color:detail.yColor
          }
        },
        title: {
          text: detail.unit,
          style:{
            color:detail.yColor
          }
        }
      },
      tooltip: {
        // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        style:{
          color:detail.yColor
        }
      },
      credits: {
        enabled: false //不显示highCharts版权信息
      },
      legend:{
        itemStyle:{
          color:detail.yColor
        }
      },
      plotOptions: {
        column: {
          // colorByPoint : true,
          allowPointSelect: false,
          cursor: 'pointer',
          borderWidth: 0,
          maxPointWidth: 50,
          size: '100%',
          innerSize: '80%',
          dataLabels: {
            enabled: false
          }
        }
      },
      series: data?data: [{
            name: '东京',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
          }, {
            name: '纽约',
            data: [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
          }]
    };
    return (
        <div  style={{width: detail.width+"%", marginLeft:detail.left+'px', marginTop:detail.top+'px'}}>
          <ReactHighcharts config={configPie}/>
        </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    asset: state.vars.intellV2Asset
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(actions.setVars('autoHeight', $("[name='autoHeight']")[0].offsetHeight));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)

