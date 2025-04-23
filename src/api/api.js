// 整个项目的api请求的统一管理

import { mock } from "mockjs";
import request from "./request";

//请求首页左侧的表格数据
export default {
    getTableData() {
        return request({
            url: '/home/getTableData',
            method: 'get',
        })
    },
    getCountData(){
        return request({
            url: '/home/getCountData',
            method: 'get',
        })
    },
    getChartData() {
        return request({
          url: '/home/getChartData',
          method: 'get',
        })
      },
    getUserData(params) {
        return request({
          url: '/user/getUserData',
          method: 'get',
          data: params
        })
      },
    deleteUser(params) {
      return request({
        url: '/user/deleteUser',
        method: 'get',
        data: params
      })
    },
    addUser(params) {
      return request({
        url: '/user/addUser',
        method: 'post',
        data: params
      })
    },
    editUser(params) {
      return request({
        url: '/user/editUser',
        method: 'post',
        data: params
      })
    },
    getMenu(params) {
      return request({
        url: '/permission/getMenu',
        method: 'post',
        data: params
      })
  }
}