import {queryAdvancedProfile} from '@/services/api';
import {querySwaggerDetail} from '@/services/swagger';

export default {
  namespace: 'profile',

  state: {
    basicGoods: [],
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
    data: {},
    resultDataList:{},
  },

  effects: {
    * querySwaggerDetail({payload}, {call, put}) {
      const response = yield call(querySwaggerDetail, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    * getSwaggerDefinition({payload}, {call, put}) {
      const response = yield call(querySwaggerDetail, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * fetchAdvanced(_, {call, put}) {
      const response = yield call(queryAdvancedProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, {payload}) {
      return {
        ...state,
        ...payload,
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
