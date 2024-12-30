<template>
  <div>
    <h2>登录</h2>
    <form @submit.prevent="login">
      <label>用户名：</label><input type="text" v-model="username"><br>
      <label>密码：</label><input type="password" v-model="password"><br>
      <button type="submit">登录</button>
      <button type="submit">注册</button>
    </form>
    <p v-if="error">{{error}}</p >
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from "@/router/index.js";

const username = ref('')
const password = ref('')
const error = ref('')

const login = async () => {
  try {
    const response = await axios.post('/api/login', { username, password })
    if (response.data.success) {
      // 登录成功，跳转到主界面
      await router.push('/home')
    } else {
      error.value = '用户名或密码错误'
    }
  } catch (error) {
    error.value = '登录失败，请重试'
  }
}
</script>
