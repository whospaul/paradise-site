<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import LoginModal from './LoginModal.vue'
import SignupModal from './SignupModal.vue'
import type { VueCookies } from 'vue-cookies'

const showLoginModal = ref(false)
const showSignupModal = ref(false)
const showLoginButton = ref(!showLoginModal.value)
const loggedIn = ref(false)
const base_url = 'http://localhost:3000'
const $cookies = inject<VueCookies>('$cookies')

const emit = defineEmits(['loggedIn'])

const checkToken = async () => {
  if (!$cookies?.isKey('token')) throw (showLoginButton.value = true)
  try {
    const token = $cookies?.get('token')
    await fetch(`${base_url}/auth/validateToken`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      }
    })
    showLoginButton.value = false
    loggedIn.value = true
    emit('loggedIn')
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  checkToken()
})

const handleLogout = async () => {
  try {
    const token = $cookies?.get('token')
    await fetch(`${base_url}/auth/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: token
      }
    })
    $cookies?.remove('token')
    $cookies?.remove('id')
    showLoginButton.value = true
    loggedIn.value = false
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <div class="buttons">
    <button v-show="showLoginButton" @click="showLoginModal = true">Login</button>
    <button v-show="loggedIn" @click="showSignupModal = true">Create an account</button>
    <button v-show="loggedIn" @click=";(showLoginButton = true), handleLogout()">Logout</button>
    <LoginModal
      v-show="showLoginModal"
      @close="showLoginModal = false"
      @loggedin=";(showLoginModal = false), (showLoginButton = false), (loggedIn = true)"
    />
    <SignupModal v-show="showSignupModal" @close="showSignupModal = false" />
  </div>
</template>
<style>
.buttons {
  margin: auto;
  justify-content: top;
  align-items: center;
  text-align: center;
  vertical-align: top;
  height: 10%;
  width: 100vw;
  top: 0;
}

button {
  outline: #fdfdfd38;
  background-color: #1d1d1d;
  color: #fdfdfd;
  border: 1px solid #ffffff1b;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.1);
  margin: 1%;
  padding: 0.6rem;
  text-align: center;
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
</style>
