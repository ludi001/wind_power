import React from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';

import styles from './CLTemp.scss';



let Component = React.createClass({
    componentWillMount() {

    },
    componentWillUpdata() {
        let{} = this.props;
    },
    render() {
        let{data8,indexName,indexName2,indexName3} = this.props;
        let {detail} = this.props.compInfo;
            // 水温
        // let ytemp = Number(data8['00000015']); // 油温
        if(detail.data  >= 150){
            detail.data  = 150;
        }
        $("#watertemp").animate({
                    top:112-detail.data/1.333,
                    duration: "slow",
                }, 200)
        // if(ytemp >= 150){
        //     ytemp = 150;
        // }
        // $("#boiltemp").animate({
        //             top:112-ytemp/1.333,
        //             duration: "slow",
        //         }, 200)
        
        return (
           
        <div className={styles.tempBox} style={{fontSize:detail.size+'px',marginLeft:detail.left+'px', marginTop:detail.top+'px'}}>
            <div className={styles.temp}>
                    <div className={styles.thermometer1}>

                        <div id = "watertemp"></div>
                    </div>
                    <p style={{color:detail.color}}><span>{detail.title}</span><span>{detail.data}</span><span>{detail.unit}</span></p>
            </div>
        </div>
            
        );
        
    }
});


const mapStateToProps = (state) => {
    return {
        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        init: () => {
            
        },
       
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
