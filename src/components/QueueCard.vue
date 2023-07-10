<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import type { VueCookies } from 'vue-cookies'
const $cookies = inject<VueCookies>('$cookies')

const message = ref('')
const item = ref({})

async function refresh() {
  const res = await fetch('http://localhost:3000/background/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: $cookies?.get('token')
    }
  })
  const data = await res.json()
  if (res.ok) {
    data.length === 0 ? (message.value = 'No items in queue') : (message.value = '')
    item.value = data
    return data
  } else {
    message.value = data.message || 'Something went wrong'
    throw new Error(data.message || 'Something went wrong')
  }
}

async function handleForceSend(id: string) {
  if (confirm('Are you sure you want to force send this message?')) {
    const res = await fetch(`http://localhost:3000/background/force`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $cookies?.get('token')
      },
      body: JSON.stringify({ id })
    })
    const data = await res.json()
    if (res.ok) {
      refresh()
      return data
    } else {
      message.value = data.message || 'Something went wrong'
      throw new Error(data.message || 'Something went wrong')
    }
  }
}

async function handleDelete(id: string) {
  if (confirm('Are you sure you want to delete this message?')) {
    const res = await fetch(`http://localhost:3000/background`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $cookies?.get('token')
      },
      body: JSON.stringify({ id })
    })
    const data = await res.json()
    if (res.ok) {
      refresh()
      return data
    } else {
      message.value = data.message || 'Something went wrong'
      throw new Error(data.message || 'Something went wrong')
    }
  }
}

onMounted(() => {
  refresh()
})
</script>
<template>
  <div class="tile">
    <div class="tileContent">
      <h1>Queue</h1>
      <div class="message">{{ message }}</div>
      <button class="refreshBtn" @click="refresh">
        <svg
          class="refreshSvg"
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M23 4v6h-6"></path>
          <path d="M1 20v-6h6"></path>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
          <path d="m1 14 4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Channel</th>
            <th>Status</th>
            <th>Scheduled Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, i) in item" :key="i">
            <td>{{ data.id }}</td>
            <td>{{ data.channel }}</td>
            <td>{{ data.status }}</td>
            <td>{{ new Date(data.scheduled_time).toLocaleString() }}</td>
            <td class="actionsTd">
              <!-- Force send button -->
              <button class="send" @click="handleForceSend(data.id)">
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 2 11 13"></path>
                  <path d="m22 2-7 20-4-9-9-4 20-7z"></path>
                </svg>
              </button>
              <!-- Delete button -->
              <button class="delete" @click="handleDelete(data.id)">
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 6h18"></path>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                  <path d="M10 11v6"></path>
                  <path d="M14 11v6"></path>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
.tile {
  background-color: #1d1d1d;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.1);
  height: calc(28vw * 1.5);
  max-height: 80%;
  width: 70%;
  display: inline-flex;
  align-items: center;
  padding-bottom: 0.5%;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.tileContent {
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 100%;
  height: 100%;
  display: flex;
  overflow: scroll;
}

.refreshBtn {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0.5%;
  padding: 0.5%;
  border-radius: 5px;
  background-color: #1d1d1d;
  cursor: pointer;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: rotate(0deg);
}

.refreshBtn:hover .refreshSvg {
  background-color: #ffffff1b;
  border: 1px solid #ffffff5e;
  box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.161);
  color: #fff;
  cursor: pointer;
  transform: rotate(180deg);
  transition: linear 0.35s;
  outline: none;
  border: none;
}

.refreshBtn .refreshSvg {
  transform: rotate(0deg);
  transition: linear 0.35s;
  width: 100%;
}

.delete {
  margin-left: 5%;
  background-color: #1d1d1d;
  cursor: pointer;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: rotate(0deg);
}

.delete:hover {
  background-color: #c61d1db0;
  color: #fff;
  cursor: pointer;
  transform: scale(1.05, 1.05);
  transition: linear 0.15s;
}

.send {
  margin-left: 5%;
  background-color: #1d1d1d;
  cursor: pointer;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: rotate(0deg);
}

.send:hover {
  background-color: #007a00b0;
  color: #fff;
  cursor: pointer;
  transform: scale(1.05, 1.05);
  transition: linear 0.15s;
}

th {
  color: #fff;
  text-align: center;
  margin: 0 auto;
  padding-bottom: 1%;
  border-bottom: 1px solid #ffffff5e;
}

.actionsTd {
  display: flex;
  justify-content: center;
  padding: 10%;
  margin: 1% auto;
}

table {
  width: 90%;
  margin: 0 auto;
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
