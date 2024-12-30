<template>
  <div>
    <h2>注册</h2>
    <form @submit.prevent="register">
      <label>用户名：</label><input type="text" v-model="username"><br>
      <label>邮箱：</label><input type="email" v-model="email"><br>
      <label>密码：</label><input type="password" v-model="password"><br>
      <button type="submit">提交</button>
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
const email = ref('')
const error = ref('')

const register = async () => {
  try {
    const response = await axios.post('/api/register', { username, password, email })
    if (response.data.success) {
      // 注册成功，跳转到登录界面
      router.push('/login')
    } else {
      error.value = response.data.message
    }
  } catch (error) {
    error.value = '注册失败，请重试'
  }
}
</script>