import React from 'react';
var ReactHighcharts = require('react-highcharts');
import {connect} from 'react-redux'
let Component = React.createClass({
  componentDidMount () {
  },
  componentWillUpdate () {
    this.props.init();
  },
  render() {
    let {autoHeight,xTitle} = this.props;
    let {detail,DataSourse}=this.props.compInfo;
    let data;
    console.log(990,DataSourse)
    DataSourse && (data=DataSourse[detail.datasourse])
    let configPie = {
      chart: {
        type: 'bar',
        height: detail.height
      },
      title: {
        text: detail.title,
        margin:detail.distance/1,
        style:{
          color:detail.yColor
        }
      },
      colors:[detail.color,detail.color1],
      xAxis: {
        categories: xTitle,
        lineColor: detail.xColor,
        gridLineColor:detail.tableColor,
        labels:{
          style:{
            color:detail.yColor
          }
        }
      },
      yAxis: {
        lineColor: detail.yColor,
        lineWidth: 1,
        allowDecimals:false,
        title: {
          text: detail.unit,
          style:{
            color:detail.yColor
          }
        },
        labels:{
          style:{
            color:detail.yColor
          }
        }
      },
      tooltip: {
        valueSuffix: detail.unit,
        style:{
          color:detail.yColor
        }
      },
      // plotOptions: {
      //   bar: {
      //     dataLabels: {
      //       enabled: true,
      //       allowOverlap: true
      //     }
      //   }
      // },
      legend: {
        itemStyle:{
          color:detail.yColor
        }
      },
      credits: {
        enabled: false
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
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)

