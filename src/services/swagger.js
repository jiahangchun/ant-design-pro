import request from '@/utils/request';

//查询swagger列表
export async function querySwaggerList(params) {
  return request('/tp/query/swagger/api/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//查询接口详情
export async function querySwaggerDetail(key) {
  return request(`/tp/get/swagger/api?key=${key}`);
}

//查询结构
export async function querySwaggerDefinition(key) {
  return request(`/tp/get/definition/dto?key=${key}`);
}

//查询请求的真实json
export async function queryRealResult(params) {
  return request('/tp/mock/request', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
