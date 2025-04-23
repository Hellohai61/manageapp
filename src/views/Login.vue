<script setup>

import {reactive,getCurrentInstance} from 'vue'
import { useRouter } from 'vue-router';
import { useAllDataStore } from '../stores';

const { proxy } = getCurrentInstance();
const router=useRouter()
const loginForm = reactive({
  username: 'admin',
  password: 'admin',
});

const store=useAllDataStore()
const login=async ()=>{
    const res = await proxy.$api.getMenu(loginForm);
    if(res){
       //在这里执行updateMenuList，传入res.menuList
      store.updateMenuList(res.menuList)
      //直接修改token
      store.state.token=res.token
      //在这里执行添加路由方法,并传入router
      store.addMenu(router)
      router.push("/home")
    }
}

</script>

<template>
    <div class="body-login">
        <el-form :model="loginForm" class="login-container">
            <h3>系统登录</h3>
            <el-form-item>
                <el-input
                type="input"
                placeholder="请输入账号"
                v-model="loginForm.username"
                >
                </el-input>
            </el-form-item>
                
            <el-form-item>
                <el-input
                type="password"
                placeholder="请输入密码"
                v-model="loginForm.password"
                >
                </el-input>
            </el-form-item>
                
            <el-form-item>
                <el-button type="primary" @click="login"> 登录 </el-button>
            </el-form-item>
        </el-form>
    </div>
   
</template>

<style lang="less" scoped>
.body-login{
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/background.png");
    background-size: 100%;
    overflow: hidden;
}
.login-container {
  width: 350px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin: 180px auto;
  h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #505450;
  }
  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>