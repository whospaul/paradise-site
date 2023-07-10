<script setup lang="ts">
import { ref } from 'vue'
import SendUrlModal from './SendUrlModal.vue'

const urlModal = ref(false)
</script>
<template>
  <div class="tile">
    <div class="tileContent">
      <h1>Actions</h1>

      <button @click="urlModal = true">Send via URL</button>
      <SendUrlModal v-show="urlModal" @close="urlModal = false" />
    </div>
  </div>
</template>
<style scoped>
.tile {
  margin-inline: 1%;
  background-color: #1d1d1d;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.1);
  height: calc(28vw * 1.5);
  max-height: 20%;
  width: 10%;
  min-width: fit-content;
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
</style>
