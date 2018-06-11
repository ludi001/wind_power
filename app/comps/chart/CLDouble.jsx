import React from 'react';
var ReactHighcharts = require('react-highcharts');
import {connect} from 'react-redux'
let Component = React.createClass({
    componentDidMount () {
    },
    componentWillUpdate () {
    },
    render() {
        let {autoHeight,xTitle,columnData,lineData} = this.props;
        let {detail}=this.props.compInfo;
        var allData=[]
        if(columnData && lineData) {
            columnData.map((value)=> {
                value.type = 'column'
            });
            lineData.map((value)=> {
                value.type = 'line'
            });
            allData = columnData.concat(lineData);
        }
        let configPie = {
            chart: {
                zoomType: 'xy',
                backgroundColor: "rgba(46, 46, 65, 0)",
                plotBackgroundColor: "rgba(46, 46, 65, 0)",
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
            xAxis: [{
                categories: xTitle,
                lineColor: detail.xColor,
                crosshair: true,
                labels:{
                    style:{
                        color:detail.yColor
                    }
                },
            }],
            yAxis: [{ // Primary yAxis
                lineColor: detail.xColor,
                gridLineColor: detail.tableColor,
                lineWidth: 1,
                allowDecimals:false,
                labels: {
                    format: '{value}',
                    style:{
                        color:detail.yColor
                    }
                },
                title: {
                    text: detail.unit1,
                }
            }, { // Secondary yAxis
                lineColor: detail.yColor,
                gridLineColor: detail.tableColor,
                lineWidth: 1,
                allowDecimals:false,
                title: {
                    text: detail.unit2,
                },
                labels: {
                    format: '{value}',
                },
                opposite: true
            }],
            tooltip: {
                shared: true,
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
            series: {
                animation搜索: false
            }
        },
            series: allData && [{
                name: '降雨量',
                type: 'column',
                yAxis: 1,
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            }, {
                name: '温度',
                type: 'spline',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
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

