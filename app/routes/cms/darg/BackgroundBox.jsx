import React from 'react'
import styles from './BackgroundBox.scss'
import {Row, Col} from 'antd'
import $ from 'jquery'
import {connect} from 'react-redux'
import actions from 'fengui/redux/actions'
import {getPosition, getColAct, getRowAct} from './method'

let comps = React.createClass({
  getColRow (compsOffset) {
    let col, rowl;
    if (getPosition(compsOffset, $(this.refs.box).width() / 24)) {
      col = getPosition(compsOffset, $(this.refs.box).width() / 24).col || '';
      rowl = getPosition(compsOffset, $(this.refs.box).width() / 24).row || '';
    }
    return {
      col: col,
      rowl: rowl
    }
  },
  componentDidMount () {
    let {setHeight} = this.props;
    setHeight($(this.refs.box).width() / 24);
  },
  render() {
    let {rowHeight, compsOffset, dragInfo} = this.props;
   
    let {col, rowl} = this.getColRow(compsOffset);
    return (
      <div className={styles.mainBox}>
        {this.props.children}
        <div className={styles.bgBox} ref='box' >
          {
            Array.from(new Array(24)).map((row, index) => {
              return (
                <Row style={{height: rowHeight ? rowHeight : ''}} key={index}>
                  {
                    Array.from(new Array(24)).map((value, key) => {
                      return (
                        <Col span={1}
                             className={ `${key % 2 - index % 2 ? styles.bgLine : styles.bgLineAct} ${getColAct(dragInfo, this.getColRow(compsOffset), key)}`}
                             key={key}/>
                      )
                    })
                  }
                </Row>
              )
            })
          }
        </div>
      </div>
    );
  }
})


const mapStateToProps = (state) => {
  return {
    rowHeight: state.vars.importantRowHeight,
    dragInfo: state.vars.importantDragCompsInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setHeight: (height) => {
      dispatch(actions.setVars('importantRowHeight', height));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(comps)　
