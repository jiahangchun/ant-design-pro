import request from '@/utils/request';

export async function querySwaggerList(params) {
  console.log('触发了请求');
  return request('/tp/query/swagger/api/list', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
