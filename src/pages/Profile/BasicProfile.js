import React, {Component} from 'react';
import {connect} from 'dva';
import {Card, Badge, Table, Divider, Icon, Input, Modal, Button, Popover, message, Result} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';

const {Description} = DescriptionList;

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
          <Button type="link" onClick={() => this.showModal(record.key)}>
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
    title: '举例说明',
    dataIndex: 'example',
    key: 'example',
    ellipsis: true,
    width: '30%',

  },
];

@connect(({profile, loading}) => ({
  profile,
  loading: loading.effects['profile/querySwaggerDetail'],
}))
class BasicProfile extends Component {
  state = {visible: false};
  //查询详情
  showModal = key => {
    const {dispatch} = this.props;
    dispatch({
      type: 'profile/getSwaggerDefinition',
      payload: key,
    });
    this.setState({
      visible: true,
    });
  };
  //查询真实请求的json数据
  queryRealResult = key => {
    const {dispatch} = this.props;
    dispatch({
      type: 'profile/queryRealResult',
      payload: key,
    });
    message.success('实际请求正在执行，请拉到最底部等待查询结果（参数使用默认值）', 10);
  };

  //按钮
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
    const {dispatch, match} = this.props;
    const {params} = match;
    dispatch({
      type: 'profile/querySwaggerDetail',
      payload: params.id,
    });
  }

  render() {
    const {profile = {}, loading} = this.props;
    const {data = {}, detail = {}, realJson = {}} = profile;
    const {resultDataList = []} = detail;
    const {requestParamVos = [], requestResultVos = []} = data;
    const {mockRequestResult = {}} = realJson;

    console.log("查询结果", mockRequestResult);

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
            return <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>;
          } else {
            return <Icon type="close-circle" theme="twoTone" twoToneColor="#7B7D7B"/>;
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
            return <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>;
          } else {
            return <Icon type="close-circle" theme="twoTone" twoToneColor="#7B7D7B"/>;
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
        render: (text, record) => {
          return (
            <Input
              defaultValue={text}
            />);
        }
      },
    ];
    return (
      <PageHeaderWrapper title="接口详情页" loading={loading}>
        <Card bordered={false}>
          <DescriptionList size="large" title="简要描述" style={{marginBottom: 32}}>
            <Description term="请求URL">
              <Popover content="点击生成Json请求数据" trigger="hover">
                <Button onClick={() => this.queryRealResult(data)} type="link">{data.url}</Button>
              </Popover></Description>
          </DescriptionList>
          <DescriptionList size="large" style={{marginBottom: 32}}>
            <Description term="请求方式">{data.method}</Description>
          </DescriptionList>
          <DescriptionList size="large" style={{marginBottom: 32}}>
            <Description term="简要描述">{data.description}</Description>
          </DescriptionList>
          <Divider style={{marginBottom: 32}}/>
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
              style={{marginBottom: 24}}
              pagination={false}
              dataSource={resultDataList}
              columns={definitionColumn}
            />
          </Modal>
          <div className={styles.title}>请求参数</div>
          <Table
            bordered={true}
            style={{marginBottom: 24}}
            pagination={false}
            dataSource={requestParamVos}
            columns={requestColumn}
          />
          <div className={styles.title}>返回参数(data里面的数据)</div>
          <Table
            bordered={true}
            style={{marginBottom: 16}}
            pagination={false}
            dataSource={requestResultVos}
            columns={progressColumns}
          />

          <Divider style={{marginBottom: 32}}/>

          <Result
            icon={<Icon type="smile" theme="twoTone"/>}
            title="Great, 让我们依据上面设置的默认值来获取下实际json吧!"
            extra={<Button type="primary" onClick={() => this.queryRealResult(data)}>Try</Button>}
          >
            {mockRequestResult}
          </Result>
        </Card>


      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
