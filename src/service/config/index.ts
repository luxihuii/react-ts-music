export const BASE_URL = 'http://codercba.com:9002'
export const TIME_OUT = 10000

// // 1. 区分开发环境和生产环境

// // 2. 区分开发环境和生产环境
// let BASE_URL = ''
// if(process.env.NODE_ENV === 'development') {
//     BASE_URL = 'http://codercba.dev:9002'
// }else {
//     BASE_URL = 'http://codercba.prod:9002'
// }
// export { BASE_URL }

// // 3. 从定义的环境变量的配置文件中加载变量
// process.env.REACT_APP_BASE_URL
// 在主文件下分别创建
// 1).env.development
// REACT_APP_BASE_URL = 'http://codercba.dev:9002'
// 2).env.production
// REACT_APP_BASE_URL = 'http://codercba.prod:9002'