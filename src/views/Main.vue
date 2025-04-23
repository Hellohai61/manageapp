<script setup>
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
import CommonTag from '@/components/CommonTag.vue';

</script>

<template>
    <!-- 左右布局，左侧自定义aside组件，右侧上面header，下面main区域 -->
    <div class="common-layout">
        <el-container class="lay-container">
            <common-aside/>
            <el-container>
                <el-header class="el-header">
                    <common-header/>
                </el-header>
                <common-tag></common-tag>
                <el-main class="right-main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
  </div>
</template>

<style scoped lang="less">
.common-layout .lay-container{
    height: 100vh;
}
.el-header{
    background-color: #333;
}

</style>
