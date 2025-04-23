<script setup>
import {ref,computed} from 'vue'
import {useAllDataStore} from '@/stores'
import { useRoute, useRouter } from 'vue-router'

const store = useAllDataStore()
//左侧的菜单栏数据
const list =computed(()=>store.state.menuList)
//有子菜单的，没有子菜单的
//用计算属性
const noChildren = computed(() => list.value.filter(item => !item.children))
const hasChildren = computed(() => list.value.filter(item => item.children))

//折叠相关的逻辑
const isCollapse = computed(()=>store.state.isCollapse)
const width = computed(()=>store.state.isCollapse ? '64px':'180px')

const router = useRouter()
const route = useRoute()
const activeMenu = computed(()=>route.path)
//点击菜单跳转
const handleMenu = (item)=>{
    router.push(item.path)
    store.selectMenu(item)
}

</script>

<template>
    <el-aside :width="width">
        <el-menu
        background-color="#545c64"
        text-color="#fff"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
      >
        <h3 v-show="!isCollapse">商品后台管理系统</h3>
        <h3 v-show="isCollapse">后台</h3>
        <el-menu-item 
            v-for="item in noChildren"
            :index="item.path"
            :key="item.path"
            @click="handleMenu(item)"
        >   
        <!-- 不用el-icon 它不支持用字符串名动态指定图标 而用component  -->
            <component class="icons" :is="item.icon"></component>
            <span>{{ item.label }}</span>
        </el-menu-item>
        <el-sub-menu 
            v-for="item in hasChildren"
            :index="item.path"
            :key="item.path"
        >
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <!-- 这里的v-for一定要注意 -->
            <el-menu-item
                v-for="subItem in item.children"
                :index="subItem.path"
                :key="subItem.path"
                @click="handleMenu(subItem)"

            >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        </el-menu>
    </el-aside>
    
</template>

<style lang="less" scoped>
.icons{
    width: 18px;
    height: 18px;
    margin-right: 5px;
}

.el-menu{
    border-right: none;
    h3{
        line-height: 48px;
        color: white;
        text-align: center;
    }
}

.el-aside{
    height: 100%;
    background-color: #545c64;
}
</style>
