import React from 'react'
import {connect} from 'react-redux'
import styles from './Header.scss'
import {Menu, Icon} from 'antd'
import actions from 'fengui/redux/actions'
import { browserHistory } from 'react-router'

let Header = React.createClass({
  componentWillMount () {
    let {init, params: {header}, pageinfo} = this.props;
    init(header, pageinfo);
  },
  render() {

    let {changeActiveKey, activeKey, pageinfo} = this.props;
    console.log('gray',pageinfo)
    return (
      <div className={styles.mainBox}>
        <Menu
          onClick={(e) => changeActiveKey(e)}
          theme= 'dark'
          selectedKeys={[activeKey]}
          mode="horizontal"
          style={{height: '60px', lineHeight: '60px', float: 'right'}}
        >
          {
            pageinfo.menus.map((value, key) => {
              return(
                <Menu.Item key={key} mainPage={value.mainPage}>
                  <Icon type={value.icon}/>{value.name}
                </Menu.Item>
              )
            })
          }
        </Menu>
      </div>
    );
  }
})

const mapStateToProps = (state) => {
  return {
    activeKey: state.vars.headerActiveKey,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: (page, pageinfo) => {
      console.log('gray',pageinfo)
      pageinfo.menus.map((value, key)=>{
        if(value.url === page) {
          dispatch(actions.setVars('headerActiveKey', key.toString()));
        }
      })
    },
    changeActiveKey: (e) => {
      dispatch(actions.setVars('headerActiveKey', e.key));
      browserHistory.push(e.item.props.mainPage);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
