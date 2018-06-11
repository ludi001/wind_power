import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import ItemTypes from './ItemTypes';
import {dispatch} from 'fengui/redux/store';
import actions from 'fengui/redux/actions';
import _ from 'lodash';
import compsDetail from '../compsInfo/compsDetail';
import {Tooltip} from 'antd';

const style = {
   
    cursor: 'move',
    display: 'inlineBlock',
    width: '100%',
    float: 'left',
    paddingLeft: '10px',
    lineHeight:'35.5px',

};

let compsListN;

const boxSource = {
    beginDrag(props) {
        console.log('开始拖拽')
        dispatch(actions.setVars('importantDragCompsInfo', props));

        return {
            ...props
        };
    },
    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        if(dropResult){
        console.log('结束拖拽',props)
        let rowheight=Number(sessionStorage.getItem('rowHeight'))
        let allxy=JSON.parse($.cookie('compsOffset'))
        console.log(898898,allxy)
        //获取坐标格数
        allxy.x=parseInt((allxy.x-200)/rowheight);
        allxy.y=parseInt((allxy.y+$('#maskbox').scrollTop()-70)/rowheight);
        dispatch(actions.setVars('importantDargCompsOffset', allxy));
        dropResult.compsOffset=allxy;
        console.log('dropResult',dropResult)
        let compsInfo = {
            ...item,
            ...dropResult,
            detail: compsDetail[item.type]
        }
        console.log('结束拖拽',compsInfo)
        compsInfo.compsList='';

        let nCompsList = _.cloneDeep(compsListN);
        nCompsList = nCompsList || [];
        nCompsList.push(compsInfo);
        console.log(999,nCompsList)
        
        dispatch(actions.setVars('importantActiveComps', {}));
        dispatch(actions.setVars('importantDragCompsInfo', false));
        dispatch(actions.setVars('importantDargCompsList', nCompsList));
        dispatch(actions.setVars('iconcolor', true));//激活复制删除
         dispatch(actions.setVars('boxbool', true)); 
        setTimeout(function(){
       
         dispatch(actions.setVars('importantActiveComps', {type: compsInfo.type, key: nCompsList.length - 1 || 0}));
        //将值传给盒子编辑
        $('#allbox1').css('display','block')
        $('#allbox1').find('input').eq(0).val(nCompsList[nCompsList.length - 1 || 0].width)
        $('#allbox1').find('input').eq(1).val(nCompsList[nCompsList.length - 1 || 0].height)
        $('#allbox1').find('input').eq(2).val(allxy.x)
        $('#allbox1').find('input').eq(3).val(allxy.y)
        $('#allbox1').find('input').eq(4).val(compsInfo.index)
        },100)
        

        }
    },
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))

export default class Box extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
    };

    componentWillUpdate() {
        let {compsList} = this.props;
        compsListN = compsList;
    };

    render() {
        const {isDragging, connectDragSource} = this.props;
        const {name,imgurl} = this.props;
        const opacity = isDragging ? 0.4 : 1;
      
        return (
            connectDragSource(
                <div style={{...style, opacity}}>
                    {name}
                    <Tooltip placement="rightTop" title={<img src={imgurl} />}>
                    <img src={imgurl} />
                     </Tooltip>
                </div>
            )
        );
    }
}

