<script setup lang="ts">
import type { PlayerModel } from '~/models/player'

const props = defineProps<{
  playerModel: PlayerModel
}>()
</script>

<template>
  <div
    absolute size-34 center
    :style="{ left: `${props.playerModel.position.x * 8.5}rem`, top: `${props.playerModel.position.y * 8.5}rem` }"
  >
    <img
      size-24
      src="/nuxt.svg"
    >
  </div>
</template>
