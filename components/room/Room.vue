<script setup lang="ts">
import { RoomType } from '~/models/room'
import type { RoomModel } from '~/models/room'

const props = defineProps<{
  roomModel: RoomModel
}>()

const emit = defineEmits<{
  handleAdjacentRoom: [id: number] // 具名元组语法
}>()

function handleClick() {
  if (props.roomModel.type === RoomType.adjacent)
    emit('handleAdjacentRoom', props.roomModel.id)
}
</script>

<template>
  <div
    v-if="props.roomModel.type === RoomType.event"
    absolute size-34
    :style="{ left: `${props.roomModel.position.x * 8.5}rem`, top: `${props.roomModel.position.y * 8.5}rem` }"
  >
    <img
      size-34
      src="/room.svg"
    >
  </div>
  <div
    v-if="props.roomModel.type === RoomType.adjacent" absolute
    size-34 bg-red :style="{ left: `${props.roomModel.position.x * 8.5}rem`, top: `${props.roomModel.position.y * 8.5}rem` }"
    @click="handleClick"
  >
    {{ props.roomModel.id }}
  </div>
  <div
    v-if="props.roomModel.type === RoomType.empty"
    absolute size-34 bg-black
    :style="{ left: `${props.roomModel.position.x * 8.5}rem`, top: `${props.roomModel.position.y * 8.5}rem` }"
  />
</template>
