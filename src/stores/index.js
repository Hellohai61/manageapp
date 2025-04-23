import { defineStore } from 'pinia'
import { ref } from 'vue'
import { watch } from 'vue'

//初始化state数据，这里我们使用一个函数来返回,里面如果有多个属性就更方便，代码更清晰，方便重置，且不会共享引用
function initState(){
  return {
    isCollapse:false,
      //tags固定有一个home标签
    tags:[
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    currentMenu:null,
    menuList:[],
    token:"",
    routeList:[]
  }
}
//第一个参数要求是一个独一无二的名字
//第二个参数可接受两类值：Setup 函数或 Option 对象。
export const useAllDataStore = defineStore('allData', (a) => {
   	  //在 Setup Store 中：
      //ref() 就是 state 属性
	  //computed() 就是 getters
	  //function() 就是 actions	
      const state=ref(initState())

      //使用watch监听state
      watch(state, (newObj)=>{
        //如果变化后的state中的token不存在，代表用户退出(一般退出后会清除token)，不需要持久化存储state了
             if(!newObj.token) return
                       //持久化存储state
             localStorage.setItem('store',JSON.stringify(newObj))
           },{ deep: true })//deep开启深度监听

      function selectMenu(val){
        if (val.name == 'home') {
          state.value.currentMenu = null
        }else {
          state.value.currentMenu = val
            
           //这里添加如果点击的不是home时，先找一下tags中是否存在点击的菜单
          let index=state.value.tags.findIndex(item => item.name === val.name)
           //如果不存在则添加到tags中
          index===-1?state.value.tags.push(val):""
        }
      }

      function updateTags(tag){
        //找到要删除的tab索引，使用splice方法删除
      let index = state.value.tags.findIndex(item => item.name === tag.name)
      state.value.tags.splice(index, 1)
      }
      //根据不同用户显示不同菜单，即动态菜单
      function updateMenuList(val){
        state.value.menuList = val
  		}

      function addMenu(router,type){
          //如果是刷新的时候执行的，则从持久化中读取数据赋值给state
          if(type==="refresh"){
            //这个判断是看持久化数据是否存在，因为这个addMenu我们需要放到main.js中执行，第一次加载项目的时候，会执行但是因为没有持久化数据，所以不是刷新，直接return出去
          if(JSON.parse(localStorage.getItem('store'))){
              //读取持久化数据，赋值给state
            state.value=JSON.parse(localStorage.getItem('store'))
              //routeList保存的函数，存储的时候不能解析，其中的值就是null，这里重新赋值[]
            state.value.routeList=[]
          }else{
            return
          }
        }
            
        const menu=state.value.menuList
          //这里**代表0或多个文件夹，*代表文件。就是把views下的文件全部导入
        const module =import.meta.glob('../views/**/*.vue')
        //这个是菜单格式化后的路由数组
        const routeArr=[]
        //格式化菜单路由
        menu.forEach(item => {
               //如果菜单有children
            if(item.children){
                    //把children遍历格式化
                item.children.forEach(val => {
                    let url=`../views/${val.url}.vue`
                            //这里通过url取出对应的组件
                    val.component=module[url]
                })
           //需要注意的是我们只需要为item.children中的菜单添加路由，所以我们把它解构出来
                routeArr.push(...item.children)
            }else{
              let url=`../views/${item.url}.vue`
              item.component=module[url]
              routeArr.push(item)
            }
        })
        let routers = router.getRoutes()
        routers.forEach(item=>{
            if(item.name == 'main' || item.name == 'login' || item.name == '404'){
              return
            }else{
              router.removeRoute(item.name)
            }
          })
        
        //遍历routeArr
        routeArr.forEach(item=>{
            //addRoute方法会返回一个函数，执行这个函数会把这个路由删除
            //这里我们把每一次router.addRoute添加路由的返回值收集起来，放到state中的routeList
            //addRoute第一个参数要添加子路由的路由name，第二个是一个路由记录
          state.value.routeList.push(router.addRoute("main",item))  
        })
        
      }

      //定义重置方法
      function clean(){
        //把保存的删除路由方法都执行一遍
       state.value.routeList.forEach(item=>{
         if(item) item()
       })
       //重置state的数据
       state.value=initState()
       //删除本地缓存，因为这个clearn方法是用户退出执行的
       localStorage.removeItem('store')
     }
      //需要把所有定义的state，getters，actions返回出去
      return {
        state,selectMenu,updateTags,updateMenuList,addMenu,clean
      }
})