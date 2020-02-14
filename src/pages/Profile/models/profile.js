import { queryAdvancedProfile } from '@/services/api';
import { querySwaggerDetail, querySwaggerDefinition } from '@/services/swagger';

export default {
  namespace: 'profile',

  state: {
    basicGoods: [],
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
    data: {},
    detail: {},
  },

  effects: {
    *querySwaggerDetail({ payload }, { call, put }) {
      const response = yield call(querySwaggerDetail, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *getSwaggerDefinition({ payload }, { call, put }) {
      const response = yield call(querySwaggerDefinition, payload);
      yield put({
        type: 'detail',
        payload: response,
      });
    },

    *fetchAdvanced(_, { call, put }) {
      const response = yield call(queryAdvancedProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    detail(state, action) {
      console.log('返回结果填充', action.payload);
      return {
        ...state,
        detail: action.payload,
      };
    },

    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
