import axios from 'axios';
const axiosWrapper = options => {
  // eslint-disable-next-line prefer-const
  let configs = options;
  return axios.request({ ...configs });
};
export default axiosWrapper;
