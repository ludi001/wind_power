import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';
import ItemTypes from './ItemTypes';
import styles from './Dustbin.scss';
import BackgroundBox from './BackgroundBox';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';
import CompsMask from './CompsMask';

let compsOffset;
const boxTarget = {
    drop() {
         
         
     
        return {
            compsOffset,
        };
    },
    hover(props, monitor) {
        if (props.compsOffset && props.compsOffset.x === monitor.getClientOffset().x && props.compsOffset.y === monitor.getClientOffset().y) {
            return
         }
         
        compsOffset = props.compsOffset;
        let str=JSON.stringify(monitor.getClientOffset())
        let prey=$('body').height();
        
        if(monitor.getClientOffset().y>prey-100){
            console.log('下拉')
            console.log($('#maskbox').scrollTop())
            $('#preboxl').height($('#preboxl').height()+2)
            $('#maskbox').scrollTop($('#maskbox').scrollTop()+2)
        }
        $.cookie('compsOffset',str)
      
       
       

         //dispatch(actions.setVars('importantDargCompsOffset', monitor.getClientOffset()));
   
        
    }
};

@DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    getOffSet: monitor.getClientOffset()
}))

export default class Dustbin extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
    };

    render() {
        const {canDrop, isOver, connectDropTarget, compsOffset} = this.props;
         console.log('compsOffset',compsOffset)
        const isActive = canDrop && isOver;

        return connectDropTarget(
            <div className={styles.mainBox}>
                <BackgroundBox compsOffset={compsOffset}>
                    <CompsMask/>
                </BackgroundBox>
            </div>
        );
    }
}
