<template>
  <div class="modal-overlay">
    <div class="modal">
      <h1>Input Background</h1>
      <p>Please ensure to use the raw URL (ie. images.unsplash.com - NOT unsplash.com)</p>
      <p class="message">{{ message }}</p>
      <input type="text" placeholder="Image URL" v-model="url" @keyup.enter="submit" />
      <select v-model="channel">
        <option disabled value="">Please select a channel</option>
        <option value="wave">Wave Music</option>
        <option value="paradise">Paradise Music</option>
      </select>
      <VueDatePicker
        v-model="date"
        placeholder="Select date & time"
        :start-date="startDate"
        dark
        class="date-picker"
        auto-apply
      />
      <button @click="submit">Send</button>
      <button @click="$emit('close'), (message = '')">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onActivated, onMounted, ref } from 'vue'
import { type VueCookies } from 'vue-cookies'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const base_url = 'http://localhost:3000'
const $cookies = inject<VueCookies>('$cookies')
const url = ref('')
const channel = ref('wave')
const date = ref()
const message = ref('')
const startDate = ref(new Date())

const submit = async () => {
  try {
    const data = await sendUrl(url.value, channel.value, date.value)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
const emit = defineEmits(['close'])

async function sendUrl(url: string, channel: string, date: Date) {
  const response = await fetch(`${base_url}/background/url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: $cookies?.get('token')
    },
    body: JSON.stringify({
      image_url: url,
      scheduled_time: new Date(date),
      channel: channel.toLocaleLowerCase(),
      sender_id: $cookies?.get('id')
    })
  })
  const data = await response.json()
  if (response.ok) {
    message.value = 'Added to queue successfully'
    emit('close')
    return data
  } else {
    message.value = data.message || 'Something went wrong'
    throw new Error(data.message || 'Something went wrong')
  }
}

onActivated(() => {
  message.value = ''
})

onMounted(() => {
  message.value = ''
})
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
}

.date-picker {
  width: 50%;
  margin: 2.5% auto;
}
</style>
