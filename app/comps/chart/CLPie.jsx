import React from 'react';
var ReactHighcharts = require('react-highcharts');
import actions from 'fengui/redux/actions'
import {connect} from 'react-redux'
let autoHeight;
let Component = React.createClass({
  render() {
    let {detail,DataSourse}=this.props.compInfo;
    let data;
    console.log(990,DataSourse)
    DataSourse && (data=DataSourse[detail.datasourse])
    let configPie = {
      chart: {
        type: 'pie',
        backgroundColor: "rgba(46, 46, 65, 0)",
        plotBackgroundColor: "rgba(46, 46, 65, 0)",
        plotBorderWidth: 0,
        borderWidth: 0,
        plotShadow: false,
        height:detail.height
      },
      title: {
        text: detail.title,
        margin:detail.distance/1,
        style:{
          color: detail.yColor,
        }
      },
      colors:[detail.color,detail.color1],
      tooltip: {
        enabled: true,
        pointFormat: '{series.name}: <b>{point.y}</b> 比例:<b>{point.percentage:.1f}%</b>',
        // pointFormat: "<b>{point.percentage:.0f}%</b>"
        style:{
          color: detail.yColor,
          fontSize: '12px',
          fontFamily: "微软雅黑"
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
        pie: {
          allowPointSelect: false,
          cursor: 'pointer',
          borderWidth: 0,
          dataLabels: {
            enabled: false,
            format: '{point.name}',
            style:{
              color:detail.yColor,
              fontSize: '12px',
              fontFamily: "微软雅黑"
            },
          },
        }
      },
      series: [{
        name: detail.unit,
        data: data?data:[1,2,3,1]
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
    asset: state.vars.intellV2Asset,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      autoHeight= $("[name='autoHeight']")[0].offsetHeight;
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)

