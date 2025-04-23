import { createApp } from 'vue'
import App from './App.vue'
//引入基础less样式
import '@/assets/less/index.less'
//引入路由器
import router from './router'
//这里ElementPlus我们使用完整引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//注册@element-plus/icons-vue图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入pinia
import { createPinia } from 'pinia'
import { useAllDataStore } from '@/stores'
//引入mock
import '@/api/mock'
const pinia = createPinia()

//引入api接口请求
import api from '@/api/api'

const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)

const store=useAllDataStore()
store.addMenu(router,"refresh")
app.config.globalProperties.$api = api

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

 //getRoutes获得所有路由记录的完整列表。
 //这个方法判断要跳转的路由是否存在
 function isRoute(to){
    return router.getRoutes().filter(item=>item.path===to.path).length>0
 }
 
 router.beforeEach((to, from) => {
      //如果要跳转的不是login,且token不存在(可以通过不存在token判断出用户未登录)
     if(to.path !== '/login'&&!store.state.token){
         //跳转到login
         return { name: 'login' }
     }
     //如果路由记录不存在
     if(!isRoute(to)){
         //跳转到404界面
         return {name: "404"}
     }
 })

app.use(router)


app.mount('#app')
