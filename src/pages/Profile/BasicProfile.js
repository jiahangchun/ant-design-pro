import React, {Component} from 'react';
import {connect} from 'dva';
import {Card, Badge, Table, Divider, Icon, Input} from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './BasicProfile.less';
// import Link from "react-router-dom";
import Link from 'umi/link';

const {Description} = DescriptionList;

const progressColumns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '当前进度',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="成功"/>
      ) : (
        <Badge status="processing" text="进行中"/>
      ),
  },
  {
    title: '操作员ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '耗时',
    dataIndex: 'cost',
    key: 'cost',
  },
];

@connect(({profile, loading}) => ({
  profile,
  loading: loading.effects['profile/querySwaggerDetail'],
}))
class BasicProfile extends Component {
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


    const {basicGoods = [], basicProgress = [], userInfo = {}, data = {}} = profile;
    const {requestParamVos = []} = data;

    console.log("返回值Application", data);

    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
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
        render: (text) => {
          if (text) {
            return (
              <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/>
            );
          } else {
            return (
              <Icon type="close-circle" theme="twoTone" twoToneColor="#7B7D7B"/>
            );
          }
        }
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
          <DescriptionList size="large" title="简要描述" style={{marginBottom: 32}}>
            <Description term="请求URL">{data.url}</Description>
            <Description term="请求方式">{data.method}</Description>
            <Description term="简要描述">{data.description}</Description>
          </DescriptionList>
          <Divider style={{marginBottom: 32}}/>
          <div className={styles.title}>请求参数</div>
          <Table
            rowKey={record => record.key}
            bordered={true}
            style={{marginBottom: 24}}
            pagination={false}
            dataSource={requestParamVos}
            columns={requestColumn}
          />
          <div className={styles.title}>退货进度</div>
          {/*<Table*/}
          {/*  style={{marginBottom: 16}}*/}
          {/*  pagination={false}*/}
          {/*  loading={loading}*/}
          {/*  dataSource={basicProgress}*/}
          {/*  columns={progressColumns}*/}
          {/*/>*/}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
