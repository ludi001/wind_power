import React from 'react'
import {connect} from 'react-redux'
import actions from 'fengui/redux/actions'
import styles from './Header.scss'
import {Modal, Form, Row, Col, Input} from 'antd'
const FormItem = Form.Item;

const pageInfo = [
    {
        title: '页面url',
        name: 'url',
        placeholer: '请输入页面url'
    }, {
        title: '页面主题',
        name: 'theme',
        placeholer: '请输入页面主题'
    }, {
        title: '页面数据源',
        name: 'ds',
        placeholer: '请输入页面数据源'
    }
]

let PageInfoEdit = React.createClass({
    getFields() {
        const count = 6;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };
        const children = [];
        pageInfo.map((value, key) => {
            children.push(
                <Col span={12} key={key} style={{display: key < count ? 'block' : 'none'}}>
                    <FormItem {...formItemLayout} label={value.title}>
                        {getFieldDecorator(value.name)(
                            <Input placeholder={value.placeholer}/>
                        )}
                    </FormItem>
                </Col>
            );
        })
        return children;
    },
    render() {
        let {showFlag, closeModal} = this.props;
        let {getFieldsValue} = this.props.form;
        return (
            <div className={styles.mainBox}>
                <Modal
                    title="Basic Modal"
                    visible={showFlag}
                    onOk={() => closeModal(getFieldsValue())}
                    onCancel={() => closeModal(getFieldsValue())}
                >
                    <Form
                        className="ant-advanced-search-form"
                    >
                        <Row gutter={40}>{this.getFields()}</Row>
                    </Form>
                </Modal>
            </div>
        );
    }
})

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: (data) => {
            dispatch(actions.setVars('importantPageInfoEditShowFlag', false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PageInfoEdit));
