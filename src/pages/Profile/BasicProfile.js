import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Icon, Input, Modal, Button } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';
import Link from 'umi/link';

const { Description } = DescriptionList;

const progressColumns = [
  {
    title: '参数名称',
    dataIndex: 'name',
    key: 'name',
    width: '15%',
  },
  {
    title: '参数类型',
    dataIndex: 'type',
    key: 'type',
    width: '10%',
    render: (text, record) => {
      if (record.type == null) {
        return (
          <a>{record.ref}</a>
          /*<Link to={`/profile/basic/${record.key}`}>{record.ref}</Link>*/
        );
      }
      return text;
    },
  },
  {
    title: '参数描述',
    dataIndex: 'description',
    key: 'description',
    width: '30%',
  },
  {
    title: '举例说明',
    dataIndex: 'example',
    key: 'example',
    ellipsis: true,
    width: '30%',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/querySwaggerDetail'],
}))
class BasicProfile extends Component {
  state = { visible: false };
  showModal = key => {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/getSwaggerDefinition',
      payload: key,
    });

    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;
    dispatch({
      type: 'profile/querySwaggerDetail',
      payload: params.id,
    });
  }

  render() {
    const { profile = {}, loading } = this.props;
    const { data = {}, detail = {} } = profile;
    const { resultDataList = [] } = detail;
    const { requestParamVos = [], requestResultVos = [] } = data;

    const definitionColumn = [
      {
        title: '参数名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
      },
      {
        title: '是否必须',
        dataIndex: 'required',
        key: 'required',
        width: '5%',
        render: text => {
          if (text) {
            return <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />;
          } else {
            return <Icon type="close-circle" theme="twoTone" twoToneColor="#7B7D7B" />;
          }
        },
      },
      {
        title: '参数类型',
        dataIndex: 'type',
        key: 'type',
        width: '10%',
        render: (text, record) => {
          if (record.type == null) {
            return (
              <Button type="link" onClick={() => this.showModal(record.ref)}>
                {record.ref}
              </Button>
            );
          }
          return text;
        },
      },
      {
        title: '参数描述',
        dataIndex: 'description',
        key: 'description',
        width: '30%',
      },
      {
        title: '默认值',
        dataIndex: 'example',
        key: 'example',
        ellipsis: true,
        width: '30%',
      },
    ];

    const requestColumn = [
      {
        title: '参数名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
      },
      {
        title: '参数位置',
        dataIndex: 'in',
        key: 'in',
        width: '10%',
      },
      {
        title: '是否必须',
        dataIndex: 'required',
        key: 'required',
        width: '5%',
        render: text => {
          if (text) {
            return <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />;
          } else {
            return <Icon type="close-circle" theme="twoTone" twoToneColor="#7B7D7B" />;
          }
        },
      },
      {
        title: '参数类型',
        dataIndex: 'type',
        key: 'type',
        width: '10%',
        render: (text, record) => {
          if (record.type == null) {
            return (
              <Button type="link" onClick={() => this.showModal(record.ref)}>
                {record.ref}
              </Button>
            );
          }
          return text;
        },
      },
      {
        title: '参数描述',
        dataIndex: 'description',
        key: 'description',
        width: '30%',
      },
      {
        title: '默认值',
        dataIndex: 'defaultValue',
        key: 'defaultValue',
        ellipsis: true,
        width: '30%',
      },
    ];
    return (
      <PageHeaderWrapper title="接口详情页" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="简要描述" style={{ marginBottom: 32 }}>
            <Description term="请求URL">{data.url}</Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="请求方式">{data.method}</Description>
          </DescriptionList>
          <DescriptionList size="large" style={{ marginBottom: 32 }}>
            <Description term="简要描述">{data.description}</Description>
          </DescriptionList>

          <Divider style={{ marginBottom: 32 }} />
          <Modal
            title="参数详情"
            visible={this.state.visible}
            onOk={this.handleOk}
            okText="了解"
            width="70%"
            onCancel={this.handleCancel}
          >
            <Table
              bordered={true}
              style={{ marginBottom: 24 }}
              pagination={false}
              dataSource={resultDataList}
              columns={definitionColumn}
            />
          </Modal>
          <div className={styles.title}>请求参数</div>
          <Table
            bordered={true}
            style={{ marginBottom: 24 }}
            pagination={false}
            dataSource={requestParamVos}
            columns={requestColumn}
          />
          <div className={styles.title}>返回参数(data里面的数据)</div>
          <Table
            bordered={true}
            style={{ marginBottom: 16 }}
            pagination={false}
            dataSource={requestResultVos}
            columns={progressColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
