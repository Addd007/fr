<template>
  <div>
    <h2>人员信息管理</h2>
    <!-- 信息录入 -->
    <form @submit.prevent="addEmployee">
      <label>姓名：</label><input type="text" v-model="newEmployee.name"><br>
      <label>年龄：</label><input type="number" v-model="newEmployee.age"><br>
      <label>职位：</label><input type="text" v-model="newEmployee.position"><br>
      <label>联系方式：</label><input type="text" v-model="newEmployee.contact"><br>
      <label>电子邮件：</label><input type="email" v-model="newEmployee.email"><br>
      <label>性别：</label><input type="text" v-model="newEmployee.gender"><br>
      <button type="submit">录入</button>
    </form>
    <!-- 信息查询 -->
    <form @submit.prevent="searchEmployees">
      <label>查询条件：</label><input type="text" v-model="searchQuery"><br>
      <button type="submit">查询</button>
    </form>
    <ul>
      <li v-for="employee in employees" :key="employee.id">
        {{employee.name}} - {{employee.age}} - {{employee.position}} - {{employee.contact}} - {{employee.email}} - {{employee.gender}}
        <button @click="editEmployee(employee.id)">修改</button>
        <button @click="deleteEmployee(employee.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const newEmployee = ref({
  name: '',
  age: 0,
  position: '',
  contact: '',
  email: '',
  gender: ''
})
const searchQuery = ref('')
const employees = ref([])

const addEmployee = async () => {
  try {
    const response = await axios.post('/api/employees', newEmployee.value)
    if (response.data.success) {
      // 录入成功，刷新列表
      await searchEmployees()
      newEmployee.value = {
        name: '',
        age: 0,
        position: '',
        contact: '',
        email: '',
        gender: ''
      }
    }
  } catch (error) {
    console.error('录入失败', error)
  }
}

const searchEmployees = async () => {
  try {
    const response = await axios.get('/api/employees', {
      params: { query: searchQuery.value }
    })
    employees.value = response.data.data
  } catch (error) {
    console.error('查询失败', error)
  }
}

const editEmployee = (id) => {
  // 这里可以实现跳转到修改页面，并传递员工ID
  console.log('编辑员工', id)
}

const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`/api/employees/${id}`)
    if (response.data.success) {
      await searchEmployees()
    }
  } catch (error) {
    console.error('删除失败', error)
  }
}

// 页面加载时查询所有员工
searchEmployees()
</script>
