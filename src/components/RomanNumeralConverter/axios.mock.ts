// import { AxiosResponse } from 'axios';
//
// const axiosResponse: AxiosResponse = {
//     data: testJson,
//     status: 200,
//     statusText: 'OK',
//     config: {},
//     headers: {},
// };
//
// export default {
//     default: {
//         get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponse)),
//     },
//     get: jest.fn(() => Promise.resolve(axiosResponse)),
// };
//
// jest.mock('axios');