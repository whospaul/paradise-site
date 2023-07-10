<template>
  <div class="modal-overlay">
    <div class="modal">
      <h1>Create account</h1>
      <p class="error">{{ error }}</p>
      <p class="success">{{ success }}</p>
      <input type="text" placeholder="Username" v-model="username" @keyup.enter="submit" />
      <input type="password" placeholder="Password" v-model="password" @keyup.enter="submit" />
      <select v-model="role">
        <option disabled value="">Please select a role</option>
        <option value="0">User</option>
        <option value="1">Admin</option>
      </select>
      <button @click="submit">Create</button>
      <button @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, type Ref } from 'vue'
import { type VueCookies } from 'vue-cookies'

const base_url = 'http://localhost:3000'
const $cookies = inject<VueCookies>('$cookies')
const username = ref('')
const password = ref('')
const role = ref(0)
const error = ref('')
const success = ref('')

const submit = async () => {
  try {
    const data = await signup(username, password, role)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

async function signup(username: Ref<string>, password: Ref<string>, role: Ref<number>) {
  const response = await fetch(`${base_url}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: $cookies?.get('token')
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      role: +role.value,
      sender_id: $cookies?.get('id')
    })
  })
  const data = await response.json()
  if (response.ok) {
    error.value = ''
    username.value = ''
    password.value = ''
    role.value = 0
    success.value = 'Account created successfully'
    return data
  } else {
    error.value = data.message || 'Something went wrong'
    throw new Error(data.message || 'Something went wrong')
  }
}
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 1000;
}

.modal {
  background-color: #1d1d1d;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  height: fit-content;
  margin: 1%;
  padding-top: 5%;
  padding-bottom: 5%;
  width: 30%;
  text-align: center;
  margin: auto;
}

.modal:focus {
  outline: #1d1d1d;
}

.error {
  color: #ff0000;
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  margin-bottom: 1%;
}

.success {
  color: #00ff00;
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  margin-bottom: 1%;
}

.close {
  cursor: pointer;
  display: flex;
  position: absolute;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  outline: #fdfdfd38;
  background-color: #1d1d1d;
  color: #fdfdfd;
  border: 1px solid #ffffff1b;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.1);
  height: 15%;
  margin: 1%;
  margin-top: 2%;
  padding: 0.6rem;
  white-space: nowrap;
  transition: linear 0.1s;
}

button:hover {
  background-color: #ffffff1b;
  border: 1px solid #ffffff5e;
  box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.161);
  color: #fff;
  cursor: pointer;
  transform: scale(1.05, 1.05);
  transition: linear 0.15s;
}

select {
  background-color: #1d1d1d;
  border: 1px solid #ffffff1b;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  height: 15%;
  margin: auto;
  margin-top: 2%;
  padding: 0.6rem;
  width: 50%;
  white-space: nowrap;
  transition: linear 0.1s;
  display: flex;
}

input {
  background-color: #1d1d1d;
  border: 1px solid #ffffff1b;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  height: 15%;
  margin: auto;
  margin-top: 2%;
  padding: 0.6rem;
  width: 50%;
  white-space: nowrap;
  transition: linear 0.1s;
  display: flex;
  /* text-align: center; */
  /* align-items: center; */
}
</style>
