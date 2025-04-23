<script setup>
import {useAllDataStore} from '@/stores'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const getImageUrl = (user) =>{
    return new URL(`../assets/images/${user}.png`,import.meta.url).href
}

const store = useAllDataStore()
const handleCollapse = ()=>{
    store.state.isCollapse = !store.state.isCollapse
}

const router = useRouter
//之前定义过
const handleLoginOut=()=>{
    //执行重置方法
    store.clean()  
    router.push("/login")
}

const current = computed(()=>store.state.currentMenu)
</script>

<template>
    <div class="header">
        <!-- 左侧按钮和面包屑 -->
        <div class="l-content"> 
            <!-- 这个点击事件是控制菜单组件的收缩的-->
            <el-button size="small" @click="handleCollapse">
                <!-- 图标的展示,这里我们使用动态组件来展示图标-->
                <component class="icons" is="menu"></component>
            </el-button>
            
            <!-- 面包屑，separator是分隔符-->
            <el-breadcrumb separator="/" class="bread">
                <!-- 首页是一定存在的所以直接写死 -->
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="current" :to="current.path" >{{ current.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <!--右侧用户头像-->
        <div class="r-content">
            <el-dropdown>
                <span>
                    <!--我们定义一个URl对象地址，这里是传入图片的名称-->
                    <img :src="getImageUrl('user')"  class="user" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    
</template>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #333;
}
.icons{
    width: 20px;
    height: 20px;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}

:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}

</style>
