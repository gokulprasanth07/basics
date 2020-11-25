import { put, takeEvery, call } from 'redux-saga/effects';
import { API_URL, GET_OKRS_DATA } from './constants';
import { get } from '../../utils/helpers';
import requestWrapper from '../../utils/requestWrapper';
import {
  loadOkrsData,
  toggleDataLoadedState,
  toggleErrorState,
} from './actions';

export function* getOkrsSaga() {
  try {
    const response = yield call(requestWrapper, {
      url: `${API_URL}`,
      method: 'GET',
    });
    if (response && response.status === 200) {
      const data = get(response, 'data.data', []);
      yield put(loadOkrsData(data));
      yield put(toggleDataLoadedState(true));
    } else {
      yield put(toggleErrorState(true));
    }
  } catch (err) {
    yield put(toggleErrorState(true));
    // eslint-disable-next-line no-console
    console.error('Caught in homePage Saga', err);
  }
}

export default function* watchHomeSaga() {
  yield takeEvery(GET_OKRS_DATA, getOkrsSaga);
}
