<script setup lang="ts">
import Queue from './components/QueueCard.vue'
import ButtonsComponent from './components/ButtonsComponent.vue'
import ActionsCard from './components/ActionsCard.vue'
</script>

<template>
  <main>
    <ButtonsComponent />
    <ActionsCard />
    <Queue />
  </main>
</template>

<style scoped>
main {
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
  background-color: #181818;
  color: white;
}
</style>
