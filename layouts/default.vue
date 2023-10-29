<script setup lang="ts">
const channelStore = useChannelStore()
</script>

<template>
  <main>
    <div fixed left-2 top-2 flex>
      <div v-for="(player, index) in channelStore.players" :key="index">
        <p>{{ player.id }}</p>
        <p>{{ player.position }}</p>
        <p>strength: {{ channelStore.playerStates[index].strength }}</p>
        <p>agility: {{ channelStore.playerStates[index].agility }}</p>
        <p>intelligence: {{ channelStore.playerStates[index].intelligence }}</p>
        <p>willpower: {{ channelStore.playerStates[index].willpower }}</p>
      </div>
    </div>
    <slot />
  </main>
</template>
