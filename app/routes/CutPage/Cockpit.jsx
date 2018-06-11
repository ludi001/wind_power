import React from 'react';
import {connect} from 'react-redux';
import styles from './Cockpit.scss';
import actions from 'fengui/redux/actions'
var $ = require('jquery');
import Ybp from './compchart/CLybp'






let Component = React.createClass({
    componentDidMount() {
        this.props.init();
    },

    render() {
      let{url}=this.props;
        return(
            <div  className={styles.bodyBox}>
               {url}
               <p>这是定制页面</p>
               

                <Ybp />


            </div>

        )
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
